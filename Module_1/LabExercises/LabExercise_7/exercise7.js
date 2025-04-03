//Note to self: Add description to function by using JSDoc
//Example:
// /**
//  * Function description
//  * @param arg1 - description of arg1
//  * @param arg2 - description of arg2
//  * @returns - description of return value
//  */
//  function example(arg1, arg2) {
//    // function body
//    return result;
//  }

//Exercise 4 functions - modified for js only

/**
 *
 * Switch between 4 functions and calculate for the 4 main mathematical operations
 * @param a - first number
 * @param b - second number
 * @param operation - operation to perform ("add", "subtract", "multiply", "divide")
 *
 * @returns result of the operation
 */
function calculate(a, b, operation) {
  let resultVal;
  switch (operation) {
    case "add":
      resultVal = add(a, b);
      break;
    case "subtract":
      resultVal = subtract(a, b);
      break;
    case "multiply":
      resultVal = multiply(a, b);
      break;
    case "divide":
      resultVal = divide(a, b);
      break;
    default:
      resultVal = "Error: Invalid operation.";
  }

  return resultVal;
}

//unit testings for calculate function (expected versions of the function),
//individual tests for each operation in a seperate section

// Calculate 10 + 5, Expected output: Result: 15
calculate(10, 5, "add") === 15
  ? console.log(
      'Unit testing for calculate(10, 5, "add") works with an expected output value of 16'
    )
  : console.log('Error! calculate(10, 5, "add") is not working as intended');

// Calculate 75 - 8, Expected output: Result: 67
calculate(75, 8, "subtract") === 67
  ? console.log(
      'Unit testing for calculate(75, 8, "subtract") works with an expected output value of 67'
    )
  : console.log(
      'Error! calculate(75, 8, "subtract") is not working as intended'
    );

// Calculate 10 * 5, Expected output: Result: 50
calculate(10, 5, "multiply") === 50
  ? console.log(
      'Unit testing for calculate(10, 5, "multiply") works with an expected output value of 50'
    )
  : console.log(
      'Error! calculate(10, 5, "multiply") is not working as intended'
    );

// Calculate 10 / 5, Expected output: Result: 2
calculate(10, 5, "divide") === 2
  ? console.log(
      'Unit testing for calculate(10, 5, "divide") works with an expected output value of 2'
    )
  : console.log('Error! calculate(10, 5, "divide") is not working as intended');

/**
 *
 * Add two numbers and return the result
 * @param {*} a first number
 * @param {*} b second number
 * @returns a + b
 */
function add(a, b) {
  return a + b;
}

//unit testings for add function

// Add 910 + 77, Expected output: Result: 987
add(910, 77) === 987
  ? console.log(
      "Unit testing for add(910, 77) works with an expected output value of 77"
    )
  : console.log("Error! add(910, 77) is not working as intended");

// Add 0.7 + 0, Expected output: Result: 0.7
add(0.7, 0) === 0.7
  ? console.log(
      "Unit testing for add(0.7, 0) works with an expected output value of 0.7"
    )
  : console.log("Error! add(0.7, 0) is not working as intended");

// Add -99 + 7, Expected output: Result: -92
add(-99, 7) === -92
  ? console.log(
      "Unit testing for add(-99, 7) works with an expected output value of -92"
    )
  : console.log("Error! add(-99, 7) is not working as intended");

/**
 *
 * Subtract two numbers and return the result
 * @param {*} a first number
 * @param {*} b second number
 * @returns a - b
 */
function subtract(a, b) {
  return a - b;
}

//unit testings for subtract function

// Subtract 100 - 50, Expected output: Result: 50
subtract(100, 50) === 50
  ? console.log(
      "Unit testing for subtract(100, 50) works with an expected output value of 50"
    )
  : console.log("Error! subtract(100, 50) is not working as intended");

// Subtract 0.7 - 32, Expected output: Result: -31.3
subtract(0.7, 32) === -31.3
  ? console.log(
      "Unit testing for subtract(0.7, 32) works with an expected output value of -31.3"
    )
  : console.log("Error! subtract(0.7, 32) is not working as intended");

// Subtract -25 - 0, Expected output: Result: -25
subtract(-25, 0) === -25
  ? console.log(
      "Unit testing for subtract(-25, 0) works with an expected output value of -25"
    )
  : console.log("Error! subtract(-25, 0) is not working as intended");

/**
 *
 * Multiply two numbers and return the result
 * @param {*} a first number
 * @param {*} b second number
 * @returns a * b
 */
