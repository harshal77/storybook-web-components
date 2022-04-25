import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TelcoCardsComponent } from 'src/app/telco-cards/telco-cards.component';
export default {
	title: 'Iauro/Telco-Card',
	component: TelcoCardsComponent,
	decorators: [
		moduleMetadata({
			declarations: [TelcoCardsComponent],
			imports: [CommonModule, BrowserModule, MatIconModule, MatButtonModule, FormsModule, ReactiveFormsModule],
		}),
	],
} as Meta;

const Template: Story<TelcoCardsComponent> = (args: TelcoCardsComponent) => ({
	Component: TelcoCardsComponent,
	props: args,
});

export const Basic = Template.bind({});
Basic.args = {
	cardIcon: '../../assets/cards-icon/Social_notifications.svg',
	cardTitle: 'Total Alarm',
	cardSubtitle: '1390',
	cardSubtitlePercentage: 12,
	positivePercentageIcon: '../../assets/cards-icon/green-thumbs-up.svg',
	negativePercentageIcon: '../../assets/cards-icon/red-arrow-up.svg',
};
