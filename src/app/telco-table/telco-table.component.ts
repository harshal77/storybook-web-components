import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
	selector: 'app-telco-table',
	templateUrl: './telco-table.component.html',
	styleUrls: ['./telco-table.component.scss'],
})
export class TelcoTableComponent implements OnInit, OnChanges {
	@Input() tableData: any = [];
	@Input() headings = [];

	dataSource = new MatTableDataSource<any>();
	constructor(private _liveAnnouncer: LiveAnnouncer) { }

	ngOnInit() { }

	ngOnChanges() {
		this.dataSource = new MatTableDataSource<any>(this.tableData);
	}
}
