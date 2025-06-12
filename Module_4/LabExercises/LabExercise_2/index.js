//link DOM elements
const currentDisplay = document.getElementById("current-display");
const previousDisplay = document.getElementById("previous-display");

//define variables
let currentInput = "";
let previousInput = "";
let operator = "";
let errorEncountered = false;
let errorTimeout = null;

/**
 * Changes current display with button input
 * @param {*} value of button
 */
const appendToDisplay = (value) => {
  if (!errorEncountered) {
    if (value === "+" || value === "-" || value === "*" || value === "/") {
      operationDisplay(value);
    } else {
      currentInput += value;
      currentDisplay.textContent = currentInput;
    }
  }
};

/**
 * Changes previous display to current with operation input, if operation was pressed without a valid current number,
 * changes operation instead
 * @param {*} value of operation
 */
const operationDisplay = (value) => {
  if (operator !== "") {
    calculateResult();
    if (errorEncountered) {
      return;
    }
  } else if (currentInput === "") return;
  previousInput = currentInput;
  switch (value) {
    case "+":
      previousInput += value;
      operator = "+";
      currentInput = "";
      currentDisplay.textContent = currentInput;
      previousDisplay.textContent = previousInput;
      break;
    case "-":
      previousInput += value;
      operator = "-";
      currentInput = "";
      currentDisplay.textContent = currentInput;
      previousDisplay.textContent = previousInput;
      break;
    case "*":
      previousInput += value;
      operator = "*";
      currentInput = "";
      currentDisplay.textContent = currentInput;
      previousDisplay.textContent = previousInput;
      break;
    case "/":
      previousInput += "÷";
      operator = "/";
      currentInput = "";
      currentDisplay.textContent = currentInput;
      previousDisplay.textContent = previousInput;
      break;

    default:
      currentInput = "ERR";
      currentDisplay.textContent = currentInput;
      errorEncountered = true;
      clearDisplayDelayed(1000);
      break;
  }
};

/**
 * Clears display after error
 * @param {*} time in ms
 */
const clearDisplayDelayed = (time) => {
  errorTimeout = setTimeout(() => {
    clearDisplay();
  }, time);
};

/**
 * Clears display
 */
const clearDisplay = () => {
  if (errorEncountered) {
    clearTimeout(errorTimeout);
    errorEncountered = false;
  }
  currentInput = "";
  previousInput = "";
  operator = "";
  currentDisplay.textContent = currentInput;
  previousDisplay.textContent = previousInput;
};

/**
 * Calculates result
 */
const calculateResult = () => {
  if (!errorEncountered) {
    let currentNumber = parseFloat(currentInput);
    let previousNumber = parseFloat(previousInput.slice(0, -1));
    if (isNaN(currentNumber)) {
        currentInput = previousInput.slice(0, -1);
        return;
    }
    else if (isNaN(previousNumber)){
        operator = "";
    }
    switch (operator) {
      case "+":
        currentInput = (previousNumber + currentNumber).toString();
        break;
      case "-":
        currentInput = (previousNumber - currentNumber).toString();

        break;
      case "*":
        currentInput = (previousNumber * currentNumber).toString();
        break;
      case "/":
        currentInput = (previousNumber / currentNumber).toString();
        break;

      default:
        currentInput = "ERR";
        currentDisplay.textContent = currentInput;
        errorEncountered = true;
        clearDisplayDelayed(1000);
        break;
    }
    currentDisplay.textContent = currentInput;
    operator = "";
    previousInput = "";
    previousDisplay.textContent = "";
  }
};
