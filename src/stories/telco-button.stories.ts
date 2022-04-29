import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from 'src/app/button/button.component';
import { FlexLayoutModule } from '@angular/flex-layout';
export default {
	title: 'Iauro/Telco-Button',
	component: ButtonComponent,
	decorators: [
		moduleMetadata({
			declarations: [],
			imports: [CommonModule, MatIconModule, FlexLayoutModule],
		}),
	],
} as Meta;

const Template: Story<ButtonComponent> = (args: ButtonComponent) => ({
	Component: ButtonComponent,
	props: args,
});

export const primaryButton = Template.bind({});
primaryButton.args = {
	title: 'Primary Button',
	buttonFontSize: '1.5rem',
	displayIcon: false,
	roundedButton: true,
	iconLink: 'home',
	iconRight: false,
	buttonHeight: '4rem',
};
