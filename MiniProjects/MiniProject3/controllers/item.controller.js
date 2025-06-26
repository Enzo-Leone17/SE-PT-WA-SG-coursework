//get required service
const itemService = require("../services/item.service");

module.exports = {
    getAllItems: async (req, res) => {
        try {
            const items = await itemService.getAllItems(
                req, res
            );
            res.status(200).json(items);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getItemByID: async (req, res) => {
        try {
            const item = await itemService.getItemByID(
                req, res
            );
            res.status(200).json(item);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    createItem: async (req, res) => {
        try {
            const newItem = await itemService.createItem(
                req, res
            );
            res.status(201).json(newItem);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    updateItemQuantityByID: async (req, res) => {
        try {
            const updatedItem = await itemService.updateItemQuantityByID(
                req, res
            );
            res.status(200).json(updatedItem);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    updateItemTypingByID: async (req, res) => {
        try {
            const updatedItem = await itemService.updateItemTypingByID(
                req, res
            );
            res.status(200).json(updatedItem);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    deleteItemByID: async (req, res) => {
        try {
            const deletedItem = await itemService.deleteItemByID(
                req, res
            );
            res.status(200).json(deletedItem);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};