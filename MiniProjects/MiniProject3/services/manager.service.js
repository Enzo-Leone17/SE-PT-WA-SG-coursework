//require models
const {
  Assignment,
  Task,
  Manager,
  Staff,
  User,
  sequelize,
} = require("../models");
const { Op } = require("sequelize");


module.exports = {
  //#region getAllManagers
  getAllManagers: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      //#region adding filter, sort and search

      //filter
      const filterQuery = {};
      filterQuery.is_deleted = false;

      //sort
      const sortBy = req.query.sortBy;
      const sortOrder = req.query.sortOrder?.toUpperCase();
      const validQuery = ["id", "full_name", "phone"];
      if (sortBy && !validQuery.includes(sortBy)) {
        return res.status(400).json({ error: "Invalid sort field" });
      }
      else if (sortOrder && !["ASC", "DESC"].includes(sortOrder))
      {
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

      const { count, rows: managers } = await Manager.findAndCountAll({
        include: [
          {
            model: Task,
            required: req.query?.include_tasks? true : false,
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
        managers,
      };

      res.json(results);
    } catch (err) {
      res.status(500).json({
        error: "Failed to retrieve managers information",
        details: err.message,
      });
    }
  },
  //#endregion
  //#region getManagerByID
  getManagerByID: async (req, res) => {
    try {
      const { id } = req.params;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      if (!id || isNaN(Number(id))) {
        return res.status(400).json({ error: "Valid manager ID is required" });
      }

      const { count, rows: manager } = await Manager.findAndCountAll({
        include: [
          {
            model: Task,
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
        manager,
      };

      res.json(results);
    } catch (err) {
      res.status(500).json({
        error: "Failed to retrieve manager information by id:" + id,
        details: err.message,
      });
    }
  },
  //#endregion
  //#region getManagerByUserID
  getManagerByUserID: async (req, res) => {
    try {
      const { id } = req.params;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      if (!id || isNaN(Number(id))) {
        return res.status(400).json({ error: "Valid user ID is required" });
      }

      const { count, rows: manager } = await Manager.findAndCountAll({
        include: [
          {
            model: Task,
            required: false,
          },
        ],
        limit,
        offset,
        where: {
          user_id: id,
          is_deleted: false,
        },
      });
      const results = {
        total: count,
        page,
        totalPages: Math.ceil(count / limit),
        manager,
      };

      res.json(results);
    } catch (err) {
      res.status(500).json({
        error: "Failed to retrieve manager information by id:" + id,
        details: err.message,
      });
    }
  },
  //#endregion
  //#region createManager
  createManager: async (req, res) => {
    const t = await sequelize.transaction();

    const email = req?.body?.email || null;
    const username = req?.body?.username || null;
    const password = req?.body?.password || null;
    const role = "manager";
    const full_name = req?.body?.full_name || null;
    const phone = req?.body?.phone || null;

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
      const newManager = await Manager.create(
        {
          user_id: newUser.id,
          full_name,
          phone,
        },
        { transaction: t }
      );
      t.commit();
      res
        .status(201)
        .json("Successfully created new manager with id:" + newManager.id);
    } catch (err) {
      await t.rollback();
      res.status(500).json({ error: err.message });
    }
  },
  //#endregion
  //#region updateManagerByID
  updateManagerByID: async (req, res) => {
    const t = await sequelize.transaction();
    const properties = Object.keys(req.body);
    const allowedProperties = ["full_name", "phone"];
    try {
      const { id } = req.params;
      if (!id || isNaN(Number(id))) {
        return res.status(400).json({ error: "Valid manager ID is required" });
      }
      const hasManager = await Manager.findOne(
        { where: { id: id, is_deleted: false } },
        { transaction: t }
      );
      if (!hasManager) {
        return res.status(404).json({ error: "Failed to find manager" });
      }
      let matchingProperties = properties.filter((p) => allowedProperties.includes(p));
      if (matchingProperties.length === 0) {
        return res.status(400).json({ error: "No valid properties to update" });
      }
      await Manager.update(
        req.body,
        { where: { id, is_deleted: false } },
        { transaction: t }
      );
      await t.commit();
      res.status(200).json("Successfully updated manager id:" + id);
    } catch (err) {
      await t.rollback();
      res.status(500).json({ error: err.message });
    }
  },
  //#endregion
  //#region deleteManagerByID
  deleteManagerByID: async (req, res) => {
    const t = await sequelize.transaction();
    const { id } = req.params;
    try {
      if (!id || isNaN(Number(id))) {
        return res.status(400).json({ error: "Valid manager ID is required" });
      }
      //soft delete manager by id
      await Manager.update(
        { is_deleted: true },
        { where: { id } },
        { transaction: t }
      );
      //find dependencies of deleted manager
      const deletedManager = await Manager.findByPk(id, { transaction: t });
      await User.update(
        { is_deleted: true },
        { where: { id: deletedManager.user_id } },
        { transaction: t }
      );
      await Task.update(
        { status: "pending" },
        { where: { manager_id: id} },
        { transaction: t }
      );
      await t.commit();
      res.status(200).json("Successfully removed manager id:" + id);
    } catch (err) {
      await t.rollback();
      res.status(500).json({ error: err.message });
    }
  },
  //#endregion
};
