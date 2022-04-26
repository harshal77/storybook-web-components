import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { PlotlyViaCDNModule } from 'angular-plotly.js';
PlotlyViaCDNModule.setPlotlyVersion('latest');

import { TelcoBarChartComponent } from 'src/app/telco-charts/telco-bar-chart/telco-bar-chart.component';

export default {
	title: 'Iauro/Telco-Bar-chart',
	component: TelcoBarChartComponent,
	decorators: [
		moduleMetadata({
			declarations: [],
			imports: [CommonModule, PlotlyViaCDNModule],
		}),
	],
} as Meta;

const Template: Story<TelcoBarChartComponent> = (args: TelcoBarChartComponent) => ({
	props: args,
});

export const Bar = Template.bind({});
Bar.args = {
	barChartData: {
		data: [
			{ x: [1, 2, 3], y: [2, 6, 3], type: 'scatter', mode: 'lines+points', marker: { color: 'red' } },
			{ x: [1, 2, 3], y: [2, 5, 3], type: 'bar' },
		],
		layout: { width: '100%', height: '100%', title: 'A Fancy Plot' },
	},
};
