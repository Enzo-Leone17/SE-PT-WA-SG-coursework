//get store service
const storeService = require("../services/store.service");

module.exports = {
  getAllProducts: async (req, res) => {
    try {
      const response = await storeService.populateStorePage(req, res);
      return res.status(200).json(response); 
    } catch (error) {
      return res.status(500).json("Error: " + error);   
    }
  },
  filter: async (req, res) => {
    try {
      const response = await storeService.filterAndSortProducts(req, res);
      return res.status(200).json(response); 
    } catch (error) {
      return res.status(500).json("Error: " + error);
    }
  },
  search: async (req, res) => {
    try {
      const response = await storeService.searchProducts(req, res);
      return res.status(200).json(response); 
    } catch (error) {
      return res.status(500).json("Error: " + error);
    }
  },
};
