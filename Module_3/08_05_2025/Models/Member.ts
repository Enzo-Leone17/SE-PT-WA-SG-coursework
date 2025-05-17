// Member class extends Person
import { Person } from "./Person.ts";
export class Member extends Person {
    memberId: string;
  constructor(name: string, email:string, memberId:string) {
    super(name, email); // Call parent constructor
    this.memberId = memberId;
  }

  borrowBook(bookTitle: string): string{
    return `Member ${this.name} borrowed "${bookTitle}".`;
  }
}

