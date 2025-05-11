// Librarian class extends Person

import { Person } from "./Person.ts";
export class Librarian extends Person {
    employeeId: string;
  constructor(name: string, email: string, employeeId: string) {
    super(name, email);
    this.employeeId = employeeId;
  }

  addBook(bookTitle: string): string {
    return `Librarian ${this.name} added "${bookTitle}" to the library.`;
  }
}
