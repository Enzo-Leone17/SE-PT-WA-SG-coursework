const arrayData = [1,2,3,4,5];

function swapArrayElements(theArray,posA,posB){
    let returnData = [];
    dupeArrayData(theArray,returnData);
    if(returnData[posA - 1] !== null && returnData[posB - 1] !== null)
    {
        let tempStore = returnData[posA - 1];
        returnData[posA - 1] = returnData[posB - 1];
        returnData[posB - 1] = tempStore;
    }
    return returnData;
}


function addElementToArray(theArray, front = true, elementVal = 1)
{
    let returnData = [];
    dupeArrayData(theArray,returnData);
    if(front === true)
    {
        returnData.unshift(elementVal);
    }
    else{
        returnData.push(elementVal);
    }
    return returnData;
}

function removeElementFromArray(theArray, front = true)
{
    let returnData = [];
    dupeArrayData(theArray,returnData);
    if(front === true)
    {
        returnData.shift();
    }
    else{
        returnData.pop();
    }
    return returnData;
}


function dupeArrayData(fromArray, toArray)
{
    for(let e = 0; e < fromArray.length; e++)
    {
        toArray.push(fromArray[e]);
    }
}


console.log(swapArrayElements(arrayData, 1, 4));
console.log(addElementToArray(arrayData, true, 6))
console.log(removeElementFromArray(arrayData, false));