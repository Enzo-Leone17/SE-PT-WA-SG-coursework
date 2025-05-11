/*You're building a basic system for a library. There are different types of people involved: Person, Member, and Librarian. You'll also manage Book data

1.  Create a base class Person
Properties: name, email

Method: introduce() – returns "Hi, I'm [name] and my email is [email]."

2.  Create a class Member that extends Person
Extra property: memberId

Method: borrowBook(bookTitle) – returns "Member [name] borrowed [bookTitle]."

3.  Create a class Librarian that extends Person
Extra property: employeeId

Method: addBook(bookTitle) – returns "Librarian [name] added [bookTitle] to the library."

4. Create a class Book
Properties: title, author, year

Method: getSummary() – returns "[title] by [author], published in [year]."

5. Create an array of books and simulate a member borrowing a book.*/

/*Example outcome
Hi, I'm Alice and my email is alice@email.com.
Member Alice borrowed The Hobbit.
Librarian Bob added 1984 to the library.
1984 by George Orwell, published in 1949.*/
import { Book } from "./Models/Book.ts";
import { Librarian } from "./Models/Librarian.ts";
import { Member } from "./Models/Member.ts";


// Example usage:
const member = new Member("Alice", "alice@email.com", "M001");
console.log(member.introduce());
console.log(member.borrowBook("The Hobbit"));

const librarian = new Librarian("Bob", "bob@email.com", "L123");
console.log(librarian.introduce());
console.log(librarian.addBook("1984"));

const book = new Book("1984", "George Orwell", 1949);
console.log(book.getSummary()); // Base class
