const calculatorService = require("../services/calculator.service");

module.exports = {
  add: async (req, res) => {
    try {
      const result = await calculatorService.add(
        req,
        res
      );
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  subtract: async (req, res) => {
    try {
      const result = await calculatorService.subtract(
        req,
        res
      );
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  multiply: async (req, res) => {
    try {
      const result = await calculatorService.multiply(
        req,
        res
      );
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  divide: async (req, res) => {
    try {
      const result = await calculatorService.divide(
        req,
        res
      );
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
