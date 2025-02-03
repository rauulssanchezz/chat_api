export class User {
  private id: number;
  private name: string;
  private email: string;

  constructor(id: number, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  getEmail() {
    return this.email;
  }

  getName() {
    return this.name;
  }

  getId() {
    return this.id;
  }

  setName(name: string) {
    this.name = name;
  }

  setEmail(email: string) {
    this.email = email;
  }

  toString() {
    return `Person: ${this.name}, ${this.email}, ${this.id}`;
  }
}
