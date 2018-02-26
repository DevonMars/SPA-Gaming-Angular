import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {GameService} from "../../services/game.service";
import {Game} from "../../models/game.model";

@Component({
  selector: 'app-game-edit',
  templateUrl: './game-edit.component.html',
  styleUrls: ['./game-edit.component.css']
})
export class GameEditComponent implements OnInit {
  private editingMode = false;
  id: string;
  gameForm: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router,
              private gameService: GameService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.editingMode = params['id'] != null;
      this.startForm();
    });
  }

  onSubmit() {
    const game = this.gameForm.value;
    game._id = this.id;
    if (this.editingMode) {
      this.gameService.updateGame(this.gameForm.value);
    } else {
      this.gameService.addGame(this.gameForm.value);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private startForm() {
    let gameTitle = '';
    let gameDeveloper = '';
    let gameDescrip = '';
    let gameEngine = '';

    this.gameForm = new FormGroup({
      'title': new FormControl(gameTitle, Validators.required),
      'developer': new FormControl(gameDeveloper, Validators.required),
      'description': new FormControl(gameDescrip, Validators.required),
      'engine': new FormControl(gameEngine, Validators.required),
    });

    if (this.editingMode) {
      this.gameService.getGame(this.id).then((newGame: Game) => {
        gameTitle = newGame.title;
        gameDeveloper = newGame.developer;
        gameDescrip = newGame.description;
        gameEngine = newGame.engine;

        this.gameForm.patchValue({
          title: gameTitle,
          developer: gameDeveloper,
          description: gameDescrip,
          engine: gameEngine
        });
      });
    }
  }

}
