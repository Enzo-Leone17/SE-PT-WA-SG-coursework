/*Create a Map that matches each book title (as the key) with its number of copies (as the value).

Add at least 5 different books into the Map.

After setting up the Map, loop through it and print each book's title and the number of copies available.

Use the for...of loop with Map.entries() or directly destructure [title, copies].


The book 'Harry Potter' has 10 copies available.
The book 'The Hobbit' has 7 copies available.
The book '1984' has 5 copies available.
The book 'Pride and Prejudice' has 3 copies available.
The book 'To Kill a Mockingbird' has 4 copies available.
*/

const libraryBooks = new Map();
// Step 2: Add 5 books to the Map
libraryBooks.set("Harry Potter", 10);
libraryBooks.set("The Hobbit", 7);
libraryBooks.set("1984", 5);
libraryBooks.set("Pride and Prejudice", 3);
libraryBooks.set("To Kill a Mockingbird", 4);
// Step 3: Loop through the Map and print each book and its copies
for (const [title, copies] of libraryBooks) {
  //console.log(`The book '${title}' has ${copies} copies available.`);
}

/*Giving the list of employees
Alice => Sales
Bob => IT
Charlie => HR
Daisy => Marketing
Nathan => Finance
Fiona => IT
Josh => IT
Lucy => Finance

1.Create a Map where the key is the employee name and the value is the department.
2.After creating the Map, go through it and print a message for each employee in this format:
"Employee [Employee Name] works in [Department] department."
 3.  list all employees who work in IT
 */

//step 1: create Map with employee name as key and department as value

const staffDetails = new Map();

staffDetails.set("Alice", "Sales");
staffDetails.set("Bob", "IT");
staffDetails.set("Charlie", "HR");
staffDetails.set("Daisy", "Marketing");
staffDetails.set("Nathan", "Finance");
staffDetails.set("Fiona", "IT");
staffDetails.set("Josh", "IT");
staffDetails.set("Lucy", "Finance");

const staffDetailsCategorized = new Map();

staffDetails.forEach((department, name) => {
  if (!staffDetailsCategorized.has(department)) {
    staffDetailsCategorized.set(department, []);
  }
  staffDetailsCategorized.get(department).push(name);
});

//console.log(staffDetailsCategorized);

//step 2: go through map and print: "Employee [Employee Name] works in [Department] department."

staffDetailsCategorized.forEach((name, department) => {
  for (let i = 0; i < name.length; i++) {
    //console.log(`Employee '${name[i]}' works in '${department}' department.`);
  }
});

//step 3: list all employees who work in IT
const staffInIT = staffDetailsCategorized.get("IT") !== undefined ? staffDetailsCategorized.get("IT") : "";

//console.log("Staff working in IT department are: ", staffInIT);

/*You are helping a library track which student has borrowed which books.
Here’s what you know:
Many students borrow books.
Some students borrow more than one book.
You need a way to quickly check:
What books a student has borrowed.
If a student hasn’t borrowed anything yet.
Your task:
Set up a list where each student's name is connected to the books they have borrowed.
Add information for at least 5 students — some students should have borrowed more than one book.
After setting it up, do two things:
Show all the students and the list of books they have.
Show the books for a student called "Alice"
Example students
Alice => Harry Potter
Bob => The Hobbit
Alice => Pride and Prejudice
Daisy => 1984
Ethan => To Kill a Mockingbird
Bob => Lord of the Rings
*/

//setup student tracking data

class StudentLibraryDetails {
    name: string;
    book: Array<string> | undefined;
    constructor(name, book)
    {
        this.name = name;
        this.book = book
    } 
}

//using sample data
const exampleData = [
  new StudentLibraryDetails("Alice", "Harry Potter"),
  new StudentLibraryDetails("Bob", "The Hobbit"),
  new StudentLibraryDetails("Alice", "Pride and Prejudice"),
  new StudentLibraryDetails("Daisy", "1984"),
  new StudentLibraryDetails("Ethan", "To Kill a Mockingbird"),
  new StudentLibraryDetails("Bob", "Lord of the Rings"),
  new StudentLibraryDetails("Enzo", undefined),
];

//step 1: set up list with name as key, books as value
const studentBorrowData = new Map();

exampleData.forEach((student) => {
  if (!studentBorrowData.has(student?.name)) {
    //if key "name" does not exist, add key
    studentBorrowData.set(student.name, []);
  }
  student?.book != undefined //handle cases of no books borrowed
  ? studentBorrowData.get(student.name).push(student.book) //push value "book" to key "name"
  : studentBorrowData.get(student.name).push("none"); //if no "book", value = "none"
});

//step 2: show all students and books they borrowed
studentBorrowData.forEach((books, name) => {                   //arguments (value, key)
  console.log(`Student '${name}' has borrowed the books: ${books}`);
});

//step 3: get books borrowed by Alice
console.log("Alice has borrowed the books: ", studentBorrowData.get("Alice"));
