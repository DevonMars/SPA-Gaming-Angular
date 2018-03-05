import { Component, OnInit } from '@angular/core';
import {Company} from '../../models/company.model';
import {CompanyService} from '../../services/company.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {GameService} from "../../services/game.service";
import {Game} from "../../models/game.model";

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {
  company: Company;
  id: string;

  constructor(private companyService: CompanyService, private gameService: GameService, private route: ActivatedRoute, private router: Router){}

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.id = params['id'];
        this.companyService.getCompany(this.id).then((company: Company) => {
          this.company = company;
        })
        console.log(this.id);
      });
  }

  getCompany() {
    return this.company;
  }

  getOwnedGame(): Game {
    return this.gameService.getGame(this.company.games);
  }



  onEdit() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDelete() {
    this.companyService.deleteCompany(this.company);
    this.router.navigate(['companies']);
  }

  onAddGame(){
    this.router.navigate(['../../games/create'])
  }



}
