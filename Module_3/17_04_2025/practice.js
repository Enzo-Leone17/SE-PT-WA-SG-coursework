/* Create a list of 5 student objects. Each student must have the following structure:

name (string)

age (number)

grade (string)

1. Store all 5 students in an array called students.
2. Crete few more students that will have extra fields (define by your own) and add into the array
*/

// let students = [
//   { name: "John", age: "20", grade: "90" },
//   { name: "Jimmy", age: "21", grade: "80" },
//   { name: "Adam", age: "22", grade: "50" },
//   { name: "Steve", age: "23", grade: "25" },
//   { name: "Wick", age: "24", grade: "90" }
// ];

// let newStudentA = {};
// newStudentA.name = "Becky";
// newStudentA.age = "11";
// newStudentA.grade = "76";
// newStudentA.hobby = "reading";

// let newStudentB = {};
// newStudentB.name = "Fio";
// newStudentB.age = "30";
// newStudentB.grade = "55";
// newStudentB.hobby = "fishing";

// students.push(newStudentA);
// students.push(newStudentB);

// console.log(students);

const books = [
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    year: 1937,
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    year: 1960,
  },
  {
    title: "1984",
    author: "George Orwell",
    year: 1949,
  },
  {
    title: "The Da Vinci Code",
    author: "Dan Brown",
    year: 2003,
  },
  {
    title: "The Fault in Our Stars",
    author: "John Green",
    year: 2012,
  },
];

/*  1. Write a function getBooksAfterYear(year) that:
  Returns a new array with only books published after the given year. Example getBooksAfterYear(2000)
  
  2. Write a function findBookByTitle(title) that:
  Returns the first book object with the matching title (case-sensitive)*/


const getBooksAfterYear = (year) => {
  return books.filter((booksFiltered) => booksFiltered.year > year);
};

const findBookByTitle = (title) => {
    let filteredBook = books.find((book) => book.title === title);
  return filteredBook !== undefined ? filteredBook : 'No book of ' + '\"' + title + '\"' + ' found';
};

const hasBook = (title) => {
  return books.find((book) => book.title === title) !== undefined
    ? true
    : false;
};


/**
 * 
 * @param {boolean} ascending in ascending order? true || false
 * @returns array of books sort by year
 */
const sortBooksByYear = (ascending = true) => {
  let arrangedBooks = [];
  if (ascending) {
    return (arrangedBooks = books.sort((a, b) => a.year - b.year));
  } else {
    return (arrangedBooks = books.sort((a, b) => b.year - a.year));
  }
};

console.log(getBooksAfterYear("2000"));
console.log(findBookByTitle("The fault in Our Stars"));
console.log(hasBook("The Fault in Our Code"));
console.log(sortBooksByYear());
