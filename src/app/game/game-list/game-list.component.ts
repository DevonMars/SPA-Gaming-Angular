import { Component, OnInit } from '@angular/core';
import {Game} from "../../models/game.model";
import {Subscription} from "rxjs/Subscription";
import {GameService} from "../../services/game.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DataStorageService} from "../../shared/data-storage.service";

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
  games : Game[];
  subscription: Subscription;


  constructor(private gameService: GameService, private router: Router,
              private route: ActivatedRoute, private dataService : DataStorageService) { }

  ngOnInit() {
    this.dataService.getGames();
    this.subscription = this.gameService.gamesChanged.subscribe((games: Game[]) => {
      this.games = games
    });
  }

  getGames() {
    return this.games;
  }

  onAddGame() {
    this.router.navigate(['create'], {relativeTo: this.route})
  }

}
