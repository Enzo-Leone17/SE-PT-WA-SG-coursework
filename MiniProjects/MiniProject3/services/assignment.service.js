//require models
const {
  Assignment,
  Task,
  Manager,
  Staff,
  User,
  Item,
  BinLocation,
  sequelize,
} = require("../models");
const { Op } = require("sequelize");

module.exports = {
  //#region getAllAssignments
  getAllAssignments: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      //#region adding filter, sort and search

      //filter
      const filterQuery = {};
      filterQuery.is_deleted = false;

      [
        { name: "status", validQuery: ["assigned", "in progress", "completed", "cancelled"] },
      ].map((field) => {
        if (req.query[field.name] && field.validQuery.includes(req.query[field.name].toLowerCase())) {
          filterQuery[field.name] = req.query[field.name].toLowerCase();
        }
      });

      if (req.query.staff_id && !isNaN(Number(req.query.staff_id))) {
        filterQuery.staff_id = req.query.staff_id;
      }
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

      const { count, rows: assignments } = await Assignment.findAndCountAll({
        include: [
          {
            model: Staff,
            required: req.query?.include_staff ? true : false,
          },
        ],
        limit,
        offset,
        where: filterQuery,
        order: [[sortBy? sortBy : "id", sortOrder? sortOrder : "ASC"]],
      });
      const results = {
        total: count,
        page,
        totalPages: Math.ceil(count / limit),
        assignments,
      };

      res.json(results);
    } catch (err) {
      res.status(500).json({
        error: "Failed to retrieve assignments information",
        details: err.message,
      });
    }
  },
  //#endregion
  //#region getAssignmentByID
  getAssignmentByID: async (req, res) => {
    try {
      const { id } = req.params;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      if (!id || isNaN(Number(id))) {
        return res
          .status(400)
          .json({ error: "Valid assignment ID is required" });
      }

      const { count, rows: assignment } = await Assignment.findAndCountAll({
        include: [
          {
            model: Staff,
            required: false,
          },
          {
            model: Task,
            required: false,
          }
        ],
        limit,
        offset,
        where: {
          id: id,
          is_deleted: false,
        },
      });
      const results = {
        total: count,
        page,
        totalPages: Math.ceil(count / limit),
        assignment,
      };

      res.json(results);
    } catch (err) {
      res.status(500).json({
        error: "Failed to retrieve assignment information by id:" + id,
        details: err.message,
      });
    }
  },
  //#endregion
  //#region createAssignment
  createAssignment: async (req, res) => {
    const t = await sequelize.transaction();
    const staff_id = req?.body?.staff_id || null;
    const task_id = req?.body?.task_id || null;
    const status = req?.body?.status || undefined;
    const notes = req?.body?.notes || undefined;

    try {
      if (!staff_id || isNaN(Number(staff_id))) {
        throw new Error("Valid staff id is required");
      } else if (!task_id || isNaN(Number(task_id))) {
        throw new Error("Valid task id is required");
      }
      const existingStaff = await Staff.findOne(
        { where: { id: staff_id, is_deleted: false } },
        { transaction: t }
      );
      if (!existingStaff) {
        throw new Error("Failed to find staff with id: " + staff_id);
      }
      const existingTask = await Task.findOne(
        { where: { id: task_id, is_deleted: false } },
        { transaction: t }
      );
      if (!existingTask) {
        throw new Error("Failed to find task with id: " + task_id);
      }
      const newAssignment = await Assignment.create(
        {
          staff_id,
          task_id,
          status,
          notes,
        },
        { transaction: t }
      );
      await t.commit();
      res
        .status(201)
        .json(
          "Successfully created new assignment with id:" + newAssignment.id
        );
    } catch (err) {
      await t.rollback();
      res.status(500).json({ error: err.message });
    }
  },
  //#endregion
  //#region updateAssignmentByID
  updateAssignmentByID: async (req, res) => {
    const t = await sequelize.transaction();
    const properties = Object.keys(req.body);
    const allowedProperties = [
      "staff_id",
      "task_id",
      "status",
      "notes",
    ];
    try {
      const { id } = req.params;
      if (!id || isNaN(Number(id))) {
        return res
          .status(400)
          .json({ error: "Valid assignment ID is required" });
      }
      const hasAssignment = await Assignment.findOne(
        { where: { id: id, is_deleted: false } },
        { transaction: t }
      );
      if (!hasAssignment) {
        return res.status(404).json({ error: "Failed to find assignment id: " + id });
      }
      let matchingProperties = properties.filter((p) =>
        allowedProperties.includes(p)
      );
      if (matchingProperties.length === 0) {
        return res.status(400).json({ error: "No valid properties to update" });
      }
      await Assignment.update(
        req.body,
        { where: { id, is_deleted: false } },
        { transaction: t }
      );
      await t.commit();
      res.status(200).json("Successfully updated assignment id:" + id);
    } catch (err) {
      await t.rollback();
      res.status(500).json({ error: err.message });
    }
  },
  //#endregion
  //#region deleteAssignmentByID
  deleteAssignmentByID: async (req, res) => {
    const t = await sequelize.transaction();
    const { id } = req.params;
    try {
      if (!id || isNaN(Number(id))) {
        return res
          .status(400)
          .json({ error: "Valid assignment ID is required" });
      }
      const hasAssignment = await Assignment.findOne(
        { where: { id: id, is_deleted: false } },
        { transaction: t }
      );
      if (!hasAssignment) {
        return res.status(404).json({ error: "Failed to find assignment id: " + id });
      }
      //soft delete task by id
      await Assignment.update(
        { is_deleted: true },
        { where: { id: id } },
        { transaction: t }
      );
      //find dependencies of deleted bin location
      const deletedAssignment = await Assignment.findByPk(id, {
        transaction: t,
      });
      await Task.update(
        { status: "pending" , notes: sequelize.literal("CONCAT(notes, ' (Assignment removed) ')") },
        { where: { id: deletedAssignment.task_id} },
        { transaction: t }
      );
      await t.commit();
      res
        .status(200)
        .json(
          "Successfully removed assignment with id: " + deletedAssignment.id
        );
    } catch (err) {
      await t.rollback();
      res.status(500).json({ error: err.message });
    }
  },
  //#endregion
};
