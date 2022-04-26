import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-telco-pie-chart',
	templateUrl: './telco-pie-chart.component.html',
	styleUrls: ['./telco-pie-chart.component.scss'],
})
export class TelcoPieChartComponent {
	@Input() pieChartData: any = {};

	constructor() {}
}
