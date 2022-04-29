import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import { ButtonComponent } from './button/button.component';
import { TelcoListComponent } from './telco-list/telco-list.component';
import { TelcoSearchComponent } from './telco-search/telco-search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { TelcoCardsComponent } from './telco-cards/telco-cards.component';
import { TelcoMapsComponent } from './telco-maps/telco-maps.component';
import {} from 'google-maps';
import { TelcoBarChartComponent } from './telco-charts/telco-bar-chart/telco-bar-chart.component';
import { TelcoPieChartComponent } from './telco-charts/telco-pie-chart/telco-pie-chart.component';
import { PlotlyViaCDNModule } from 'angular-plotly.js';
import { TelcoTableComponent } from './telco-table/telco-table.component';

// for table component
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';
import { MatSortModule } from '@angular/material/sort';

// array of web components for exporting
const components = [
	{
		name: 'telco-cards',
		component: TelcoCardsComponent,
	},
	{
		name: 'telco-button',
		component: ButtonComponent,
	},

	{
		name: 'telco-list',
		component: TelcoListComponent,
	},
	{
		name: 'telco-maps',
		component: TelcoMapsComponent,
	},
];

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
		TelcoTableComponent,
	],
	imports: [
		BrowserModule,
		NgSelectModule,
		FormsModule,
		BrowserAnimationsModule,
		MatIconModule,
		PlotlyViaCDNModule,
		FlexLayoutModule,
		MatTableModule,
		MatPaginatorModule,
		MatChipsModule,
		MatSortModule,
		FlexModule,
	],
	providers: [],
	bootstrap: [AppComponent],
	entryComponents: components.map((e) => e.component),
})
export class AppModule {
	constructor(private injector: Injector) {
		this.createWebComponents(components, injector);
	}

	createWebComponents(component: any, injector: Injector) {
		component.forEach((c: any) => {
			const ce = createCustomElement(c.component, { injector });

			customElements.define(c.name, ce);

			c['web-component'] = ce;
		});
	}
}
