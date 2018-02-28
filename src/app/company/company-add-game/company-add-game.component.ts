import { Component, OnInit } from '@angular/core';
import {Company} from '../../models/company.model';
import {CompanyService} from '../../services/company.service';
import {GameService} from '../../services/game.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Game} from "../../models/game.model";

@Component({
  selector: 'app-company-add-game',
  templateUrl: './company-add-game.component.html',
  styleUrls: ['./company-add-game.component.css']
})
export class CompanyAddGameComponent implements OnInit {
  private id: string;
  company: Company;
  companyForm: FormGroup;
  private games: Game[];
  newGameid: string;
  selected = null;

  selectedValue = null;


  constructor(private companyService: CompanyService,
              private gameService:GameService,
              private route: ActivatedRoute, private router: Router) { }


  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.gameService.getGames().then((data) => {
        this.games = data as Game []
      });
      this.startForm();
    });
    console.log(this.companyForm.value)

  }

  // onSelectedGame(gamesId){
  //   this.company = this.gameService.getGames().filter((games) => games._id == gameid)
  // }

  selectedGame(id: string) {
    return this.newGameid == id;
  }

  onSubmit() {
    this.companyForm.value.games = this.games;
    console.log(this.companyForm.value);
    if (this.newGameid) {
      this.companyForm.value.gamesId = this.newGameid;
    }

    this.companyService.addGametoCompany(this.companyForm.value);

  }



  private startForm() {
    let companyGame = '';

    this.companyForm = new FormGroup({
      'games': new FormControl(companyGame, Validators.required)
    });
  }
}
