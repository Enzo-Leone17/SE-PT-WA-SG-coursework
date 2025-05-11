//What are the results of these expressions? (answer first, then use console.log() to check)

console.log("" + 1 + 0); //expect: "10"
console.log("" - 1 + 0); //expect: -1
console.log(true + false); //expect: 1
console.log(!true); //expect: false
console.log(6 / "3"); //expect: 2
console.log("2" * "3"); //expect: 6
console.log(4 + 5 + "px"); //expect: "9px"
console.log("$" + 4 + 5); //expect: "$45"
console.log("4" - 2); //expect: 2
console.log("4px" - 2); //expect: type error not a number
console.log(" -9 " + 5); //expect: " -9 5"
console.log(" -9 " - 5); //expect: -14
console.log(null + 1); //expect: 1
console.log(undefined + 1); //expect: type error
console.log(undefined == null); //expect: false
console.log(undefined === null); //expect: false
console.log(" \t \n" - 2); //expect: -2
/*It's important to distinguish null from undefined. 
undefined typically indicates that a variable has not been assigned a value at all, 
while null indicates that a variable has been intentionally assigned the absence of a value.
Source: google search AI*/

//Which of the below are not giving the right answer? Why are they not correct? How can we
//fix them?

let three = "3";
let four = "4";
let thirty = "30";
//what is the value of the following expressions?
let addition = three + four; //expect: 34
let multiplication = three * four; //expect: 12
let division = three / four; // expect: 0.75
let subtraction = three - four; //expect: -1
let lessThan1 = three < four; //expect: true
let lessThan2 = thirty < four; //expect: false //log as true: compares characters first which is why 3 < 4

console.log(
  addition,
  multiplication,
  division,
  subtraction,
  lessThan1,
  lessThan2
);

//Which of the following console.log messages will print? Why?
if (0) console.log("#1 zero is true"); //false: in binary 0 is false
if ("0") console.log("#2 zero is true"); //true: string that is not empty is true
if (null) console.log("null is true"); //null is false
if (-1) console.log("negative is true"); //value that is not zero is true
if (1) console.log("positive is true"); //value that is not zero is true

//Rewrite this if using the ternary/conditional operator '?'. Test it with different values for a
//and b. What does the ‘+=’ do?
//+= is addition of a value to a variable then assign that value to the variable

let a = 8,
  b = 3;
let result = `${a} + ${b} is `;
// if (a + b < 10) {
// result += 'less than 10';
// } else {
// result += 'greater than 10';
// }

result += a + b < 10 ? "less than 10" : "greater than 10";
console.log(result);

//Rewrite the following function using: a) function expression syntax, and b) arrow function
//syntax. Test each version to make sure they work the same.

//A
function getGreeting(name) {
  return "Hello " + name + "!";
}

//B
const getGreeting2 = (name) => {
  return "Hello " + name + "!";
};

console.log(getGreeting("John"));
console.log(getGreeting2("Timmy"));

/*a) Complete the inigo object by adding a lastName property and including it in the
greeting.
b) Complete getCatchPhrase so that if the person argument has 6 fingers, it instead
prints his famous catch phrase to the console. HINT: see
https://www.imdb.com/title/tt0093779/characters/nm0001597.
c) Update getCatchPhrase to use arrow function syntax and a conditional operator.*/

const westley = {
  name: "Westley",
  numFingers: 5,
};
const rugen = {
  name: "Count Rugen",
  numFingers: 6,
};
const inigo = {
  firstName: "Inigo",
  lastName: "Montoya",
  greeting(person) {
    let greeting = `Hello ${person.name}, my name is ${this.firstName} ${this.lastName}.\n`;
    console.log(greeting + this.getCatchPhrase(person));
  },
  getCatchPhrase: (person) => {
    return person?.numFingers === 6
      ? "You killed my father, prepare to die!"
      : "Nice to meet you";
  },
};
inigo.greeting(westley);
inigo.greeting(rugen);

