import  {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import 'rxjs/Rx';
import {Company} from '../models/company.model';
import {Http, Headers} from '@angular/http';

import {Subject} from 'rxjs/Subject';
import {HttpClient} from '@angular/common/http';
import {Game} from '../models/game.model';

@Injectable()
export class CompanyService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private serverUrl = environment.serverUrl + 'companies';
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

  addGame(game: Game): Promise<Game> {
    this.games.push(game);
    return this.http.post(this.serverUrl, {
      title: game.title,
      publisher: game.publisher,
      description: game.description,
      engine: game.engine,
      headers: this.headers})
      .toPromise()
      .then(response => {
        this.getGames().then(games => {
          this.games = games;
          this.gameChanged.next(this.games.slice());
        });
        return response.json() as Company;
      })
      .catch(error => {
        console.log(error);
        return this.handleError(error);
      });
  }
}
