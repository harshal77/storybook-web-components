import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { TelcoPieChartComponent } from 'src/app/telco-charts/telco-pie-chart/telco-pie-chart.component';
import { PlotlyViaCDNModule } from 'angular-plotly.js';
PlotlyViaCDNModule.setPlotlyVersion('latest');

export default {
	title: 'Iauro/Telco-Pie-Chart',
	component: TelcoPieChartComponent,
	decorators: [
		moduleMetadata({
			declarations: [],
			imports: [CommonModule, PlotlyViaCDNModule],
		}),
	],
} as Meta;

const Template: Story<TelcoPieChartComponent> = (args: TelcoPieChartComponent) => ({
	props: args,
});

export const PieChart = Template.bind({});
PieChart.args = {
	pieChartData: {
		data: [
			{
				values: [5, 4, 3, 1, 2, 15],
				rotation: 90,
				text: ['ML5', 'ML4', 'ML3', 'ML2', 'ML1', ''],
				textinfo: 'text',
				textposition: 'inside',
				marker: {
					colors: [
						'rgba(14, 127, 0, .5)',
						'rgba(110, 154, 22, .5)',
						'rgba(170, 202, 42, .5)',
						'rgba(202, 209, 95, .5)',
						'rgba(210, 206, 145, .5)',
						'rgba(255, 255, 255, 0)',
					],
				},
				labels: ['4.5-5', '3.5-4.49', '2.5-3.49', '1.5-2.49', '1-1.49'],
				sort: false,
				hoverinfo: 'label',
				hole: 0.5,
				type: 'pie',
				showlegend: true,
			},
		],
		layout: {
			title: '',
			height: 400,
			width: 500,
			legend: {
				visible: true,
				orientation: 'h',
				font: {
					color: 'black',
					size: 11,
					family: 'Calibri',
					bold: true,
				},
				hoverlabel: {
					bgcolor: 'transparent',
				},
				x: 0,
				y: 0,
				tracetoggle: true,
			},
			annotations: [
				{
					font: {
						size: 14,
					},
					showarrow: false,
					text: 'Health Score - 70%',
					x: 0.5,
					y: 0.52,
				},
			],
			margin: { l: 0, r: 0, b: 0, t: 0 },
			xaxis: {
				type: 'category',
				zeroline: false,
				showticklabels: false,
				showgrid: false,
			},
			yaxis: {
				type: 'category',
				zeroline: false,
				showticklabels: false,
				showgrid: false,
			},
		},
	},
};
