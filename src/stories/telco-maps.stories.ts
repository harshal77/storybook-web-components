import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { IMap } from '../app/telco-maps/telco-maps.component';
import { FlexModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as _palette from '../app/telco-maps/theming/palette';
import { TelcoMapsComponent } from 'src/app/telco-maps/telco-maps.component';

export default {
	title: 'Iauro/Telco-Map',
	decorators: [
		moduleMetadata({
			imports: [
				BrowserAnimationsModule,
				CommonModule,
				FormsModule,
				FlexModule,
			],
			declarations: [],
		}),
	],
	component: TelcoMapsComponent,
	argTypes: {
		config: { type: 'object' },
		markers: { type: 'array' },
	},
} as any as Meta;

const pcolors = _palette;

const Template: Story<TelcoMapsComponent> = (args: TelcoMapsComponent) => ({
	component: TelcoMapsComponent,
	props: args,
});

export const Default = Template.bind({});
function generateMarkers(count, start, end) {
	const markers = [];
	for (let i = 0; i < count; i++) {
		const latlan = getLatLng(start, end);

		const obj = {
			id: 'mark-' + i + 1,
			lat: latlan[0],
			lng: latlan[1],
			title: 'Name-' + i + 1,
			label: 'Torgallmenningen' + i + 1,
			color: pcolors['application']['palette-' + Math.floor(Math.random() * 7)],
			link: '#thisisalink',
			mesh: Math.random() < 0.1 ? ['mark-' + i + 1, 'mark-' + Math.round(Math.random() * i + 1)] : null,
		};

		markers.push(obj);
	}

	function getLatLng(start, end) {
		return [Math.random() * (end[0] - start[0]) + start[0], Math.random() * (end[1] - start[1]) + start[1]];
	}

	return markers;
}

const args: IMap = {
	config: {
		iconDefault: 'SITE',
		iconZoomed: 'SITE_ZOOMED_ALT',
		iconSpiderfied: 'NETWORK_ELEMENT',
		iconColor: pcolors['application']['palette-2'],
		iconAnchorX: 11,
		iconAnchorY: 11,
		zoomLevelToChangeIcon: 16,
		centerOnMapUpdate: true,
		showMesh: true,
	},
	markers: generateMarkers(1000, [18.6052695, 73.7522604], [18.431485, 73.9796919]),
};
Default.args = args;

const markersBackup = [
	{
		id: 'mark-1',
		lat: '60.393051',
		lng: '5.324171',
		title: 'Name',
		label: 'Torgallmenningen',
		link: '#thisisalink',
		mesh: ['mark-40', 'mark-30'],
	},
	{
		id: 'mark-2',
		lat: '60.393051',
		lng: '5.324171',
		title: 'Name',
		label: 'Torgallmenningen',
		link: '#thisisalink',
	},
	{
		id: 'mark-3',
		lat: '60.393051',
		lng: '5.324171',
		title: 'Name',
		label: 'Torgallmenningen',
		link: '#thisisalink',
	},
	{
		id: 'mark-4',
		lat: '60.393051',
		lng: '5.324171',
		title: 'Name',
		label: 'Torgallmenningen',
		link: '#thisisalink',
	},
	{
		id: 'mark-5',
		lat: '60.393051',
		lng: '5.324171',
		title: 'Name',
		label: 'Torgallmenningen',
		link: '#thisisalink',
	},
	{
		id: 'mark-6',
		lat: '60.393051',
		lng: '5.324171',
		title: 'Name',
		label: 'Torgallmenningen',
		link: '#thisisalink',
	},
	{
		id: 'mark-7',
		lat: '60.393051',
		lng: '5.324171',
		title: 'Name',
		label: 'Torgallmenningen',
		link: '#thisisalink',
		color: '#FFBF00',
	},
	{
		id: 'mark-8',
		lat: '60.393051',
		lng: '5.324171',
		title: 'Name',
		label: 'Torgallmenningen',
		link: '#thisisalink',
		color: '#33B54D',
	},
	{
		id: 'mark-9',
		lat: '60.394998',
		lng: '5.325203',
		title: 'Name',
		label: 'Torget 2',
		link: '#thisisalink',
	},
	{
		id: 'mark-10',
		lat: '60.394998',
		lng: '5.325203',
		title: 'Name',
		label: 'Torget 2',
		link: '#thisisalink',
	},
	{
		id: 'mark-11',
		lat: '60.394998',
		lng: '5.325203',
		title: 'Name',
		label: 'Torget 2',
		link: '#thisisalink',
	},
	{
		id: 'mark-12',
		lat: '60.394998',
		lng: '5.325203',
		title: 'Name',
		label: 'Torget 2',
		link: '#thisisalink',
	},
	{
		id: 'mark-13',
		lat: '60.394998',
		lng: '5.325203',
		title: 'Name',
		label: 'Torget 2',
		link: '#thisisalink',
	},
	{
		id: 'mark-14',
		lat: '60.394998',
		lng: '5.325203',
		title: 'Name',
		label: 'Torget 2',
		link: '#thisisalink',
	},
	{
		id: 'mark-15',
		lat: '60.394998',
		lng: '5.325203',
		title: 'Name',
		label: 'Torget 2',
		link: '#thisisalink',
	},
	{
		id: 'mark-16',
		lat: '60.394998',
		lng: '5.325203',
		title: 'Name',
		label: 'Torget 2',
		link: '#thisisalink',
	},
	{
		id: 'mark-17',
		lat: '60.342844',
		lng: '5.336836',
		title: 'Name',
		label: 'Gamlehaugen',
		link: '#thisisalink',
	},
	{
		id: 'mark-18',
		lat: '60.342844',
		lng: '5.336836',
		title: 'Name',
		label: 'Gamlehaugen',
		link: '#thisisalink',
	},
	{
		id: 'mark-19',
		lat: '60.342844',
		lng: '5.336836',
		title: 'Name',
		label: 'Gamlehaugen',
		link: '#thisisalink',
	},
	{
		id: 'mark-20',
		lat: '60.342844',
		lng: '5.336836',
		title: 'Name',
		label: 'Gamlehaugen',
		link: '#thisisalink',
	},
	{
		id: 'mark-21',
		lat: '60.342844',
		lng: '5.336836',
		title: 'Name',
		label: 'Gamlehaugen',
		link: '#thisisalink',
	},
	{
		id: 'mark-22',
		lat: '60.342844',
		lng: '5.336836',
		title: 'Name',
		label: 'Gamlehaugen',
		link: '#thisisalink',
	},
	{
		id: 'mark-23',
		lat: '60.342844',
		lng: '5.336836',
		title: 'Name',
		label: 'Gamlehaugen',
		link: '#thisisalink',
	},
	{
		id: 'mark-24',
		lat: '60.342844',
		lng: '5.336836',
		title: 'Name',
		label: 'Gamlehaugen',
		link: '#thisisalink',
	},
	{
		id: 'mark-25',
		lat: '59.908062',
		lng: '10.751341',
		title: 'Name',
		label: 'Operahuset',
		link: '#thisisalink',
	},
	{
		id: 'mark-26',
		lat: '59.908062',
		lng: '10.751341',
		title: 'Name',
		label: 'Operahuset',
		link: '#thisisalink',
	},
	{
		id: 'mark-27',
		lat: '59.908062',
		lng: '10.751341',
		title: 'Name',
		label: 'Operahuset',
		link: '#thisisalink',
	},
	{
		id: 'mark-28',
		lat: '59.908062',
		lng: '10.751341',
		title: 'Name',
		label: 'Operahuset',
		link: '#thisisalink',
	},
	{
		id: 'mark-29',
		lat: '59.908062',
		lng: '10.751341',
		title: 'Name',
		label: 'Operahuset',
		link: '#thisisalink',
	},
	{
		id: 'mark-30',
		lat: '59.908062',
		lng: '10.751341',
		title: 'Name',
		label: 'Operahuset',
		link: '#thisisalink',
	},
	{
		id: 'mark-31',
		lat: '59.908062',
		lng: '10.751341',
		title: 'Name',
		label: 'Operahuset',
		link: '#thisisalink',
	},
	{
		id: 'mark-32',
		lat: '59.908062',
		lng: '10.751341',
		title: 'Name',
		label: 'Operahuset',
		link: '#thisisalink',
	},
	{
		id: 'mark-33',
		lat: '59.948985',
		lng: '10.733869',
		title: 'Name',
		label: 'Ullevål',
		link: '#thisisalink',
	},
	{
		id: 'mark-34',
		lat: '59.948985',
		lng: '10.733869',
		title: 'Name',
		label: 'Ullevål',
		link: '#thisisalink',
	},
	{
		id: 'mark-35',
		lat: '59.948985',
		lng: '10.733869',
		title: 'Name',
		label: 'Ullevål',
		link: '#thisisalink',
	},
	{
		id: 'mark-36',
		lat: '59.948985',
		lng: '10.733869',
		title: 'Name',
		label: 'Ullevål',
		link: '#thisisalink',
	},
	{
		id: 'mark-37',
		lat: '59.948985',
		lng: '10.733869',
		title: 'Name',
		label: 'Ullevål',
		link: '#thisisalink',
	},
	{
		id: 'mark-38',
		lat: '59.948985',
		lng: '10.733869',
		title: 'Name',
		label: 'Ullevål',
		link: '#thisisalink',
	},
	{
		id: 'mark-39',
		lat: '59.948985',
		lng: '10.733869',
		title: 'Name',
		label: 'Ullevål',
		link: '#thisisalink',
	},
	{
		id: 'mark-40',
		lat: '59.948985',
		lng: '10.733869',
		title: 'Name',
		label: 'Ullevål',
		link: '#thisisalink',
	},
];

export const Config = Template.bind({});
const argsConfig: IMap = {
	config: {
		iconDefault: 'SITE',
		iconZoomed: 'SITE_ZOOMED_ALT',
		iconSpiderfied: 'NETWORK_ELEMENT',
		iconColor: pcolors['application']['palette-12'],
		iconAnchorX: 15,
		iconAnchorY: 15,
		zoomLevelToChangeIcon: 10,
		centerOnMapUpdate: true,
		showMesh: true,
	},
	markers: generateMarkers(1000, [18.6052695, 73.7522604], [18.431485, 73.9796919]),
};
Config.args = argsConfig;

export const Markers = Template.bind({});
const argsMarkers: IMap = {
	config: {
		iconDefault: 'SITE',
		iconZoomed: 'SITE_ZOOMED_ALT',
		iconSpiderfied: 'NETWORK_ELEMENT',
		iconColor: pcolors['application']['palette-2'],
		iconAnchorX: 11,
		iconAnchorY: 11,
		zoomLevelToChangeIcon: 16,
		centerOnMapUpdate: true,
		showMesh: true,
	},
	markers: generateMarkers(1000, [30.6052695, 33.7522604], [38.431485, 34.9796919]),
};
Markers.args = argsMarkers;
