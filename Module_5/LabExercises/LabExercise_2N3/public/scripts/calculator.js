//dom elements
const num1 = document.getElementById("num1");
const num2 = document.getElementById("num2");
const result = document.getElementById("result");

const addNumbers = async () => {
  result.innerHTML = "";
  try {
    let val1 = num1.value;
    let val2 = num2.value;
    await fetch(`/calculator/add?num1=${val1}&num2=${val2}`)
      .then((response) => response.json())
      .then((data) => {
        result.innerHTML = data;
      });
  } catch (error) {
    result.innerHTML = "Error: " + error;
  }
};

const subtractNumbers = async () => {
  result.innerHTML = "";
  try {
    let val1 = num1.value;
    let val2 = num2.value;
    await fetch(`/calculator/subtract?num1=${val1}&num2=${val2}`)
      .then((response) => response.json())
      .then((data) => {
        result.innerHTML = data;
      });
  } catch (error) {
    result.innerHTML = "Error: " + error;
  }
};

const multiplyNumbers = async () => {
  result.innerHTML = "";
  try {
    let val1 = num1.value;
    let val2 = num2.value;
    await fetch(`/calculator/multiply?num1=${val1}&num2=${val2}`)
      .then((response) => response.json())
      .then((data) => {
        result.innerHTML = data;
      });
  } catch (error) {
    result.innerHTML = "Error: " + error;
  }
};

const divideNumbers = async () => {
  result.innerHTML = "";
  try {
    let val1 = num1.value;
    let val2 = num2.value;
    await fetch(`/calculator/divide?num1=${val1}&num2=${val2}`)
      .then((response) => response.json())
      .then((data) => {
        result.innerHTML = data;
      });
  } catch (error) {
    result.innerHTML = "Error: " + error;
  }
};