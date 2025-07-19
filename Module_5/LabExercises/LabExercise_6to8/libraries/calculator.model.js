//import logger
const Logger = require("./logger.model");
const myLogger = new Logger();

class Calculator {
    id = Math.floor(Math.random() * 1_000_000);
    add(num1, num2) {
        if (!num1 || !num2 || isNaN(num1) || isNaN(num2)) return "Invalid input";
        let result = num1 + num2;
        this.#log(`Caculator ${this.id} -> Adding ${num1} and ${num2} = ${result}`);
        return result;
    }
    subtract(num1, num2) {
        if (!num1 || !num2 || isNaN(num1) || isNaN(num2)) return "Invalid input";
        let result = num1 - num2;
        this.#log(`Caculator ${this.id} -> Subtracting ${num1} and ${num2} = ${result}`);
        return result;
    }
    multiply(num1, num2) {
        if (!num1 || !num2 || isNaN(num1) || isNaN(num2)) return "Invalid input";
        let result = num1 * num2;
        this.#log(`Caculator ${this.id} -> Multiplying ${num1} and ${num2} = ${result}`);
        return result;
    }
    divide(num1, num2) {
        if (!num1 || !num2 || isNaN(num1) || isNaN(num2)) return "Invalid input";
        let result = num1 / num2;
        this.#log(`Caculator ${this.id} -> Dividing ${num1} and ${num2} = ${result}`);
        return result;
    }

    #log(message) {
        myLogger.log(this.id, message);
    }
};


module.exports = Calculator;