export class Character {
  public _id: string;
  public name: string;
  public gender: string;
  public age: number;

  constructor(name: string, gender: string, age: number, id?: string) {
    this._id = id || " ";
    this.name = name;
    this.gender = gender;
    this.age = age;
  }
}
