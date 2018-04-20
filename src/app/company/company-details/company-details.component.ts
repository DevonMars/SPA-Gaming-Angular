import { Component, OnInit } from '@angular/core';
import {Company} from '../../models/company.model';
import {CompanyService} from '../../services/company.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {GameService} from "../../services/game.service";
import {Game} from "../../models/game.model";
import {DataStorageService} from "../../shared/data-storage.service";

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {
  private company: Company;
  id: string;

  constructor(private companyService: CompanyService, private gameService: GameService, private dataService : DataStorageService, private route: ActivatedRoute, private router: Router){}

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.dataService.getGames();
        this.dataService.getCompanies();
        this.id = params['id'];
        this.companyService.companiesChanged.subscribe((companies: Company[]) => {
          this.company = this.companyService.getCompany(this.id)
        });
      });
  }

  getCompany() {
    return this.company
  }

  getCompanyGameCollection(id: string) {
    var game = this.gameService.getGame(id);
    return game;
  }

  onEdit() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onAddGame(){
    this.router.navigate(['../../games/create'])
  }



}
