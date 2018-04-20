import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {Http} from "@angular/http";

import 'rxjs/add/operator/map'
import {Game} from "../models/game.model";
import {GameService} from "../services/game.service";
import {CompanyService} from "../services/company.service";
import {Company} from "../models/company.model";

@Injectable()
export class DataStorageService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private GamingserverUrl = environment.serverUrl + 'games';
  private CompanyServerUrl = environment.serverUrl + 'companies/';


  constructor(private http: Http,
              private gameService: GameService, private companyService: CompanyService) {
  }


  //GET//

  getGames() {
    this.http.get(this.GamingserverUrl)
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

  getCompanies() {
    this.http.get(this.CompanyServerUrl)
      .map(
        (response) => {
          const companies: Company[] = response.json();

          return companies;
        }
      )
      .subscribe(
        (companies: Company[]) => {
          this.companyService.setCompanies(companies);
        }
      );
  }

  //POST//
  addGame(game: Game) {
    this.http.post(this.GamingserverUrl, game)
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

  addCompany(company: Company) {
    this.http.post(this.CompanyServerUrl, company)
      .map(
        (response) => {
          return response.json();
        }
      )
      .subscribe(
        (company: Company) => {
          this.companyService.addCompany(company);
        }
      );
  }

  //PUT//

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

  updateCompany(company: Company) {
    this.http.put(this.CompanyServerUrl + company._id, company)
      .map(
        (response) => {
          return response.json();
        }
      )
      .subscribe(
        (company: Company) => {
          this.companyService.updateCompany(company);
        }
      );
  }

  //DELETE//

  deleteGame(id: string) {
    this.http.delete(this.GamingserverUrl + id)
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

  deleteCompany(id: string) {
    this.http.delete(this.CompanyServerUrl + id)
      .map(
        (response) => {
          return response.json();
        }
      )
      .subscribe(
        (company: Company) => {
          this.companyService.deleteCompany(company._id);
        }
      );
  }

}
