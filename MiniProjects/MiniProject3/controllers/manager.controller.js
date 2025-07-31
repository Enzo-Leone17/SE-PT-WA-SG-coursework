//get required service
const managerService = require("../services/manager.service");

module.exports = {
  getAllManagers: async (req, res) => {
    try {
      const managers = await managerService.getAllManagers(req, res);
      res.status(200).json(managers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getManagerByID: async (req, res) => {
    try {
      const manager = await managerService.getManagerByID(req, res);
      res.status(200).json(manager);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getManagerByUserID: async (req, res) => {
    try {
      const manager = await managerService.getManagerByUserID(req, res);
      res.status(200).json(manager);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  createManager: async (req, res) => {
    try {
      const newManager = await managerService.createManager(req, res);
      res.status(201).json(newManager);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  updateManagerByID: async (req, res) => {
    try {
      const updatedManager = await managerService.updateManagerByID(req, res);
      res.status(200).json(updatedManager);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  deleteManagerByID: async (req, res) => {
    try {
      const deletedManager = await managerService.deleteManagerByID(req, res);
      res.status(200).json(deletedManager);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
