export class Company {
  public _id: string;
  public name: string;
  public description: string;
  public founder: string;
  public country: string;
  public total_employees: number;

  constructor(name: string, description: string, founder: string, country: string, total_employees: number, id?: string) {
    this._id = id || " ";
    this.name = name;
    this.description = description;
    this.founder = founder;
    this.country = country;
    this.total_employees = total_employees;
  }
}
