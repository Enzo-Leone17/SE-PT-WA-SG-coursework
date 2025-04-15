//lossy non-strict(datatypes) function


//add two numbers
function addNumbersJS(a, b)
{
    return a+b;
}


//add numbers starting from 1 till user specified 'n'
function sumNumberJS(n)
{
    let resultVal = 0;
    for(let i = 1; i <= n; i++)
    {
        resultVal += i;
    }
    return resultVal;
}


//check score, return 'pass' if >=50, else 'fail'
function checkScoreJS(s)
{
    let result = '';
    (s >= 50) ? result = "Pass" : result = "Fail";
    return result;
}

console.log(checkScoreJS(50));