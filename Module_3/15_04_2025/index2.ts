/*//typescript example function

let totalVisitors = 0;

function countVisitor(): number | null {
  // we define the return data type for this function as number or null
  let countElement = document.getElementById("count");
  if (countElement instanceof HTMLInputElement) {
    let count = countElement.value;
    return totalVisitors + parseInt(count);
  }
  return null;
}
  
//Arrow function example
let sum = (a: number, b: number): number => {
  return a + b;
}
*/

function addNumbersTS(a: number, b: number): number | null {
  if (typeof a === "number" && typeof b === "number") {
    return a + b;
  }
  return null;
}
// console.log(addNumbersTS("a", "b"));
// console.log(addNumbersTS(1, 2));

//sum of numbers starting from 1 to user specified 'n'
function sumNumberTS(n: number): number | null {
  if (typeof n !== "number") {
    //not necessary as it will not compile into JavaScript, but still runs in tsx
    return null; //return null if data type is not a number
  }
  let resultVal = 0;
  for (let i = 1; i <= n; i++) {
    //total sum from 1 to n
    resultVal += i;
  }
  return resultVal;
}

// console.log(sumNumberTS("five")); //without compiling: runs (using tsx), compile: throws error
// console.log(sumNumberTS(5));


/*  check score, return pass if >=50, ternary operator
function checkScoreTS(s: number): string
{
    let result = '';
    s >= 50 ? result = "Pass" : result = "Fail";
    return result;
}
*/

//check score, return pass if >=50, arrow function && ternary operator
const checkScoreTS = (score: number): string => {
  return score >= 50 ? "Pass" : "Fail";
};

console.log(checkScoreTS(50));
console.log(checkScoreTS(1));
