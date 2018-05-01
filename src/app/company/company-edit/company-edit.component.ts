import { Component, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {CompanyService} from '../../services/company.service';
import {Company} from '../../models/company.model';
import {Subscription} from "rxjs/Subscription";
import {GameService} from "../../services/game.service";
import {Game} from "../../models/game.model";
import {DataStorageService} from "../../shared/data-storage.service";

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {
  editingMode = false;
  id: string;
  gameStorage: Game[];
  companyForm: FormGroup;
  private gameId: string;


  constructor(private route: ActivatedRoute, private router: Router,
              private companyService: CompanyService, private gameService: GameService, private dataService: DataStorageService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.dataService.getGames();
      this.editingMode = params['id'] != null;
      this.gameService.gamesChanged
        .subscribe((games: Game[]) => {
          this.gameStorage = games;
          this.startForm();
        });

      this.startForm();
    });
  }


  onGameSelected(event){
    console.log(event); //option value will be sent as event
  }

  getGames() {
    return this.gameStorage;
  }

  isEqualGame(id: string) {
    return this.gameId == id;
  }

    onSubmit() {
      if (this.gameId) {
        this.companyForm.value.gameId = this.gameId;
      }
      const company = this.companyForm.value;
      company._id = this.id;
      if (this.editingMode) {
        this.dataService.updateCompany(this.companyForm.value);
      } else {
        this.dataService.addCompany(this.companyForm.value);
      }
      console.log(this.companyForm.value);
      this.onCancel();
    }

    onCancel() {
      this.router.navigate(['../../'], {relativeTo: this.route});
    }

  onGames() {
    (<FormArray>this.companyForm.get('extra_games')).push(
      new FormGroup({
        'title': new FormControl(null, Validators.required)
      })
    );
  }

    private startForm() {
        let companyName = '';
        let companyDescripLG = '';
        let companyDescripSM = '';
        let companyFounder = '';
        let companyCountry = '';
        let companyTotal = 1;
        let companyGame = '';
        let toppings= '';

      this.companyForm = new FormGroup({
        'name': new FormControl(companyName, Validators.required),
        'largeDescription': new FormControl(companyDescripLG, Validators.required),
        'smallDescription': new FormControl(companyDescripLG, Validators.required),
        'founder': new FormControl(companyFounder, Validators.required),
        'country': new FormControl(companyCountry, Validators.required),
        'total_employees': new FormControl(companyTotal, Validators.required),
        'games' : new FormControl(companyGame),
        'toppings' : new FormControl(toppings)
      });

      if (this.editingMode) {
        const company = this.companyService.getCompany(this.id);
          companyName = company.name;
          companyDescripLG = company.largeDescription;
          companyDescripSM = company.smallDescription;
          companyFounder = company.founder;
          companyCountry = company.country;
          companyTotal = company.total_employees;
          companyGame = company.games;
          toppings = company.games;

          this.companyForm.patchValue({
            name: companyName,
            largeDescription: companyDescripLG,
            smallDescription: companyDescripSM,
            founder: companyFounder,
            country: companyCountry,
            total_employees: companyTotal,
            games: companyGame,
            toppings: toppings
          });

      }
    }
}
