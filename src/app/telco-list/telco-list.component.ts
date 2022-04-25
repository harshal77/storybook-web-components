import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
	selector: 'app-telco-list',
	templateUrl: './telco-list.component.html',
	styleUrls: ['./telco-list.component.scss'],
})
export class TelcoListComponent {
	@Input() dropdownlist: any[] = [];
	@Input() multiselect = true;
	@Input() addTag = true;
	@Input() disableInput = false;
	@Input() selectedDropdownlist: any[] = [];
	@Input() showCustomOption = false;
	@Input() bindLabel: any = 'name';
	@Input() withInitial = false;
	@Input() itemsLimit = 1;
	@Input() multiLabelBinding = false;
	@Input() bindLabelArray: any = ['name', 'value'];
	@Input() placeholder = '';
	@Input() customDropdownIcon = false;
	@Input() withLimitInitial = false;
	@Input() fontFamily = 'Noto Sans, sans-serif';

	@Output() onAdd = new EventEmitter<any>();
	@Output() onRemove = new EventEmitter<any>();
	@Output() onChange = new EventEmitter<any>();
	@Output() onClear = new EventEmitter<any>();
	@Output() onSearch = new EventEmitter<any>();
	@Output() searchedItem = new EventEmitter<any>();
	@Output() onPasteSearchedItem = new EventEmitter<any>();
	@Output() autocompleteChange = new EventEmitter<any>();
	@Output() autocompleteOptionSelect = new EventEmitter<any>();

	insertSearchIcon = '';
	subscription: any;
	isPaste = false;
	private actionSource = new Subject<any>();
	currentAction = this.actionSource.asObservable();

	public get classes(): string[] {
		return [this.withInitial ? 'with-initial' : ''];
	}

	ngOnInit() {
		this.subscription = this.currentAction.pipe(debounceTime(500)).subscribe((value: string) => {
			this.searchedItem.emit(value);
			this.onSearch.emit(value);
		});
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	ngOnChanges() {
		this.bindCustomLabel();
		switch (this.bindLabelArray.length) {
			case 1: {
				this.bindLabelArray = [this.bindLabelArray[0], 'name', 'value'];
				break;
			}
			case 2: {
				this.bindLabelArray = [this.bindLabelArray[0], this.bindLabelArray[1], 'value'];
				break;
			}
			default:
				this.bindLabelArray = ['name', 'value', 'id'];
		}
	}

	toggleDisabled() {
		const item: any = this.dropdownlist[0];
		item.disabled = !item.disabled;
	}

	onAddValue(event: any) {
		this.onAdd.emit(event);
	}

	onRemoveValue(event: any) {
		this.onRemove.emit(event);
	}

	onChangeValue(event: any) {
		this.onChange.emit(event);
	}

	onSearchValue(event: any) {
		if (!this.isPaste) {
			this.onSearch.emit(event);
		} else {
			this.isPaste = false;
		}
	}

	onPasteSearch(event: any) {
		this.isPaste = true;
		this.onPasteSearchedItem.emit(event.clipboardData.getData('Text'));
		setTimeout(() => {
			event.target.value = null;
		}, 0);
	}

	onDropdownSearch(event: any) {
		if (!this.isPaste) {
			this.actionSource.next(event.term);
		} else {
			this.isPaste = false;
		}
	}

	onAutoCompleteChange(event: any) {
		this.autocompleteChange.emit(event);
	}

	onOptionSelected(event: any) {
		this.bindCustomLabel();
		this.autocompleteOptionSelect.emit(event);
	}

	bindCustomLabel() {
		if (this.multiLabelBinding && this.showCustomOption && this.bindLabelArray?.length > 0 && this.dropdownlist?.length > 0) {
			this.dropdownlist = this.dropdownlist.map((bindLabelValue: any) => {
				bindLabelValue.bindLabel = '';
				bindLabelValue.bindLabel = this.bindLabelArray.map((element: any) => bindLabelValue[element]).join('');
				return bindLabelValue;
			});
		}
	}

	customSearch(term: string, item: any) {
		// Creating and array of space saperated term and removing the empty values using filter
		const terms: string[] = term.toLowerCase().split(' ').filter(Boolean);
		const search = item.bindLabel ? item.bindLabel.toLowerCase() : '';
		// every term should be present in the search string
		return terms.every((termValue: string) => search.indexOf(termValue) !== -1);
	}
}
