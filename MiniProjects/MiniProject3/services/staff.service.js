//require models
const {
  Assignment,
  Task,
  Manager,
  Staff,
  User,
  sequelize,
} = require("../models");
const staff = require("../models/staff");

module.exports = {
  //#region getAllStaffs
  getAllStaffs: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      const { count, rows: staffs } = await Staff.findAndCountAll({
        limit,
        offset,
        where: {
          is_deleted: false,
        },
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
  getAssignmentsToStaffID: async (req, res) => {
    try {
      const { id } = req.params;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      if (!id || isNaN(Number(id))) {
        return res.status(400).json({ error: "Valid staff ID is required" });
      }

      const { count, rows: staffs } = await Staff.findAndCountAll({
        include: [
          {
            model: Assignment,
            required: false,
          },
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
  createStaff: async (req, res) => {
    const t = await sequelize.transaction();
    const {
      email,
      username,
      password,
      role,
      full_name,
      phone,
      has_forklift_license,
      has_punched_in,
    } = req.body;
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
      })
      const existingUsername = await User.findOne({
        where: {
          username,
        },
      })
      if (existingEmail) {
        throw new Error("This email has already been registered, please login instead");
      } else if (existingUsername) {
        throw new Error(`The username ${username} has already been used, please try another username`);
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
  updateStaffByID: async (req, res) => {
    const t = await sequelize.transaction();
    try {
      const { id } = req.params;
      if (!id || isNaN(Number(id))) {
        return res.status(400).json({ error: "Valid staff ID is required" });
      }
      const hasStaff = await Staff.findOne({ where: { id: id, is_deleted: false } }, { transaction: t });
      if(!hasStaff) {
        return res.status(404).json({ error: "Failed to find staff" });
      }
      await Staff.update(req.body, { where: { id , is_deleted: false} }, { transaction: t });
      await t.commit();
      res.status(200).json("Successfully updated staff id:" + id);
    } catch (err) {
      await t.rollback();
      res.status(500).json({ error: err.message });
    }
  },
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
};
