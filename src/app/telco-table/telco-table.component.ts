import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';

export interface InputDataInterFace {
	SiteName: string;
	CountofAlarm: string;
	Timestamp: { date: string; time: string };
	RCA: { iconImg: string; status: string };
}

const ELEMENT_DATA: InputDataInterFace[] = [
	{
		SiteName: 'Site Name 1',
		CountofAlarm: '08',
		Timestamp: {
			date: '05 Jan,2022',
			time: '10:00 AM',
		},
		RCA: {
			iconImg: '../../assets/table-icons/table-icon.svg',
			status: 'RAN - IP Connection Failure',
		},
	},
	{
		SiteName: 'Site Name 2',
		CountofAlarm: '09',
		Timestamp: {
			date: '05 Jan,2021',
			time: '10:00 AM',
		},
		RCA: {
			iconImg: '../../assets/table-icons/table-icon.svg',
			status: 'Cell Failure',
		},
	},
	{
		SiteName: 'Site Name 3',
		CountofAlarm: '08',
		Timestamp: {
			date: '05 Jan,2021',
			time: '10:00 AM',
		},
		RCA: {
			iconImg: '../../assets/table-icons/table-icon.svg',
			status: 'RAN - IP Connection Failure',
		},
	},
	{
		SiteName: 'Site Name 3',
		CountofAlarm: '08',
		Timestamp: {
			date: '05 Jan,2021',
			time: '10:00 AM',
		},
		RCA: {
			iconImg: '../../assets/table-icons/table-icon.svg',
			status: 'RAN - IP Connection Failure',
		},
	},
	{
		SiteName: 'Site Name 4',
		CountofAlarm: '08',
		Timestamp: {
			date: '05 Jan,2021',
			time: '10:00 AM',
		},
		RCA: {
			iconImg: '../../assets/table-icons/table-icon.svg',
			status: 'RAN - IP Connection Failure',
		},
	},
	{
		SiteName: 'Site Name 5',
		CountofAlarm: '08',
		Timestamp: {
			date: '05 Jan,2021',
			time: '10:00 AM',
		},
		RCA: {
			iconImg: '../../assets/table-icons/table-icon.svg',
			status: 'RAN - IP Connection Failure',
		},
	},
	{
		SiteName: 'Site Name 6',
		CountofAlarm: '08',
		Timestamp: {
			date: '05 Jan,2021',
			time: '10:00 AM',
		},
		RCA: {
			iconImg: '../../assets/table-icons/table-icon.svg',
			status: 'RAN - IP Connection Failure',
		},
	},
	{
		SiteName: 'Site Name 7',
		CountofAlarm: '08',
		Timestamp: {
			date: '05 Jan,2021',
			time: '10:00 AM',
		},
		RCA: {
			iconImg: '../../assets/table-icons/table-icon.svg',
			status: 'RAN - IP Connection Failure',
		},
	},
];

@Component({
	selector: 'app-telco-table',
	templateUrl: './telco-table.component.html',
	styleUrls: ['./telco-table.component.scss'],
})
export class TelcoTableComponent implements OnInit {
	@Input() PaginationShow: boolean = false;
	displayedColumns = ['SiteName', 'CountofAlarm', 'Timestamp', 'RCA'];
	dataSource = new MatTableDataSource<InputDataInterFace>(ELEMENT_DATA);

	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(private _liveAnnouncer: LiveAnnouncer) {}

	ngOnInit() {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
		this.dataSource.sortingDataAccessor = (item, property) => {
			switch (property) {
				case 'RCA': {
					return item.RCA.status;
				}

				case 'Timestamp': {
					let newDate = new Date(item.Timestamp.date);
					return newDate;
				}
				default: {
					return item[property];
				}
			}
		};
	}

	// for sorting
	announceSortChange(sortState: Sort) {
		if (sortState.direction) {
			this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
		} else {
			this._liveAnnouncer.announce('Sorting cleared');
		}
	}
}