function multiply(a, b) {
  return a * b;
}

//unit testings for multiply function
// Multiply 11 * 7.7, Expected output: Result: 84.7
multiply(11, 7.7) === 84.7
  ? console.log(
      "Unit testing for multiply(11, 7.7) works with an expected output value of 84.7"
    )
  : console.log("Error! multiply(11, 7.7) is not working as intended");

// Multiply 7 * 0, Expected output: Result: 0
multiply(7, 0) === 0
  ? console.log(
      "Unit testing for multiply(7, 0) works with an expected output value of 0"
    )
  : console.log("Error! multiply(7, 0) is not working as intended");

// Multiply -5 * -5, Expected output: Result: 25
multiply(-5, -5) === 25
  ? console.log(
      "Unit testing for multiply(-5, -5) works with an expected output value of 25"
    )
  : console.log("Error! multiply(-5, -5) is not working as intended");

/**
 *
 * Divide two numbers and return the result
 * @param {*} a first number
 * @param {*} b second number
 * @returns a / b
 */
function divide(a, b) {
  if (b === 0) {
    return "Error: Division by zero is not allowed.";
  } else {
    if (a.toString().includes(".") || b.toString().includes(".")) {
      return convertFloatToDecimalPlace(a / b, 2); // Round to 2 decimal places if either number is a float
    }
    return a / b;
  }
}

//additional feature function for converting float results rounded to specific decimal place
/**
 *
 * Converts a float to a specific decimal place
 * @param num float to convert
 * @param decimalPlace specific decimal place needed
 * @returns float in specified decimal place
 */
function convertFloatToDecimalPlace(num, decimalPlace) {
  //get the amt of decimal places currently in num
  let currentDecimalPlace = num.toString().split(".")[1].length;
  if (currentDecimalPlace !== null && decimalPlace < currentDecimalPlace) {
    let numToRound = Math.round(num * Math.pow(10, decimalPlace));
    num = numToRound / Math.pow(10, decimalPlace);
  }
  return num;
}

//unit testings for divide function
// Divide 100 / 5.5, Expected output: Result: 18.18
divide(100, 5.5) === 18.18
  ? console.log(
      "Unit testing for divide(100, 5.5) works with an expected output value of 18.18"
    )
  : console.log("Error! divide(100, 5.5) is not working as intended");

// Divide 0 / 7, Expected output: Result: 0
divide(0, 7) === 0
  ? console.log(
      "Unit testing for divide(0, 7) works with an expected output value of 0"
    )
  : console.log("Error! divide(0, 7) is not working as intended");
//console.log(divide(0, 7));

// Divide -20 / -4, Expected output: Result: 5
divide(-20, -4) === 5
  ? console.log(
      "Unit testing for divide(-20, -4) works with an expected output value of 5"
    )
  : console.log("Error! divide(-20, -4) is not working as intended");

// Divide 10 / 0, Expected output: Error: Division by zero is not allowed.
divide(10, 0) === "Error: Division by zero is not allowed."
  ? console.log(
      'Unit testing for divide(10, 0) works with an expected output value of "Error: Division by zero is not allowed."'
    )
  : console.log("Error! divide(10, 0) is not working as intended");

/**
 *
 * Greet the user with their name
 * @param {string} clientUsername
 * @returns message with the user's name or a prompt to enter a valid name
 */
function greetUser(clientUsername = "") {
  if (clientUsername !== "" && clientUsername !== undefined) {
    return "Hello " + clientUsername;
  } else {
    return "Please enter a valid name.";
  }
}

//unit testings for greetUser function
// Greet with "John", Expected output: Hello John
greetUser("John") === "Hello John"
  ? console.log(
      'Unit testing for greetUser("John") works with an expected output value of "Hello John"'
    )
  : console.log('Error! greetUser("John") is not working as intended');

// Greet with "", Expected output: Please enter a valid name.
greetUser("") === "Please enter a valid name."
  ? console.log(
      'Unit testing for greetUser("") works with an expected output value of "Please enter a valid name."'
    )
  : console.log('Error! greetUser("") is not working as intended');

// Greet with undefined, Expected output: Please enter a valid name.
greetUser(undefined) === "Please enter a valid name."
  ? console.log(
      'Unit testing for greetUser(undefined) works with an expected output value of "Please enter a valid name."'
    )
  : console.log("Error! greetUser(undefined) is not working as intended");
