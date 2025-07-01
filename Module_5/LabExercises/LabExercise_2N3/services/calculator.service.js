const { parse } = require("path");

module.exports = {
    add: async (req, res) => {
        try {
            let num1 = parseInt(req.query.num1);
            let num2 = parseInt(req.query.num2);
            if(isNaN(num1) || isNaN(num2)) throw "Invalid input";
            let result = num1 + num2;
            return result;
        } catch (error) {
            return "Error: " + error;
        }
    },
    subtract: async (req, res) => {
        try {
            let num1 = parseInt(req.query.num1);
            let num2 = parseInt(req.query.num2);
            if(isNaN(num1) || isNaN(num2)) throw "Invalid input";
            let result = num1 - num2;
            return result;
        } catch (error) {
            return "Error: " + error;
        }
    },
    multiply: async (req, res) => {
        try {
            let num1 = parseInt(req.query.num1);
            let num2 = parseInt(req.query.num2);
            if(isNaN(num1) || isNaN(num2)) throw "Invalid input";
            let result = num1 * num2;
            return result;
        } catch (error) {
            return "Error: " + error;
        }
    },
    divide: async (req, res) => {
        try {
            let num1 = parseInt(req.query.num1);
            let num2 = parseInt(req.query.num2);
            if(isNaN(num1) || isNaN(num2)) throw "Invalid input";
            let result = num1 / num2;
            return result;
        } catch (error) {
            return "Error: " + error;
        }
    }
};