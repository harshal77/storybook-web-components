import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { TelcoTableComponent } from 'src/app/telco-table/telco-table.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';
import { MatSortModule } from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

const data = [
	{position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
	{position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
	{position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
	{position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
	{position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
	{position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
	{position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
	{position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
	{position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
	{position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  ];

const headings = ['position', 'name', 'weight', 'symbol'];

export default {
	title: 'Iauro/Telco-Table',
	component: TelcoTableComponent,
	decorators: [
		moduleMetadata({
			declarations: [TelcoTableComponent],
			imports: [
				CommonModule,
				BrowserModule,
				MatNativeDateModule,
				MatTableModule,
				MatPaginatorModule,
				MatChipsModule,
				MatSortModule,
				BrowserAnimationsModule,
				FlexLayoutModule,
			],
		}),
	],
} as Meta;

const Template: Story<TelcoTableComponent> = (args: TelcoTableComponent) => ({
	Component: TelcoTableComponent,
	props: args,
});

export const BasicTable = Template.bind({});
BasicTable.args = {
	tableData: data,
	headings: headings
};