/*The following object represents a basketball game and keeps track of the score as the
game progresses.
a) Modify each of the methods so that they can be ‘chained’ together and the last line of
the example code works
b) Add a new method to print the full time final score
c) Add a new object property to keep track of the number of fouls and a method to
increment it, similar but separate to the score. Include the foul count in the half time and
full time console messages
d) Test your object by chaining all the method calls together in different combinations.*/

const basketballGame = {
  score: 0,
  foul: 0,
  freeThrow() {
    this.score++;
    return this;
  },
  basket() {
    this.score += 2;
    return this;
  },
  threePointer() {
    this.score += 3;
    return this;
  },
  halfTime() {
    console.log(
      "Halftime score is " + this.score + " with " + this.foul + " fouls"
    );
    return this;
  },
  fullTime() {
    console.log(
      "Fulltime final score is " + this.score + " with " + this.foul + " fouls"
    );
  },
  madeFoul() {
    this.foul++;
    return this;
  },
};
//modify each of the above object methods to enable function chaining as below:
basketballGame
  .basket()
  .madeFoul()
  .freeThrow()
  .madeFoul()
  .freeThrow()
  .basket()
  .threePointer()
  .halfTime()
  .madeFoul()
  .basket()
  .threePointer()
  .madeFoul()
  .freeThrow()
  .threePointer()
  .fullTime();

/*The object below represents a single city.
a) Write a function that takes an object as an argument and uses a for...in loop to access
and print to the console each of those object properties and their values. Test it using
the sydney object below.
b) Create a new object for a different city with different properties and call your function
again with the new object.*/

const sydney = {
  name: "Sydney",
  population: 5_121_000,
  state: "NSW",
  founded: "26 January 1788",
  timezone: "Australia/Sydney",
};

const singapore = {
  name: "Singapore",
  population: 5_870_000,
  timezone: "Asia/Singapore",
  size: "736 km2",
};

const printCityInfo = (city) => {
  for (let key in city) {
    console.log(`${key}: ${city[key]}`);
  }
};
printCityInfo(sydney);
printCityInfo(singapore);

/*Use the following variables to understand how JavaScript stores objects by reference.
a) Create a new moreSports variable equal to teamSports and add some new sport
values to it (using push and unshift)
b) Create a new dog2 variable equal to dog1 and give it a new value
c) Create a new cat2 variable equal to cat1 and change its name property
d) Print the original teamSports, dog1 and cat1 variables to the console. Have they
changed? Why?
e) Change the way the moreSports and cat2 variables are created to ensure the
originals remain independent*/

let teamSports = ["Hockey", "Cricket", "Volleyball"];
let dog1 = "Bingo";
let cat1 = { name: "Fluffy", breed: "Siberian" };
// let moreSports = teamSports;
// moreSports.push('Tennis');
// moreSports.unshift('Rugby');
// let dog2 = dog1;
// dog2 = 'Scooby';
// let cat2 = cat1;
// cat2.name = 'Talia';
let moreSports = [...teamSports];
moreSports.push("Tennis");
moreSports.unshift("Rugby");
let dog2 = dog1;
dog2 = "Scooby";
let cat2 = { ...cat1 };
cat2.name = "Talia";
console.log(teamSports);
console.log(dog1);
console.log(cat1);
console.log(moreSports);
console.log(dog2);
console.log(cat2);

/*The following constructor function creates a new Person object with the given name and
age values.
a) Create a new person using the constructor function and store it in a variable
b) Create a second person using different name and age values and store it in a separate
variable
c) Print out the properties of each person object to the console
d) Rewrite the constructor function as a class called PersonClass and use it to create a
third person using different name and age values. Print it to the console as well.
e) Add a canDrive method to both the constructor function and the class that returns true
if the person is old enough to drive.*/

function Person(name, age) {
  this.name = name;
  this.age = age;
  this.human = true;
  this.canDrive = () => {
    return this.age >= 16;
  };
}
class PersonClass {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    this.human = true;
  }
  canDrive() {
    return this.age >= 16;
  }
}

const humanA = new Person("John", 30);
const humanB = new Person("Jane", 25);
const humanC = new PersonClass("Timmy", 15);
console.log(humanA, humanA.canDrive());
console.log(humanB, humanB.canDrive());
console.log(humanC, humanC.canDrive());


