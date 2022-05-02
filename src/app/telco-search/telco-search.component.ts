import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'app-telco-search',
	templateUrl: './telco-search.component.html',
	styleUrls: ['./telco-search.component.scss'],
})
export class TelcoSearchComponent implements OnInit {
	@Input() backgroundColor: string = '#f5f7fb';
	@Input() borderColor: string = '#e2e7ef';
	@Input() fontFamily: string = 'Noto Sans, sans-serif';
	@Input() placeholder: string = 'Search';
	@Input() borderRadius: string = '0px 4px 4px 0px';
	@Output() searchClicked = new EventEmitter<any>();

	iconUrl: string = '../../assets/search-icon.svg';
	searchText: string = '';

	constructor() { }

	ngOnInit(): void { }

	searchClick() {
		this.searchClicked.emit();
	}
}
