//Define structure for a person object

export class Person {
  name: string;
  email: string;
  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }

  introduce(): string{
    return `Hi, I'm ${this.name} and my email is ${this.email}.`;
  }
}
