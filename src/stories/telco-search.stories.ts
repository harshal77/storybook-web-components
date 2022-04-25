import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { TelcoSearchComponent } from 'src/app/telco-search/telco-search.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
export default {
	title: 'Iauro/Telco-Search',
	component: TelcoSearchComponent,
	decorators: [
		moduleMetadata({
			declarations: [TelcoSearchComponent],
			imports: [CommonModule, BrowserModule, MatIconModule, MatButtonModule, FormsModule, ReactiveFormsModule],
		}),
	],
} as Meta;

const Template: Story<TelcoSearchComponent> = (args: TelcoSearchComponent) => ({
	Component: TelcoSearchComponent,
	props: args,
});

export const Basic = Template.bind({});
Basic.args = {
	placeholder: 'Search',
	borderColor: '#e2e7ef',
	backgroundColor: '#f5f7fb',
	fontFamily: 'Noto Sans, sans-serif',
	borderRadius: '0px 4px 4px 0px',
};
