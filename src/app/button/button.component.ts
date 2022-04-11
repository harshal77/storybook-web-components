import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() title: string = '';
  @Input() backgroundColor?: string;
  @Input() primaryButton?: boolean = false;
  @Input() displayIcon: boolean = false;
  @Input() roundedButton: boolean = true;
  @Input() iconLink: string = '../../assets/perm_identity_white_48dp.svg';
  @Input() iconRight: boolean = false;
  @Output() buttonClick = new EventEmitter<>();
  @Input() buttonFontSize: string = '10px';

  constructor() {}

  buttonClicked() {
    this.buttonClick.emit();
  }
}
