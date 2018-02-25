import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CompanyComponent} from './company/company.component';
import {CompanyEditComponent} from './company/company-edit/company-edit.component';
import {CompanyDetailsComponent} from './company/company-details/company-details.component';
import {CompanyListComponent} from './company/company-list/company-list.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/companies', pathMatch: 'full'},
  {path: 'companies', component: CompanyComponent, children: [
      {path: '', component: CompanyListComponent},
      {path: 'create', component: CompanyEditComponent},
      {path: ':id', component: CompanyDetailsComponent},
      {path: ':id/edit', component: CompanyEditComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})


export class AppRoutingModule {

}
