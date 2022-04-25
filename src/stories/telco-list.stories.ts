import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { TelcoListComponent } from 'src/app/telco-list/telco-list.component';
import { NgOption } from '@ng-select/ng-select';
import { FormsModule, NgSelectOption, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
export default {
	title: 'Iauro/Telco-List',
	component: TelcoListComponent,
	decorators: [
		moduleMetadata({
			declarations: [TelcoListComponent],
			imports: [CommonModule, BrowserModule, FormsModule, ReactiveFormsModule, NgSelectModule],
		}),
	],
} as Meta;

const Template: Story<TelcoListComponent> = (args: TelcoListComponent) => ({
	Component: TelcoListComponent,
	props: args,
});

export const Basic = Template.bind({});
Basic.args = {
	placeholder: 'Select Severity',
	dropdownlist: [
		{
			name: 'All',
			value: 'All',
			id: 1,
		},
		{
			name: 'Critical',
			value: 'Critical',
			id: 2,
		},
		{
			name: 'Major',
			value: 'Major',
			id: 3,
		},
		{
			name: 'Clear',
			value: 'Clear',
			id: 4,
		},
	],
	selectedDropdownlist: [],
	bindLabel: 'name',
	showCustomOption: false,
	withInitial: false,
	itemsLimit: 2,
	multiLabelBinding: false,
	customDropdownIcon: false,
	multiselect: false,
	withLimitInitial: false,
	bindLabelArray: ['name', 'value', 'id'],
	fontFamily: 'Noto Sans, sans-serif',
};
