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
  //#region getAllTasks
  getAllTasks: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      
      //#region adding filter, sort and search

      //filter
      const filterQuery = {};
      filterQuery.is_deleted = false;

      if (req.query.status && ["opened", "pending", "cancelled", "closed"].includes(req.query.status.toLowerCase())) {
        filterQuery.status = req.query.status.toLowerCase();
      }

      ["manager_id", "item_id", "bin_location_id"].map((field) => {
        if (req.query[field] && !isNaN(Number(req.query[field]))) {
          filterQuery[field] = req.query[field];
        }
      });

      //sort
      const sortBy = req.query.sortBy;
      const sortOrder = req.query.sortOrder?.toUpperCase();
      const validQuery = ["id", "status", "description", "notes"];
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
          { description: { [Op.like]: `%${req.query.search}%` } },
          { notes: { [Op.like]: `%${req.query.search}%` } },
        ];
      }

      //#endregion

      const { count, rows: tasks } = await Task.findAndCountAll({
        include: [
          {
            model: Assignment,
            required: req.query?.include_assignment ? true : false,
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
        tasks,
      };

      res.json(results);
    } catch (err) {
      res.status(500).json({
        error: "Failed to retrieve tasks information",
        details: err.message,
      });
    }
  },
  //#endregion
  //#region getTaskByID
  getTaskByID: async (req, res) => {
    try {
      const { id } = req.params;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      if (!id || isNaN(Number(id))) {
        return res.status(400).json({ error: "Valid task ID is required" });
      }

      const { count, rows: tasks } = await Task.findAndCountAll({
        include: [
          {
            model: Manager,
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
        tasks,
      };

      res.json(results);
    } catch (err) {
      res.status(500).json({
        error: "Failed to retrieve task information by id:" + id,
        details: err.message,
      });
    }
  },
  //#endregion
  //#region createTask
  createTask: async (req, res) => {
    const t = await sequelize.transaction();
    const manager_id = req?.body?.manager_id || null;
    const item_id = req?.body?.item_id || null;
    const destination_bin_id = req?.body?.destination_bin_id || null;
    const status = req?.body?.status || undefined;
    const description = req?.body?.description || undefined;
    const require_forklift = req?.body?.require_forklift || undefined;

    try {
      if (!manager_id || isNaN(Number(manager_id))) {
        throw new Error("Valid manager id is required");
      } else if (!item_id || isNaN(Number(item_id))) {
        throw new Error("Valid Item id is required");
      } else if (!destination_bin_id || isNaN(Number(destination_bin_id))) {
        throw new Error("Valid destination_bin_id is required");
      }
      const existingManager = await Manager.findOne(
        { where: { id: manager_id, is_deleted: false } },
        { transaction: t }
      );
      const existingItem = await Item.findOne(
        { where: { id: item_id, is_deleted: false } },
        { transaction: t }
      );
      const existingBin = await BinLocation.findOne(
        { where: { id: destination_bin_id, is_deleted: false } },
        { transaction: t }
      );
      if (!existingManager) {
        throw new Error("Failed to find manager, please register first");
      } else if (!existingItem) {
        throw new Error("Failed to find item, please create item first");
      } else if (!existingBin) {
        throw new Error("Failed to find bin, please create bin first");
      }
      const newTask = await Task.create(
        {
          manager_id,
          item_id,
          destination_bin_id,
          status,
          description,
          require_forklift,
        },
        { transaction: t }
      );
      await t.commit();
      res
        .status(201)
        .json("Successfully created new task with id:" + newTask.id);
    } catch (err) {
      await t.rollback();
      res.status(500).json({ error: err.message });
    }
  },
  //#endregion
  //#region updateTaskByID
  updateTaskByID: async (req, res) => {
    const t = await sequelize.transaction();
    const properties = Object.keys(req.body);
    const allowedProperties = ["manager_id", "item_id", "destination_bin_id", "status", "description", "notes", "require_forklift"];
    try {
      const { id } = req.params;
      if (!id || isNaN(Number(id))) {
        return res.status(400).json({ error: "Valid task ID is required" });
      }
      const hasTask = await Task.findOne(
        { where: { id: id, is_deleted: false } },
        { transaction: t }
      );
      if (!hasTask) {
        return res.status(404).json({ error: "Failed to find task" });
      }
      let matchingProperties = properties.filter((p) => allowedProperties.includes(p));
      if (matchingProperties.length === 0) {
        return res.status(400).json({ error: "No valid properties to update" });
      }
      await Task.update(
        req.body,
        { where: { id, is_deleted: false } },
        { transaction: t }
      );
      await t.commit();
      res.status(200).json("Successfully updated task id:" + id);
    } catch (err) {
      await t.rollback();
      res.status(500).json({ error: err.message });
    }
  },
  //#endregion
  //#region deleteTaskByID
  deleteTaskByID: async (req, res) => {
    const t = await sequelize.transaction();
    const { id } = req.params;
    try {
      if (!id || isNaN(Number(id))) {
        return res.status(400).json({ error: "Valid task ID is required" });
      }
      const hasTask = await Task.findOne(
        { where: { id: id, is_deleted: false } },
        { transaction: t }
      );
      if (!hasTask) {
        return res.status(404).json({ error: "Failed to find task" });
      }
      //soft delete task by id
      await Task.update(
        { is_deleted: true , status : "cancelled"},
        { where: { id: id}},
        { transaction: t }
      );
      //find dependencies of deleted task
      const deletedTask = await Task.findByPk(id, { transaction: t });
      await Assignment.update(
        { is_deleted: true , status : "cancelled" },
        { where: { task_id: deletedTask.id } },
        { transaction: t }
      );
      await t.commit();
      res.status(200).json("Successfully removed task id:" + deletedTask.id);
    } catch (err) {
      await t.rollback();
      res.status(500).json({ error: err.message });
    }
  },
  //#endregion
};
