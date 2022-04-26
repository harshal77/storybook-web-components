import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import { ButtonComponent } from './button/button.component';
import { TelcoListComponent } from './telco-list/telco-list.component';
import { TelcoSearchComponent } from './telco-search/telco-search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { TelcoCardsComponent } from './telco-cards/telco-cards.component';
import { TelcoMapsComponent } from './telco-maps/telco-maps.component';
import {} from 'google-maps';
import { TelcoBarChartComponent } from './telco-charts/telco-bar-chart/telco-bar-chart.component';
import { TelcoPieChartComponent } from './telco-charts/telco-pie-chart/telco-pie-chart.component';

import { PlotlyViaCDNModule, PlotlyViaWindowModule } from 'angular-plotly.js';

@NgModule({
	declarations: [
		AppComponent,
		ButtonComponent,
		TelcoListComponent,
		TelcoSearchComponent,
		TelcoCardsComponent,
		TelcoMapsComponent,
		TelcoBarChartComponent,
		TelcoPieChartComponent,
	],
	imports: [
		BrowserModule,
		NgSelectModule,
		FormsModule,
		BrowserAnimationsModule,
		MatIconModule,
		PlotlyViaCDNModule,
		PlotlyViaWindowModule,
		FlexLayoutModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
