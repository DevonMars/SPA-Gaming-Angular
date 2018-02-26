import { Component, OnInit } from '@angular/core';
import {Game} from "../../models/game.model";
import {Subscription} from "rxjs/Subscription";
import {GameService} from "../../services/game.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
  games : Game[];
  subscription: Subscription;


  constructor(private gameService: GameService, private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.gameService.getGames()
      .then((games) => this.games = games)
      .catch((error => console.log(error)));
    this.subscription = this.gameService.gameChanged.subscribe((games: Game[]) => {
      this.games = games
    });
  }

  onAddGame() {
    this.router.navigate(['create'], {relativeTo: this.route})
  }

}
