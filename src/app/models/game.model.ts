export class Game {
  public _id: string;
  public title: string;
  public publisher: string;
  public description: string;
  public engine: string;

  constructor(title: string, publisher: string, description: string, engine: string, id?: string) {
    this._id = id || " ";
    this.title = title;
    this.publisher = publisher;
    this.description = description;
    this.engine = engine;
  }
}
