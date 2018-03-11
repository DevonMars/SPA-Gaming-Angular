import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {Http} from "@angular/http";

import 'rxjs/add/operator/map'
import {Game} from "../models/game.model";
import {GameService} from "../services/game.service";

@Injectable()
export class DataStorageService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private serverUrl = environment.serverUrl + 'games';


  constructor(private http: Http,
              private gameService: GameService) {
  }

  getGames() {
    this.http.get(this.serverUrl)
      .map(
        (response) => {
          const games: Game[] = response.json();

          return games;
        }
      )
      .subscribe(
        (games: Game[]) => {
          this.gameService.setGames(games);
        }
      );
  }

  getGamebyId(id: string) {
    this.http.get(this.serverUrl + '/' + id)
      .map(
        (response) => {
          const game: Game = response.json();

          return game;
        }
      )
      .subscribe(
        (game: Game) => {
          this.gameService.gameChanged.next(game);
        }
      )
  }

  addGame(game: Game) {
    this.http.post(this.serverUrl, game)
      .map(
        (response) => {
          return response.json();
        }
      )
      .subscribe(
        (game: Game) => {
          this.gameService.addGame(game);
        }
      );
  }

  updateGame(game: Game) {
    this.http.put(this.gameService + game._id, game)
      .map(
        (response) => {
          return response.json();
        }
      )
      .subscribe(
        (game: Game) => {
          this.gameService.updateGame(game);
        }
      );
  }

  deleteGame(id: string) {
    this.http.delete(this.serverUrl + id)
      .map(
        (response) => {
          return response.json();
        }
      )
      .subscribe(
        (game: Game) => {
          this.gameService.deleteGame(game._id);
        }
      );
  }

}
