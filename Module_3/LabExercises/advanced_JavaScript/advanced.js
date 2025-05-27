/*
makeCounter below is a decorator function which creates and returns a function that
increments a counter.
a) Create a second counter counter2 using the makeCounter function and test to see if
it remains independent to counter1
b) Modify makeCounter so that it takes an argument startFrom specifying where the
counter starts from (instead of always starting from 0)
c) Modify makeCounter to take another argument incrementBy, which specifies how
much each call to counter() should increase the counter value by.
*/

function makeCounter(incrementBy = 1, startFrom = 0) {
  let currentCount = startFrom;
  return function () {
    currentCount += incrementBy;
    console.log(currentCount);
    return currentCount;
  };
}
let counter1 = makeCounter();
counter1(); // 1
counter1(); // 2
let counter2 = makeCounter();
counter2(); // 1
counter2 = makeCounter(4, 6);
counter2(); // 10
counter2(); // 14

/*The following delayMsg function is intended to be used to delay printing a message until
some time has passed.
a) What order will the four tests below print in? Why?
b) Rewrite delayMsg as an arrow function
c) Add a fifth test which uses a large delay time (greater than 10 seconds)
d) Use clearTimeout to prevent the fifth test from printing at all.*/

function delayMsg(msg) {
  console.log(`This message will be printed after a delay: ${msg}`);
}
setTimeout(delayMsg, 100, "#1: Delayed by 100ms"); //4th
setTimeout(delayMsg, 20, "#2: Delayed by 20ms"); //3rd
setTimeout(delayMsg, 0, "#3: Delayed by 0ms"); //2nd
delayMsg("#4: Not delayed at all"); // 1st

delayMsg = (msg) => {
  console.log(`This message will be printed after a delay: ${msg}`);
};

let fifthTest = setTimeout(delayMsg, 11000, "#5: Delayed by 11s"); //5th
clearTimeout(fifthTest);

/*'Debouncing' is a concept that refers to 'putting off' the execution of multiple, fast-timed,
similar requests until there's a brief pause, then only executing the most recent of those
requests. See https://www.techtarget.com/whatis/definition/debouncing
It's often used to handle fast-firing scrolling events in a browser, or to prevent multiple server
requests being initiated if a user clicks repeatedly on a button.
Using the following code to test and start with:
a) Create a debounce(func) decorator, which is a wrapper that takes a function func and
suspends calls to func until there's 1000 milliseconds of inactivity. After this 1 second
pause, the most recent call to func should be executed and any others ignored.
b) Extend the debounce decorator function to take a second argument ms, which defines the
length of the period of inactivity instead of hardcoding to 1000ms
c) Extend debounce to allow the original debounced function printMe to take an argument
msg which is included in the console.log statement.*/
function printMe(msg) {
  console.log("printing debounced message " + msg);
}

function debounce(func, msg = "", ms = 1000) {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(func, ms, msg);
  };
}
printMe = debounce(printMe, '"this ran after 1s"'); //create this debounce function for a)
//fire off 3 calls to printMe within 300ms - only the LAST one should print, after
// 1000ms of no calls
setTimeout(printMe, 100);
setTimeout(printMe, 200);
setTimeout(printMe, 300);

/*The Fibonacci sequence of numbers is a famous pattern where the next number in the
sequence is the sum of the previous 2.
e.g. 1, 1, 2, 3, 5, 8, 13, 21, 34, etc.
a) Write a function printFibonacci() using setInterval that outputs a number in
the Fibonacci sequence every second.
b) Write a new version printFibonacciTimeouts() that uses nested setTimeout
calls to do the same thing
c) Extend one of the above functions to accept a limit argument, which tells it how many
numbers to print before stopping.*/

function printFibonacci(limit = 10) {
  let num1 = 1;
  let prev1 = 0;
  let num2 = 1;
  let count = 0;
  let interval = setInterval(() => {
    console.log(num1);
    prev1 = num1;
    num1 = num2;
    num2 = prev1 + num2;
    count++;
    if (count === limit) {
      clearInterval(interval);
    }
  }, 1000);
}

const fibonacciTimeouts = (limit = 10) => {
  let num1 = 1;
  let prev1 = 0;
  let num2 = 1;
  let count = 0;
  let fibonacciCounter = () => {
    console.log(num1);
    prev1 = num1;
    num1 = num2;
    num2 = prev1 + num2;
    count++;
    if (count < limit) {
      setTimeout(fibonacciCounter, 1000);
    }
  };
  setTimeout(fibonacciCounter, 1000);
};

fibonacciTimeouts(7);

/*The following car object has several properties and a method which uses them to print a
description. When calling the function normally this works as expected, but using it from
within setTimeout fails. Why?*/

let car = {
  make: "Porsche",
  model: "911",
  year: 1964,
  description() {
    console.log(`This car is a ${this.make} ${this.model} from ${this.year}`);
  },
};
//car.description(); //works
//setTimeout(car.description, 200); //fails, reference to 'this' is lost

