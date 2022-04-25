import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'app-telco-cards',
	templateUrl: './telco-cards.component.html',
	styleUrls: ['./telco-cards.component.scss'],
})
export class TelcoCardsComponent {
	@Input() cardIcon: string = '../../assets/cards-icon/Social_notifications.svg';
	@Input() cardTitle: string = 'Total Alarm';
	@Input() cardSubtitle: string = '1390';
	@Input() cardSubtitlePercentage: number = 12;
	@Input() positivePercentageIcon: string = '../../assets/cards-icon/green-thumbs-up.svg';
	@Input() negativePercentageIcon: string = '../../assets/cards-icon/red-arrow-up.svg';

	@Output() viewAllClicked = new EventEmitter<any>();

	constructor() {}

	viewAllClick() {
		this.viewAllClicked.emit();
	}
}
