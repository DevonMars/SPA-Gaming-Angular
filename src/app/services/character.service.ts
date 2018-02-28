import  {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import 'rxjs/Rx';
import {Http, Headers} from '@angular/http';

import {Subject} from 'rxjs/Subject';
import {HttpClient} from '@angular/common/http';
import {Character} from '../models/character.model';

@Injectable()
export class CharacterService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private serverUrl = environment.serverUrl + 'characters';
  private characters: Character[] = [];
  charChanged = new Subject<Character[]>();

  private handleError(error: any): Promise<any> {
    console.log('handleError');
    return Promise.reject(error.message || error);
  }

  constructor(private http: Http) {}

  getCharacters(): Promise<Character[]>{
    return this.http.get(this.serverUrl, {headers: this.headers})
      .toPromise()
      .then(response => {
        this.characters = response.json() as Character[];
        return response.json() as Character[];
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  getCharacter(id: string): Promise<Character> {
    return this.http.get(this.serverUrl + '/' + id, { headers: this.headers}).toPromise()
      .then((response) => response.json())
      .catch(err => console.log(err));
  }

  addCharacter(character: Character): Promise<Character> {
    this.characters.push(character);
    return this.http.post(this.serverUrl, {
      name: character.name,
      gender: character.gender,
      age: character.age,
      headers: this.headers})
      .toPromise()
      .then(response => {
        this.getCharacters().then(characters => {
          this.characters = characters
          this.charChanged.next(this.characters.slice());
        });
        return response.json() as Character;
      })
      .catch(error => {
        console.log(error);
        return this.handleError(error);
      });
  }

  updateCharacter(newChar: Character): Promise<Character> {
    return this.http.put(this.serverUrl + '/' + newChar._id + '/edit', {
      name: newChar.name,
      gender: newChar.gender,
      age: newChar.age,
      headers: this.headers})
      .toPromise()
      .then(response => {
        this.getCharacters().then(characters => {
          this.characters = characters;
          this.charChanged.next(this.characters.slice());
        });
        return response.json() as Character;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  deleteCharacter(character: Character): Promise<Character> {
    this.characters.slice(this.characters.indexOf(character), 1);
    return this.http.delete(this.serverUrl + '/' + character._id)
      .toPromise()
      .then(response => {
        return response.json() as Character;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }
}
