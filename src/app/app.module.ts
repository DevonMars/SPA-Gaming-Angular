import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';

import { AppComponent } from './app.component';
import { CompanyComponent } from './company/company.component';
import { HeaderComponent } from './header/header.component';
import { CompanyListComponent } from './company/company-list/company-list.component';
import { CompanyItemComponent } from './company/company-list/company-item/company-item.component';
import { CompanyDetailsComponent } from './company/company-details/company-details.component';
import { CompanyEditComponent } from './company/company-edit/company-edit.component';
import {AppRoutingModule} from './app-routing.module';
import {CompanyService} from './services/company.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { GameComponent } from './game/game.component';
import { GameListComponent } from './game/game-list/game-list.component';
import { GameItemComponent } from './game/game-list/game-item/game-item.component';
import { GameEditComponent } from './game/game-edit/game-edit.component';
import { GameDetailsComponent } from './game/game-details/game-details.component';

@NgModule({
  declarations: [
    AppComponent,
    CompanyComponent,
    HeaderComponent,
    CompanyListComponent,
    CompanyItemComponent,
    CompanyDetailsComponent,
    CompanyEditComponent,
    GameComponent,
    GameListComponent,
    GameItemComponent,
    GameEditComponent,
    GameDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [CompanyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
