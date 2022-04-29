import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
	selector: 'telco-button',
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
	@Input() title: string = 'Primary Button';
	@Input() backgroundColor: string = '#660099';
	@Input() displayIcon: boolean = false;
	@Input() roundedButton: boolean = true;
	@Input() iconLink: string = 'home';
	@Input() iconRight: boolean = false;
	@Input() buttonFontSize: string = '1.5rem';
	@Input() buttonHeight: string = '3rem';
	@Input() textColor: string = 'white';

	@Output() buttonClick = new EventEmitter<any>();
	buttonClicked() {
		this.buttonClick.emit();
	}
}
