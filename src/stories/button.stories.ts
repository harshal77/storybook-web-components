import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from 'src/app/button/button.component';
export default {
	title: 'Components/Button',
	component: ButtonComponent,
	decorators: [
		moduleMetadata({
			declarations: [],
			imports: [CommonModule, MatIconModule],
		}),
	],
} as Meta;

const Template: Story<ButtonComponent> = (args: ButtonComponent) => ({
	Component: ButtonComponent,
	props: args,
});

export const primaryButton = Template.bind({});
primaryButton.args = {
	title: 'Button',
	buttonFontSize: '1rem',
	displayIcon: false,
	roundedButton: true,
	iconLink: 'home',
	buttonHeight: '3rem',
	isDisabled: false
};
