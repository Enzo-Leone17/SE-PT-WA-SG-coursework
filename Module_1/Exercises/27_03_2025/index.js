const fruits = ["apple", "banana", "cherry", "strawberry"];

function longestString(fruitArr) {
  let longestStringVal = "";
  fruitArr.forEach((f) => {
    if (f?.length > longestStringVal.length) {
      longestStringVal = f;
    }
  });
  return longestStringVal;
}

console.log(longestString(fruits));

//note: works, but with performance issues when using while loop on big data size
/*function removeDuplicates(fruitArr){
    for(let f = 0; f < fruitArr.length; f++)
    {
        while(fruitArr.includes(fruitArr[f], f + 1))
            {
                let theIndex = fruitArr.indexOf(fruitArr[f], f + 1);
                fruitArr.splice(theIndex, 1);
            }

    }
    return fruitArr;
}

console.log(removeDuplicates(["apple", "banana", "apple", "cherry", "banana"]));*/

//optimized version
function removeDuplicates(fruitArr) {
  let newFruitArr = [];
  for (let f = 0; f < fruitArr.length; f++) {
    if (!newFruitArr.includes(fruitArr[f]) && fruitArr[f]) {
      newFruitArr.push(fruitArr[f]);
    }
  }
  return newFruitArr;
}

console.log(
  removeDuplicates(["apple", "banana", "apple", "cherry", "banana"])
);
