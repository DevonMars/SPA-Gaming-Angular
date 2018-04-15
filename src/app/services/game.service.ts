import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {Game} from "../models/game.model";

@Injectable()
export class GameService {

  gamesChanged = new Subject<Game[]>();
  gameChanged = new Subject<Game>();
  private games: Game[] = [];

  constructor() {
  }

  getGame(id: string) {
    const index = this.games.findIndex(g => g._id == id);
    return this.games[index];
  }

  setGames(games: Game[]) {
    this.games = games;
    this.gamesChanged.next(this.games.slice());
  }

  addGame(game: Game) {
    this.games.push(game);
    this.gamesChanged.next(this.games.slice());
  }

  updateGame(game: Game) {
    const index = this.games.findIndex(x => x._id == game._id);
    this.games[index] = game;
    this.gamesChanged.next(this.games.slice());
  }

  deleteGame(id: string) {
    const index = this.games.findIndex(x => x._id == id);
    this.games.splice(index, 1);
    this.gamesChanged.next(this.games.slice());
  }
}
