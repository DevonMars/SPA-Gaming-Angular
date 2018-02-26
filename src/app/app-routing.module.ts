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

const appRoutes: Routes = [
  {path: '', redirectTo: '/companies', pathMatch: 'full'},
  {path: 'companies', component: CompanyComponent, children: [
      {path: '', component: CompanyListComponent},
      {path: 'create', component: CompanyEditComponent},
      {path: ':id', component: CompanyDetailsComponent},
      {path: ':id/edit', component: CompanyEditComponent}
    ]},
  {
    path: 'games', component: GameComponent, children: [
    {path: '', component: GameListComponent},
    {path: 'create', component: GameEditComponent},
    {path: ':id', component: GameDetailsComponent},
    {path: ':id/edit', component: GameEditComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})


export class AppRoutingModule {

}
