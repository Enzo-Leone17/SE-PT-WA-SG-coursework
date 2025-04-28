/*
interface Student {
    id: number;
    name: string;
    age: number;
}

let student1 = new Student(123, "enzo", 17);
let student2 = {... student1};
*/

/*
you've just opened your own cozy little café in town. You want to keep track of all the amazing drinks and snacks you offer.

Each item on your menu should have:

A name

A price

A category (like "drink", "dessert", or "snack")

Whether it's available today (yes or no)

Now, your task is to:

Create a list of 4–5 menu items, each with the details above.

Add a new item to the list later on.

Print out the names of all items that are available today.

Calculate the total price if someone orders everything on the menu.
*/

class CafeMenuItem {
  name: string;
  price: number;
  category: string;
  available: boolean | false;
  constructor(
    name: string,
    price: number,
    category: string,
    available: boolean
  ) {
    this.name = name;
    this.price = price;
    this.category = category;
    this.available = available;
  }
  getName() {
    return this.name;
  }
  getAvailable() {
    return this.available;
  }
  getPrice() {
    return this.price;
  }
}

let newCafeMenuList = [
  new CafeMenuItem("chocolate", 10.95, "snack", true),
  new CafeMenuItem("latte", 5.2, "drink", true),
  new CafeMenuItem("ice_cream", 15.5, "desert", true),
  new CafeMenuItem("green_tea", 4, "drink", false),
];

const getAvailableItemsName = (menuList) => {
  let availableItemsName = "Available now: \n";
  menuList.forEach((item) => {
    item.getAvailable() ? (availableItemsName += item.getName() + "\n") : null;
  });
  return availableItemsName;
};

const getTotalPriceOfMenu = (menuList) => {
  let totalPrice = 0;
  menuList.forEach((item) => {
    totalPrice += item.getPrice();
  });
  return "The total price of all items in this menu is: $" + totalPrice;
};

// console.log(getAvailableItemsName(newCafeMenuList));
// console.log(getTotalPriceOfMenu(newCafeMenuList));

class Student {
  id: number;
  name: string;
  score: number;
  dob: string;
  age: number | undefined;
  constructor(id: number, name: string, score: number, dob: string) {
    this.id = id;
    this.name = name;
    this.score = score;
    this.dob = dob;
  }
  getProperty(propertyName) {
    return this.hasOwnProperty(propertyName) ? this[propertyName] : undefined;
  }
}

let studentArr = [
  new Student(1, "Jason", 50, "27/01/1990"),
  new Student(2, "Teddy", 80, "27/03/1989"),
  new Student(3, "Alberto", 60, "11/01/1995"),
  new Student(4, "Alex", 95, "18/12/1992"),
  new Student(5, "David", 88, "07/05/1997"),
  new Student(6, "James", 20, "20/02/1986"),
  new Student(7, "Enzo", 20, "20/02/1986"), //test similar data
];

const calculateAge = (dobString) => {
  const [day, month, year] = dobString.split("/").map(Number);
  const birthDate = new Date(year, month - 1, day);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  // Check if birthday hasn't occurred yet this year
  const hasHadBirthday =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() >= birthDate.getDate());

  if (!hasHadBirthday) {
    age -= 1;
  }
  return age;
};

//one liner functions
const sortStudentsByAge = (ascending = true) => {
  return ascending
    ? {
        ...studentArr.sort(
          (a, b) =>
            calculateAge(b.getProperty("dob")) -
            calculateAge(a.getProperty("dob"))
        ),
      }
    : {
        ...studentArr.sort(
          (a, b) =>
            calculateAge(a.getProperty("dob")) -
            calculateAge(b.getProperty("dob"))
        ),
      };
};

// console.log(sortStudentsByAge());

/*Search for the student named "Alberto"
If found, display his full profile (name, score, and date of birth).
If not found, display: "Student not found".
 2. Scored below 30 and Was born before 1990*/

/**
 * Get/filter student data using key name and value
 * @param searchParameters search by "key:value" format, case-sensitive
 * @returns
 */
const searchStudentArray = (searchParameters) => {
  let returnVal = new Array();
  let searchKey = searchParameters.split(":")[0];
  let searchValue = searchParameters.split(":")[1];
  studentArr.forEach((individual) => {
    if (individual.getProperty(searchKey) == searchValue) {
      returnVal.push(individual);
    }
  });
  return returnVal.length >= 1
    ? returnVal
    : "Student of parameters: " + searchKey + ", " + searchValue + " not found";
};


//Add-on feature to search with multiple params, not very effective
/*const multiSearchStudentArray = (searchParams: string, fufillAll = true) => {
  let paramsToSearch = searchParams.includes(" ")
    ? searchParams.split(" ")
    : searchParams;
  let returnResult = new Array();
  if (typeof paramsToSearch !== "string") {
    //multipass
    if (fufillAll) {
      let newResult = new Array();
      let parameterFail = false;
      paramsToSearch.forEach((param) => {
        let checkResult = searchStudentArray(param);
        console.log(checkResult);
        if (typeof checkResult !== "string" && !parameterFail) {
          checkResult.forEach((childObj) => {
            if (returnResult.length > 0) {
              if (
                returnResult.includes(childObj) &&
                !newResult.includes(childObj)
              ) {
                newResult.push(childObj);
              }
            } else {
              returnResult.push(childObj);
            }
            console.log(newResult);
          });
        } else {
          newResult = new Array("No Student found fufilling search parameters");
          parameterFail = true;
        }
      });
      returnResult = newResult;
    } else {
      paramsToSearch.forEach((param) => {
        let checkResult = searchStudentArray(param);
        if (typeof checkResult !== "string") {
          checkResult.forEach((childObj) => {
            if (!returnResult.includes(childObj)) {
              returnResult.push(childObj);
            }
          });
        }
      });
      if (returnResult.length < 1) {
        returnResult = new Array(
          "No Student found fufilling search parameters"
        );
      }
    }
  }
  else{
    returnResult.push(searchStudentArray(paramsToSearch));
  }
  return returnResult;
};

console.log(multiSearchStudentArray("score:20 dob:20/02/1986"));*/
