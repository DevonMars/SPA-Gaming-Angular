import {Game} from "./game.model";

export class Company {
  public _id: string;
  public name: string;
  public description: string;
  public founder: string;
  public country: string;
  public total_employees: number;
  public games: Game[];

  constructor(name: string, description: string, founder: string, country: string, total_employees: number, games: Game[], id?: string) {
    this._id = id || " ";
    this.name = name;
    this.description = description;
    this.founder = founder;
    this.country = country;
    this.total_employees = total_employees;
    this.games = games;
  }
}
