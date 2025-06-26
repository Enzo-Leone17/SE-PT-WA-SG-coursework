//require models
const { Item } = require("../models");

const { Sequelize, where } = require("sequelize");

module.exports = {
  //#region getAllItems
  getAllItems: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      const { count, rows: staffs } = await Item.findAndCountAll({
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
        error: "Failed to retrieve items information",
        details: err.message,
      });
    }
  },
  //#endregion
  getItemByID: async (req, res) => {
    try {
      const { id } = req.params;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      const { count, rows: staffs } = await Item.findAndCountAll({
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
        error: "Failed to item by id" + id,
        details: err.message,
      });
    }
  },
};
