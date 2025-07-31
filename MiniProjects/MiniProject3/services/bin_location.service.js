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
  //#region getAllBinLocations
  getAllBinLocations: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      //#region adding filter, sort and search

      //filter
      const filterQuery = {};
      filterQuery.is_deleted = false;

      [
        { name: "storage_type", validQuery: ["small", "medium", "big"] },
        { name: "movement_type", validQuery: ["slow", "fast"] },
        { name: "is_full", validQuery: ["true", "false"] },
        { name: "is_blocked", validQuery: ["true", "false"] },
      ].map((field) => {
        if (req.query[field.name] && field.validQuery.includes(req.query[field.name].toLowerCase())) {
          filterQuery[field.name] = req.query[field.name].toLowerCase();
        }
      });

      //sort
      const sortBy = req.query.sortBy;
      const sortOrder = req.query.sortOrder?.toUpperCase();
      const validQuery = ["id", "item_id", "max_quantity", "storage_type", "movement_type", "is_full", "is_blocked"];
      if (sortBy && !validQuery.includes(sortBy)) {
        return res.status(400).json({ error: "Invalid sort field" });
      } else if (sortOrder && !["ASC", "DESC"].includes(sortOrder)) {
        return res.status(400).json({ error: "Invalid sort order" });
      }

      //search
      if (req.query.search) {
        filterQuery[Op.or] = [
          { item_id: { [Op.like]: `%${req.query.search}%` } },
          { max_quantity: { [Op.like]: `%${req.query.search}%` } },
        ];
      }

      //#endregion

      const { count, rows: binLocations } = await BinLocation.findAndCountAll({
        include: [
          {
            model: Item,
            required: req.query?.include_item ? true : false,
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
        binLocations,
      };

      res.json(results);
    } catch (err) {
      res.status(500).json({
        error: "Failed to retrieve bin location information",
        details: err.message,
      });
    }
  },
  //#endregion
  //#region getBinLocationByID
  getBinLocationByID: async (req, res) => {
    try {
      const { id } = req.params;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      if (!id || isNaN(Number(id))) {
        return res.status(400).json({ error: "Valid bin location ID is required" });
      }

      const { count, rows: binLocation } = await BinLocation.findAndCountAll({
        include: [
          {
            model: Item,
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
        binLocation,
      };

      res.json(results);
    } catch (err) {
      res.status(500).json({
        error: "Failed to retrieve bin location information by id:" + id,
        details: err.message,
      });
    }
  },
  //#endregion
  //#region createBinLocation
  createBinLocation: async (req, res) => {
    const t = await sequelize.transaction();
      const item_id = req?.body?.item_id || null;
      const storage_type = req?.body?.storage_type || undefined;
      const movement_type = req?.body?.movement_type || undefined;
      const max_quantity = req?.body?.max_quantity || undefined;
      const is_full = req?.body?.is_full || undefined;
      const is_blocked = req?.body?.is_blocked || undefined;
      const is_deleted = req?.body?.is_deleted || undefined;

    try {
      if(!storage_type || !movement_type || !max_quantity){
        throw new Error("Storage type, movement type, and max quantity are required");
      }
      if (item_id !== null && isNaN(Number(item_id))) {
        throw new Error("Item id provided is invalid");
      }
      const existingItem = item_id === null ? null : await Item.findOne(
        { where: { id: item_id, is_deleted: false } },
        { transaction: t }
      );

      if(existingItem === null && item_id !== null){ 
        throw new Error("Failed to find item with id: " + item_id);
      }

      const newBinLocation = await BinLocation.create(
        {
          item_id,
          storage_type,
          movement_type,
          max_quantity,
          is_full,
          is_blocked,
          is_deleted
        },
        { transaction: t }
      );
      await t.commit();
      res
        .status(201)
        .json("Successfully created new bin location with id:" + newBinLocation.id);
    } catch (err) {
      await t.rollback();
      res.status(500).json({ error: err.message });
    }
  },
  //#endregion
  //#region updateBinLocationByID
  updateBinLocationByID: async (req, res) => {
    const t = await sequelize.transaction();
    const properties = Object.keys(req.body);
    const allowedProperties = ["item_id", "storage_type", "movement_type", "max_quantity", "is_full", "is_blocked", "is_deleted"];
    try {
      const { id } = req.params;
      if (!id || isNaN(Number(id))) {
        return res.status(400).json({ error: "Valid bin location ID is required" });
      }
      const hasBinLocation = await BinLocation.findOne(
        { where: { id: id, is_deleted: false } },
        { transaction: t }
      );
      if (!hasBinLocation) {
        return res.status(404).json({ error: "Failed to find bin location" });
      }
      let matchingProperties = properties.filter((p) => allowedProperties.includes(p));
      if (matchingProperties.length === 0) {
        return res.status(400).json({ error: "No valid properties to update" });
      }
      await BinLocation.update(
        req.body,
        { where: { id, is_deleted: false } },
        { transaction: t }
      );
      await t.commit();
      res.status(200).json("Successfully updated bin location id:" + id);
    } catch (err) {
      await t.rollback();
      res.status(500).json({ error: err.message });
    }
  },
  //#endregion
  //#region deleteBinLocationByID
  deleteBinLocationByID: async (req, res) => {
    const t = await sequelize.transaction();
    const { id } = req.params;
    try {
      if (!id || isNaN(Number(id))) {
        return res.status(400).json({ error: "Valid bin location ID is required" });
      }
      const hasBinLocation = await BinLocation.findOne(
        { where: { id: id, is_deleted: false } },
        { transaction: t }
      );
      if (!hasBinLocation) {
        return res.status(404).json({ error: "Failed to find bin location" });
      }
      //soft delete task by id
      await BinLocation.update(
        { is_deleted: true},
        { where: { id: id}},
        { transaction: t }
      );
      //find dependencies of deleted bin location
      const deletedBinLocation = await BinLocation.findByPk(id, { transaction: t });
      await Task.update(
        { status : "pending" , notes: sequelize.fn("CONCAT", sequelize.col("notes"), " (Bin location removed) ")},
        { where: { destination_bin_id: deletedBinLocation.id } },
        { transaction: t }
      );
      await t.commit();
      res.status(200).json("Successfully removed bin location with id: " + deletedBinLocation.id);
    } catch (err) {
      await t.rollback();
      res.status(500).json({ error: err.message });
    }
  },
  //#endregion
};
