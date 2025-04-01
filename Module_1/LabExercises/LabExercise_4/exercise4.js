/*Create 4 functions for the 4 main mathematical operations 
(-,+,/,*). Return the calculated value and then output it to the 
screen.*/

const resultVal = document.getElementById("resultVal");

function calculate()
{
    const a = parseFloat(document.getElementById("num1").value);
    const b = parseFloat(document.getElementById("num2").value);
    const operation = document.getElementById("operation").value;

    switch (operation) {
        case "add":
            add(a, b);
            break;
        case "subtract":
            subtract(a, b);
            break;
        case "multiply":
            multiply(a, b);
            break;
        case "divide":
            divide(a, b);
            break;
        default:
            resultVal.innerText = "Error: Invalid operation.";
    }
}

function add(a, b) {
    resultVal.innerText = "Result: " + (a + b);
    // return Math.abs(a + b);
}

function subtract(a, b) {
    resultVal.innerText = "Result: " + (a - b);
    // return Math.abs(a - b);
}

function multiply(a, b) {
    resultVal.innerText = "Result: " + (a * b);
    // return Math.abs(a * b);
}

function divide(a, b) {
    if (b === 0 || a === 0) {
        resultVal.innerText = "Error: Division by zero is not allowed.";
        // return "Error: Division by zero is not allowed.";
    }
    else {
        resultVal.innerText = "Result: " + (a / b);
    }

    // return Math.abs(a / b);
}