/*a) Fix the setTimeout call by wrapping the call to car.description() inside a
function
b) Change the year for the car by creating a clone of the original and overriding it
c) Does the delayed description() call use the original values or the new values from
b)? Why?
d) Use bind to fix the description method so that it can be called from within
setTimeout without a wrapper function
e) Change another property of the car by creating a clone and overriding it, and test that
setTimeout still uses the bound value from d) */

//setTimeout(() => car.description(), 200);
setTimeout(car.description.bind(car), 200);

let carClone = Object.assign({}, car);
carClone.year = 1984;

setTimeout(() => car.description(), 400);

/*Use the Function prototype to add a new delay(ms) function to all functions, which can
be used to delay the call to that function by ms milliseconds.*/
/*a) Use the example multiply function below to test it with, as above, and assume that all
delayed functions will take two parameters
b) Use apply to improve your solution so that delayed functions can take any number of
parameters
c) Modify multiply to take 4 parameters and multiply all of them, and test that your
delay prototype function still works.*/

function multiply(a, b) {
  console.log(a * b);
}

Function.prototype.delay = function (ms) {
  const self = this;
  return function (...args) {
    setTimeout(() => self.apply(this, args), ms);
  };
};

multiply = (a, b, c, d) => console.log(a * b * c * d);

multiply.delay(500)(5, 5, 4, 5); // prints 25 after 500 milliseconds

/*The following DigitalClock class uses an interval to print the time every second once
started, until stopped.
a) Create a new class PrecisionClock that inherits from DigitalClock and adds the
parameter precision – the number of ms between 'ticks'. This precision parameter
should default to 1 second if not supplied.
b) Create a new class AlarmClock that inherits from DigitalClock and adds the
parameter wakeupTime in the format hh:mm. When the clock reaches this time, it
should print a 'Wake Up' message and stop ticking. This wakeupTime parameter should
default to 07:00 if not supplied.
*/

class DigitalClock {
  constructor(prefix) {
    this.prefix = prefix;
  }
  display() {
    let date = new Date();
    //create 3 variables in one go using array destructuring
    let [hours, mins, secs] = [
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
    ];

    if (hours < 10) hours = "0" + hours;
    if (mins < 10) mins = "0" + mins;
    if (secs < 10) secs = "0" + secs;
    console.log(`${this.prefix} ${hours}:${mins}:${secs}`);
  }
  stop() {
    clearInterval(this.timer);
  }
  start() {
    this.display();
    this.timer = setInterval(() => this.display(), 1000);
  }
}
// const myClock = new DigitalClock("my clock:");
// myClock.start();

class PrecisionClock extends DigitalClock {
  constructor(prefix, precision = 1000) {
    super(prefix);
    this.precision = precision;
  }
  start() {
    this.display();
    this.timer = setInterval(() => this.display(), this.precision);
  }
}

class AlarmClock extends DigitalClock {
  constructor(prefix, wakeupTime = "07:00") {
    super(prefix);
    this.wakeupTime = wakeupTime;
  }

  display() {
    let date = new Date();
    //create 3 variables in one go using array destructuring
    let [hours, mins, secs] = [
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
    ];

    if (hours < 10) hours = "0" + hours;
    if (mins < 10) mins = "0" + mins;
    if (secs < 10) secs = "0" + secs;
    console.log(`${this.prefix} ${hours}:${mins}:${secs}`);
    if (this.wakeupTime === `${hours}:${mins}`) {
      console.log("Wake Up!");
      this.stop();
    }
  }
}

const myAlarm = new AlarmClock("my alarm:", "06:45");
myAlarm.start();

// Using the following starter code, create a decorator function to validate function arguments
// as strings. Test it by decorating the given orderItems function below.
function orderItems(...itemName) {
  let totalItems = "";
  for (let item of itemName) {
    item === itemName[itemName.length - 1]
      ? (totalItems += item)
      : (totalItems += item + ", ");
  }
  return `Order placed for: ${totalItems}`;
}
// create a decorated version of the original function
const validatedOrderItem = validateStringArg(orderItems);
console.log(validatedOrderItem("Apple Watch")); // should run the function
console.log(validatedOrderItem(123)); // should throw an error
/*a) Create a decorator function validateStringArg(fn) which will validate an
argument passed to fn to ensure that it is a string, throwing an error if not
b) Extend orderItems to use the ... rest operator, allowing multiple item name
arguments, and include them all in the returned string
c) Extend the decorator function to validate as strings all arguments passed to fn
d) When testing the decorated function, use try-catch blocks to handle errors thrown for
non-string arguments*/

function validateStringArg(fn) {
  return function (...args) {
    try {
      for (let arg of args) {
        if (typeof arg !== "string") {
          throw new Error("All arguments must be strings");
        }
      }
    } catch (error) {
      console.error(error);
      return "All arguments must be strings";
    }
    return fn(...args);
  };
}

console.log(validatedOrderItem("Apple Watch","AirPods","Macbook","iPhone","iPad")); // should run the function
console.log(validatedOrderItem("iPhone pro max", 123)); // should throw an error
