import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CharacterService} from "../../services/character.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Character} from "../../models/character.model";

@Component({
  selector: 'app-character-edit',
  templateUrl: './character-edit.component.html',
  styleUrls: ['./character-edit.component.css']
})
export class CharacterEditComponent implements OnInit {
  private editingMode = false;
  id: string;
  characterForm: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router,
              private characterService: CharacterService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.editingMode = params['id'] != null;
      this.startForm();
    });
  }

  onSubmit() {
    const character = this.characterForm.value;
    character._id = this.id;
    if (this.editingMode) {
      this.characterService.updateCharacter(this.characterForm.value);
    } else {
      this.characterService.addCharacter(this.characterForm.value);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private startForm() {
    let charName = '';
    let charGender = '';
    let charAge = 1;

    this.characterForm = new FormGroup({
      'name': new FormControl(charName, Validators.required),
      'gender': new FormControl(charGender, Validators.required),
      'age': new FormControl(charAge, Validators.required)
    });

    if (this.editingMode) {
      this.characterService.getCharacter(this.id).then((newChar: Character) => {
        charName = newChar.name;
        charGender = newChar.gender;
        charAge = newChar.age;

        this.characterForm.patchValue({
          name: charName,
          gender: charGender,
          age: charAge
        });
      });
    }
  }
}
