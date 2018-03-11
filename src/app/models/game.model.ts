import {Character} from "./character.model";
import {Company} from "./company.model";

export class Game {
  public _id: string;
  public title: string;
  public developer: string;
  public description: string;
  public engine: string;
  public studio: Company[];
  public character: Character[];

  constructor(title: string, developer: string, description: string, engine: string, studio: Company[], character: Character[], id?: string) {
    this._id = id || " ";
    this.title = title;
    this.developer = developer;
    this.description = description;
    this.engine = engine;
    this.studio = studio;
    this.character = character;
  }
}
