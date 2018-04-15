import { Component, OnInit } from '@angular/core';
import {Game} from "../../models/game.model";
import {GameService} from "../../services/game.service";
import {DataStorageService} from "../../shared/data-storage.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit {
  private game: Game;
  id: string;

  constructor(private gameService: GameService, private dataService: DataStorageService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.dataService.getGames();
      this.id = params['id'];
      this.gameService.gamesChanged.subscribe((games: Game[]) => {
        this.game = this.gameService.getGame(this.id)
      })
    })

  }

  getGame(){
    return this.game
  }

}
