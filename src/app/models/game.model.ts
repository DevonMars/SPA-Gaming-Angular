import {Character} from "./character.model";

export class Game {
  public _id: string;
  public title: string;
  public developer: string;
  public description: string;
  public engine: string;
  public character: Character[];

  constructor(title: string, developer: string, description: string, engine: string, character: Character[], id?: string) {
    this._id = id || " ";
    this.title = title;
    this.developer = developer;
    this.description = description;
    this.engine = engine;
    this.character = character;
  }
}
