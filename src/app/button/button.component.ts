import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'telco-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})

export class ButtonComponent {
  @Input() title: string = '';
  @Input() backgroundColor?: string;
  @Input() primaryButton?: boolean = false;
  @Input() displayIcon: boolean = false;
  @Input() roundedButton: boolean = true;
  @Input() iconLink: string = '../../assets/perm_identity_white_48dp.svg';
  @Input() iconRight: boolean = false;
  @Output() buttonClick = new EventEmitter<any>();
  @Input() buttonFontSize: string = '10px';

  constructor() {}

  buttonClicked() {
    this.buttonClick.emit();
  }
}
