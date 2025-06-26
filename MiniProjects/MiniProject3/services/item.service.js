//require models
const { Item, BinLocation, sequelize, Task, Assignment } = require("../models");
const item = require("../models/item");

module.exports = {
  //#region getAllItems
  getAllItems: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      const { count, rows: items } = await Item.findAndCountAll({
        include: [
          {
            model: BinLocation,
            required: false,
          },
        ],
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
        items,
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
  //#region getItemByID
  getItemByID: async (req, res) => {
    const { id } = req.params;
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      if (!id || isNaN(Number(id))) {
        return res.status(400).json({ error: "Valid item ID is required" });
      }

      const { count, rows: items } = await Item.findAndCountAll({
        include: [
          {
            model: BinLocation,
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
        items,
      };

      res.json(results);
    } catch (err) {
      res.status(500).json({
        error: "Failed to item by id" + id,
        details: err.message,
      });
    }
  },
  //#endregion
  //#region createItem
  createItem: async (req, res) => {
    const { description, quantity, storage_type, movement_type } = req.body;
    try {
      if (!description) {
        throw new Error("Item description is required");
      } else if (!quantity) {
        throw new Error("Item quantity is required");
      }
      const item = await Item.create({
        description,
        quantity,
        storage_type,
        movement_type,
      });
      res.status(201).json("Successfully created new item with id:" + item.id);
    } catch (err) {
      res.status(500).json({
        error: "Failed to create item",
        details: err.message,
      });
    }
  },
  //#endregion
  //#region updateItem
  updateItemQuantityByID: async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;
    const t = await sequelize.transaction();
    try {
      if (!id || isNaN(Number(id))) {
        throw new Error("Valid item ID is required");
      } else if (
        !quantity ||
        isNaN(Number(quantity)) ||
        parseInt(quantity) < 0
      ) {
        throw new Error("Valid Item quantity is required");
      }
      const existingItem = await Item.findOne(
        { where: { id, is_deleted: false } },
        { transaction: t }
      );
      if (!existingItem) {
        return res.status(404).json({ error: "Failed to find item" });
      }
      //out of stock
      if (parseInt(quantity) === 0) {
        //soft delete item and update dependencies
        await Item.update(
          { quantity, is_deleted: true },
          { where: { id, is_deleted: false } },
          { transaction: t }
        );
        await BinLocation.update(
          {
            item_id: null,
            is_full: false,
            is_blocked: false,
          },
          { where: { item_id: id } },
          { transaction: t }
        );
        await Task.update(
          { status: "cancelled", is_deleted: true },
          { where: { item_id: id } },
          { transaction: t }
        );
        const deletedTask = await Task.findOne(
        { where: { item_id: id } },
        { transaction: t });

        if (deletedTask !== undefined && deletedTask !== null) {
          await Assignment.update(
            { is_deleted: true, status: "cancelled" },
            { where: { task_id: deletedTask.id } },
            { transaction: t }
          );
        }
        await t.commit();
        return res.json("Successfully updated and removed item with id:" + id);
      } else {
        await Item.update(
          { quantity },
          { where: { id, is_deleted: false } },
          { transaction: t }
        );
        await t.commit();
        return res.json("Successfully updated item with id:" + id);
      }
    } catch (err) {
      await t.rollback();
      res.status(500).json({
        error: "Failed to update item",
        details: err.message,
      });
    }
  },
  //#endregion
  //#region updateItemTypingByID
  updateItemTypingByID: async (req, res) => {
    const { id } = req.params;
    const { storage_type, movement_type } = req.body;
    const t = await sequelize.transaction();
    try {
      //validations
      if (!id || isNaN(Number(id))) {
        throw new Error("Valid item ID is required");
      } else if (!movement_type && !storage_type) {
        throw new Error(
          "Item typing ('storage_type' or 'movement_type') is required"
        );
      }
      if(storage_type && storage_type !== "small" && storage_type !== "medium" && storage_type !== "big"){
        throw new Error(
          "Item typing ('storage_type') is invalid"
        );
      }
      if(movement_type && movement_type !== "slow" && movement_type !== "fast"){
        throw new Error(
          "Item typing ('movement_type') is invalid"
        );
      }
      const existingItem = await Item.findOne(
        { where: { id, is_deleted: false } },
        { transaction: t }
      );
      if (!existingItem) {
        return res.status(404).json({ error: "Failed to find item" });
      }
      let parameters = {};
      movement_type
        ? (parameters.movement_type = movement_type)
        : null;
      storage_type
        ? (parameters.storage_type = storage_type)
        : null;
      await Item.update(
        parameters,
        { where: { id, is_deleted: false } },
        { transaction: t }
      );
      await t.commit();
      res.json("Successfully updated item with id:" + id);
    } catch (err) {
      await t.rollback();
      res.status(500).json({
        error: "Failed to update item",
        details: err.message,
      });
    }
  },
  //#endregion
  //#region deleteItemByID
  deleteItemByID: async (req, res) => {
    const { id } = req.params;
    const t = await sequelize.transaction();
    try {
      if (!id || isNaN(Number(id))) {
        throw new Error("Valid item ID is required");
      }
      //soft delete item by id
      await Item.update(
        { is_deleted: true },
        { where: { id, is_deleted: false } },
        { transaction: t }
      );

      //update dependencies of deleted item
      await BinLocation.update(
        {
          item_id: null,
          is_full: false,
          is_blocked: false,
        },
        { where: { item_id: id } },
        { transaction: t }
      );

      await Task.update(
        {
          status: "cancelled",
          is_deleted: true,
        },
        { where: { item_id: id } },
        { transaction: t }
      );

      const deletedTask = await Task.findOne(
        { where: { item_id: id } },
        { transaction: t });

      if (deletedTask !== undefined && deletedTask !== null) {
        await Assignment.update(
          { is_deleted: true, status: "cancelled" },
          { where: { task_id: deletedTask.id } },
          { transaction: t }
        );
      }

      await t.commit();
      res.json("Successfully deleted item with id:" + id);
    } catch (err) {
      await t.rollback();
      res.status(500).json({
        error: "Failed to delete item",
        details: err.message,
      });
    }
  },
};
