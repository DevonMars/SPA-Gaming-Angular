import { Component, OnInit } from '@angular/core';
import {Company} from '../../models/company.model';
import {CompanyService} from '../../services/company.service';
import {GameService} from '../../services/game.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-company-add-game',
  templateUrl: './company-add-game.component.html',
  styleUrls: ['./company-add-game.component.css']
})
export class CompanyAddGameComponent implements OnInit {
  private id: string;
  company: Company;
  companyForm: FormGroup;


  constructor(private companyService: CompanyService,
              private gameService:GameService,
              private route: ActivatedRoute, private router: Router) { }


  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.startForm();
    });
  }

  onSubmit() {
    const company = this.companyForm.value;
    company._id = this.id;
    this.companyService.addCompany(this.companyForm.value);
  }


  getGames(){
    return this.gameService.getGames()
  }


  private startForm() {
    let companyGame = '';

    this.companyForm = new FormGroup({
      'games': new FormControl(companyGame, Validators.required)
    });
  }
}
