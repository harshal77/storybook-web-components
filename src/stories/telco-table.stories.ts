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
	PaginationShow: true,
};
