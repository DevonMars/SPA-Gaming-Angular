import {Component, Input, OnInit} from '@angular/core';
import {Character} from "../../../models/character.model";
import {ActivatedRoute, Router} from "@angular/router";
import {CharacterService} from "../../../services/character.service";

@Component({
  selector: 'app-character-item',
  templateUrl: './character-item.component.html',
  styleUrls: ['./character-item.component.css']
})
export class CharacterItemComponent implements OnInit {
  @Input() index: string;
  @Input() character: Character;

  constructor( private router: Router,
               private route: ActivatedRoute, private characterService: CharacterService) { }

  ngOnInit() {
  }

}
