import { Story, Meta } from '@storybook/angular';
import { ButtonComponent } from 'src/app/button/button.component';

export default {
	title: 'Iauro/Button',
	component: ButtonComponent,
} as Meta;

const Template: Story<ButtonComponent> = (args: ButtonComponent) => ({
	Component: ButtonComponent,
	props: args,
});

export const primaryButton = Template.bind({});
primaryButton.args = {
	title: 'Primary Button',
	buttonFontSize: '15px',
	primaryButton: true,
	displayIcon: false,
	roundedButton: true,
	iconLink: '../../assets/whiteLogo.svg',
	iconRight: false,
};
