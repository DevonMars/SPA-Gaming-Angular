import { Component, Input, OnInit } from '@angular/core';
import {Game} from "../../../models/game.model";
import {GameService} from "../../../services/game.service";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-game-item',
  templateUrl: './game-item.component.html',
  styleUrls: ['./game-item.component.css']
})
export class GameItemComponent implements OnInit {
  @Input() index: string;
  @Input() game: Game;

  constructor(private gameService: GameService,  private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
  }

}
