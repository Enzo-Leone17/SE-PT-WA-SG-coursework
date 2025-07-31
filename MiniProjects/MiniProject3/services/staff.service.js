//require models
const {
  Assignment,
  Task,
  Manager,
  Staff,
  User,
  sequelize,
} = require("../models");
const { Op, where } = require("sequelize");

module.exports = {
  //#region getAllStaffs
  getAllStaffs: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      //#region adding filter, sort and search

      //filter
      const filterQuery = {};
      filterQuery.is_deleted = false;

      if (typeof req.query.has_forklift_license === "boolean") {
        filterQuery.has_forklift_license = req.query.has_forklift_license;
      }
      if (typeof req.query.has_punched_in === "boolean") {
        filterQuery.has_punched_in = req.query.has_punched_in;
      }

      //sort
      const sortBy = req.query.sortBy;
      const sortOrder = req.query.sortOrder?.toUpperCase();
      const validQuery = [
        "id",
        "full_name",
        "phone",
        "has_forklift_license",
        "has_punched_in",
      ];
      if (sortBy && !validQuery.includes(sortBy)) {
        return res.status(400).json({ error: "Invalid sort field" });
      } else if (sortOrder && !["ASC", "DESC"].includes(sortOrder)) {
        return res.status(400).json({ error: "Invalid sort order" });
      }

      //search
      if (req.query.search) {
        filterQuery[Op.or] = [
          { full_name: { [Op.like]: `%${req.query.search}%` } },
          { phone: { [Op.like]: `%${req.query.search}%` } },
        ];
      }

      //#endregion

      const { count, rows: staffs } = await Staff.findAndCountAll({
        include: [
          {
            model: Assignment,
            required: req.query?.include_assignments ? true : false,
          },
        ],
        limit,
        offset,
        where: filterQuery,
        order: [[sortBy ? sortBy : "id", sortOrder ? sortOrder : "ASC"]],
      });
      const results = {
        total: count,
        page,
        totalPages: Math.ceil(count / limit),
        staffs,
      };

      res.json(results);
    } catch (err) {
      res.status(500).json({
        error: "Failed to retrieve staffs information",
        details: err.message,
      });
    }
  },
  //#endregion
  //#region getAssignmentsToStaffID
  getAssignmentsToStaffID: async (req, res) => {
    try {
      const { id } = req.params;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      if (!id || isNaN(Number(id))) {
        return res.status(400).json({ error: "Valid staff ID is required" });
      }
      //#region adding filter, sort and search

      //filter
      const filterQuery = {};
      filterQuery.is_deleted = false;

      [
        {
          name: "status",
          validQuery: ["assigned", "in progress", "completed", "cancelled"],
        },
      ].map((field) => {
        if (
          req.query[field.name] &&
          field.validQuery.includes(req.query[field.name].toLowerCase())
        ) {
          filterQuery[field.name] = req.query[field.name].toLowerCase();
        }
      });

      if (req.query.task_id && !isNaN(Number(req.query.task_id))) {
        filterQuery.task_id = req.query.task_id;
      }

      //sort
      const sortBy = req.query.sortBy;
      const sortOrder = req.query.sortOrder?.toUpperCase();
      const validQuery = ["id", "staff_id", "task_id", "status", "notes"];
      if (sortBy && !validQuery.includes(sortBy)) {
        return res.status(400).json({ error: "Invalid sort field" });
      } else if (sortOrder && !["ASC", "DESC"].includes(sortOrder)) {
        return res.status(400).json({ error: "Invalid sort order" });
      }

      //search
      if (req.query.search) {
        filterQuery[Op.or] = [
          { staff_id: { [Op.like]: `%${req.query.search}%` } },
          { task_id: { [Op.like]: `%${req.query.search}%` } },
          { notes: { [Op.like]: `%${req.query.search}%` } },
        ];
      }

      //#endregion

      const { count, rows: staffs } = await Staff.findAndCountAll({
        limit,
        offset,
        where: {
          id: id,
          is_deleted: false,
        },
        include: [
          {
            model: Assignment,
            required: req.query?.status ? true : false,
            where: filterQuery,
            order: [[sortBy ? sortBy : "id", sortOrder ? sortOrder : "ASC"]],
          },
        ],
      });
      const results = {
        total: count,
        page,
        totalPages: Math.ceil(count / limit),
        staffs,
      };

      res.json(results);
    } catch (err) {
      res.status(500).json({
        error: "Failed to retrieve staff information by id:" + id,
        details: err.message,
      });
    }
  },
  //#endregion
  //#region getAssignmentsToStaffByUserID
  getAssignmentsToStaffByUserID: async (req, res) => {
    try {
      const { id } = req.params;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      if (!id || isNaN(Number(id))) {
        return res.status(400).json({ error: "Valid staff ID is required" });
      }

      //#region adding filter, sort and search

      //filter
      const filterQuery = {};
      filterQuery.is_deleted = false;

      [
        {
          name: "status",
          validQuery: ["assigned", "in progress", "completed", "cancelled"],
        },
      ].map((field) => {
        if (
          req.query[field.name] &&
          field.validQuery.includes(req.query[field.name].toLowerCase())
        ) {
          filterQuery[field.name] = req.query[field.name].toLowerCase();
        }
      });

      if (req.query.task_id && !isNaN(Number(req.query.task_id))) {
        filterQuery.task_id = req.query.task_id;
      }

      //sort
      const sortBy = req.query.sortBy;
      const sortOrder = req.query.sortOrder?.toUpperCase();
      const validQuery = ["id", "staff_id", "task_id", "status", "notes"];
      if (sortBy && !validQuery.includes(sortBy)) {
        return res.status(400).json({ error: "Invalid sort field" });
      } else if (sortOrder && !["ASC", "DESC"].includes(sortOrder)) {
        return res.status(400).json({ error: "Invalid sort order" });
      }

      //search
      if (req.query.search) {
        filterQuery[Op.or] = [
          { staff_id: { [Op.like]: `%${req.query.search}%` } },
          { task_id: { [Op.like]: `%${req.query.search}%` } },
          { notes: { [Op.like]: `%${req.query.search}%` } },
        ];
      }

      //#endregion
      const { count, rows: staffs } = await Staff.findAndCountAll({
        limit,
        offset,
        where: {
          id: id,
          is_deleted: false,
        },
        include: [
          {
            model: Assignment,
            required: req.query?.status ? true : false,
            where: filterQuery,
            order: [[sortBy ? sortBy : "id", sortOrder ? sortOrder : "ASC"]],
          },
        ],
      });
      const results = {
        total: count,
        page,
        totalPages: Math.ceil(count / limit),
        staffs,
      };

      res.json(results);
    } catch (err) {
      res.status(500).json({
        error: "Failed to retrieve staff information by id:" + id,
        details: err.message,
      });
    }
  },
  //#endregion
  //#region createStaff
  createStaff: async (req, res) => {
    const t = await sequelize.transaction();

    const email = req?.body?.email || null;
    const username = req?.body?.username || null;
    const password = req?.body?.password || null;
    const role = "staff";
    const full_name = req?.body?.full_name || null;
    const phone = req?.body?.phone || null;
    const has_forklift_license = req?.body?.has_forklift_license || undefined;
    const has_punched_in = req?.body?.has_punched_in || undefined;

    try {
      if (!email) {
        throw new Error("Email is required");
      } else if (!username) {
        throw new Error("Username is required");
      }
      const existingEmail = await User.findOne({
        where: {
          email,
        },
      });
      const existingUsername = await User.findOne({
        where: {
          username,
        },
      });
      if (existingEmail) {
        throw new Error(
          "This email has already been registered, please login instead"
        );
      } else if (existingUsername) {
        throw new Error(
          `The username ${username} has already been used, please try another username`
        );
      } else if (!password) {
        throw new Error("password is required");
      } else if (!full_name) {
        throw new Error("full_name is required");
      } else if (!phone) {
        throw new Error("phone is required");
      }
      const newUser = await User.create(
        {
          email,
          username,
          password,
          role,
        },
        { transaction: t }
      );
      const newStaff = await Staff.create(
        {
          user_id: newUser.id,
          full_name,
          phone,
          has_forklift_license,
          has_punched_in,
        },
        { transaction: t }
      );
      t.commit();
      res
        .status(201)
        .json("Successfully created new staff with id:" + newStaff.id);
    } catch (err) {
      await t.rollback();
      res.status(500).json({ error: err.message });
    }
  },
  //#endregion
  //#region updateStaffByID
  updateStaffByID: async (req, res) => {
    const t = await sequelize.transaction();
    const properties = Object.keys(req.body);
    const allowedProperties = [
      "full_name",
      "phone",
      "has_forklift_license",
      "has_punched_in",
    ];
    try {
      const { id } = req.params;
      if (!id || isNaN(Number(id))) {
        return res.status(400).json({ error: "Valid staff ID is required" });
      }
      const hasStaff = await Staff.findOne(
        { where: { id: id, is_deleted: false } },
        { transaction: t }
      );
      if (!hasStaff) {
        return res.status(404).json({ error: "Failed to find staff" });
      }
      let matchingProperties = properties.filter((p) =>
        allowedProperties.includes(p)
      );
      if (matchingProperties.length === 0) {
        return res.status(400).json({ error: "No valid properties to update" });
      }
      await Staff.update(
        req.body,
        { where: { id, is_deleted: false } },
        { transaction: t }
      );
      await t.commit();
      res.status(200).json(`Successfully updated staff id: ${id}`);
    } catch (err) {
      await t.rollback();
      res.status(500).json({ error: err.message });
    }
  },
  //#endregion
  //#region deleteStaffByID
  deleteStaffByID: async (req, res) => {
    const t = await sequelize.transaction();
    const { id } = req.params;
    try {
      if (!id || isNaN(Number(id))) {
        return res.status(400).json({ error: "Valid staff ID is required" });
      }
      //soft delete staff by id
      await Staff.update(
        { is_deleted: true },
        { where: { id } },
        { transaction: t }
      );
      //find dependencies of deleted staff
      const deletedStaff = await Staff.findByPk(id, { transaction: t });
      await User.update(
        { is_deleted: true },
        { where: { id: deletedStaff.user_id } },
        { transaction: t }
      );
      await Assignment.update(
        { is_deleted: true, status: "cancelled" },
        { where: { staff_id: id } },
        { transaction: t }
      );
      await t.commit();
      res.status(200).json("Successfully removed staff id:" + id);
    } catch (err) {
      await t.rollback();
      res.status(500).json({ error: err.message });
    }
  },
  //#endregion
};
