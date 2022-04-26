import { Component, Input, OnInit } from '@angular/core';
import { PlotlyModule } from 'angular-plotly.js';
import * as PlotlyJS from 'plotly.js-dist-min';

PlotlyModule.plotlyjs = PlotlyJS;

@Component({
	selector: 'app-telco-bar-chart',
	templateUrl: './telco-bar-chart.component.html',
	styleUrls: ['./telco-bar-chart.component.scss'],
})
export class TelcoBarChartComponent implements OnInit {
	@Input() barChartData: any = {};
	constructor() {}

	ngOnInit(): void {}
}
