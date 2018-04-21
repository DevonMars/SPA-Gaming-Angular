export class Company {
  public _id: string;
  public name: string;
  public largeDescription: string;
  public smallDescription: string;
  public founder: string;
  public country: string;
  public total_employees: number;
  public games: string;

  constructor(name: string, largeDescription: string, smallDescription: string, founder: string, country: string, total_employees: number, games: string, id?: string) {
    this._id = id || " ";
    this.name = name;
    this.largeDescription = largeDescription;
    this.smallDescription = smallDescription;
    this.founder = founder;
    this.country = country;
    this.total_employees = total_employees;
    this.games = games;
  }
}
