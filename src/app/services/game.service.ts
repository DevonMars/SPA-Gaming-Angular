import  {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import 'rxjs/Rx';
import {Http, Headers} from '@angular/http';

import {Subject} from 'rxjs/Subject';
import {HttpClient} from '@angular/common/http';
import {Game} from '../models/game.model';

@Injectable()
export class GameService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private serverUrl = environment.serverUrl + 'games';
  private games: Game[] = [];
  gameChanged = new Subject<Game[]>();

  private handleError(error: any): Promise<any> {
    console.log('handleError');
    return Promise.reject(error.message || error);
  }

  constructor(private http: Http) {}

  getGames(): Promise<Game[]>{
    return this.http.get(this.serverUrl, {headers: this.headers})
      .toPromise()
      .then(response => {
        this.games = response.json() as Game[];
        return response.json() as Game[];
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  getGame(id: string): Promise<Game> {
    return this.http.get(this.serverUrl + '/' + id, { headers: this.headers}).toPromise()
      .then((response) => response.json())
      .catch(err => console.log(err));
  }

  addGame(game: Game): Promise<Game> {
    this.games.push(game);
    return this.http.post(this.serverUrl, {
      title: game.title,
      developer: game.developer,
      description: game.description,
      engine: game.engine,
      headers: this.headers})
      .toPromise()
      .then(response => {
        this.getGames().then(games => {
          this.games = games;
          this.gameChanged.next(this.games.slice());
        });
        return response.json() as Game;
      })
      .catch(error => {
        console.log(error);
        return this.handleError(error);
      });
  }

  updateGame(newGame: Game): Promise<Game> {
    return this.http.put(this.serverUrl + '/' + newGame._id + '/edit', {
      title: newGame.title,
      developer: newGame.developer,
      description: newGame.description,
      engine: newGame.engine,
      headers: this.headers})
      .toPromise()
      .then(response => {
        this.getGames().then(games => {
          this.games = games;
          this.gameChanged.next(this.games.slice());
        });
        return response.json() as Game;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  deleteGame(game: Game): Promise<Game> {
    this.games.slice(this.games.indexOf(game), 1);
    return this.http.delete(this.serverUrl + '/' + game._id)
      .toPromise()
      .then(response => {
        return response.json() as Game;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }
}
