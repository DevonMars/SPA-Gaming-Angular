import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {Character} from "../../models/character.model";
import {CharacterService} from "../../services/character.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {
  characters : Character[];
  subscription: Subscription;


  constructor(private characterService: CharacterService, private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.characterService.getCharacters()
      .then((characters) => this.characters = characters)
      .catch((error => console.log(error)));
    this.subscription = this.characterService.charChanged.subscribe((characters: Character[]) => {
      this.characters = characters
    });
  }

}
