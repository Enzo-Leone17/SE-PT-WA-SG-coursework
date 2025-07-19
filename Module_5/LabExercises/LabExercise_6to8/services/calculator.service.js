//import calculator
const Calculator = require("../libraries/calculator.model");
const myCalculator = new Calculator();

module.exports = {
    add: async (req, res) => {
        try {
            let num1 = parseInt(req.query.num1);
            let num2 = parseInt(req.query.num2);
            let result = myCalculator.add(num1, num2);
            if(result == "Invalid input") throw "Invalid input";
            return {result : result};
        } catch (error) {
            return "Error: " + error;
        }
    },
    subtract: async (req, res) => {
        try {
            let num1 = parseInt(req.query.num1);
            let num2 = parseInt(req.query.num2);
            let result = myCalculator.subtract(num1, num2);
            if(result == "Invalid input") throw "Invalid input";
            return {result : result};
        } catch (error) {
            return "Error: " + error;
        }
    },
    multiply: async (req, res) => {
        try {
            let num1 = parseInt(req.query.num1);
            let num2 = parseInt(req.query.num2);
            let result = myCalculator.multiply(num1, num2);
            if(result == "Invalid input") throw "Invalid input";
            return {result : result};
        } catch (error) {
            return "Error: " + error;
        }
    },
    divide: async (req, res) => {
        try {
            let num1 = parseInt(req.query.num1);
            let num2 = parseInt(req.query.num2);
            let result = myCalculator.divide(num1, num2);
            if(result == "Invalid input") throw "Invalid input";
            return {result : result};
        } catch (error) {
            return "Error: " + error;
        }
    }
};