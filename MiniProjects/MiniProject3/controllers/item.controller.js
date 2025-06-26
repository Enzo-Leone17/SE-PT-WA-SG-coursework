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
};