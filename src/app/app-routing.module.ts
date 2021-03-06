import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CompanyComponent} from './company/company.component';
import {CompanyEditComponent} from './company/company-edit/company-edit.component';
import {CompanyDetailsComponent} from './company/company-details/company-details.component';
import {CompanyListComponent} from './company/company-list/company-list.component';
import {GameComponent} from "./game/game.component";
import {GameListComponent} from "./game/game-list/game-list.component";
import {GameEditComponent} from "./game/game-edit/game-edit.component";
import {GameDetailsComponent} from "./game/game-details/game-details.component";
import {CharacterComponent} from "./character/character.component";
import {CharacterListComponent} from "./character/character-list/character-list.component";
import {CharacterEditComponent} from "./character/character-edit/character-edit.component";
import {CharacterDetailsComponent} from "./character/character-details/character-details.component";

const appRoutes: Routes = [
  {path: '', redirectTo: '/games', pathMatch: 'full'},
  {path: 'companies', component: CompanyComponent, children: [
      {path: '', component: CompanyListComponent},
      {path: 'create', component: CompanyEditComponent},
      {path: ':id', component: CompanyDetailsComponent},
      {path: ':id/edit', component: CompanyEditComponent},
    ]},
  {
    path: 'games', component: GameComponent, children: [
    {path: '', component: GameListComponent},
    {path: 'create', component: GameEditComponent},
    {path: ':id', component: GameDetailsComponent},
    {path: ':id/edit', component: GameEditComponent}
    ]},
  {
    path: 'characters', component: CharacterComponent, children: [
    {path: '', component: CharacterListComponent},
    {path: 'create', component: CharacterEditComponent},
    {path: ':id', component: CharacterDetailsComponent},
    {path: ':id/edit', component: CharacterEditComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})


export class AppRoutingModule {

}
