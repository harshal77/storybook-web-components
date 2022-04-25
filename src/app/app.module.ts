import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import { ButtonComponent } from './button/button.component';
import { TelcoListComponent } from './telco-list/telco-list.component';
import { TelcoSearchComponent } from './telco-search/telco-search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { TelcoCardsComponent } from './telco-cards/telco-cards.component';
import { TelcoMapsComponent } from './telco-maps/telco-maps.component';
import { } from "google-maps";
@NgModule({
	declarations: [AppComponent, ButtonComponent, TelcoListComponent, TelcoSearchComponent, TelcoCardsComponent, TelcoMapsComponent],
	imports: [BrowserModule, NgSelectModule, FormsModule, BrowserAnimationsModule, MatIconModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
