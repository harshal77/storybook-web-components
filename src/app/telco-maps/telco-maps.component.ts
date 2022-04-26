import { AfterViewInit, Component, EventEmitter, HostListener, Input, NgZone, Output, ViewChild } from '@angular/core';
import mapIcons from './map-icons';
declare let OverlappingMarkerSpiderfier: any;
declare let MarkerClusterer: any;

export interface IMap {
	config?: IMapConfig;
	markers: IMapMarkers;
}

export interface IMapConfig {
	iconDefault?: string;
	iconZoomed?: string;
	iconSpiderfied?: string;
	iconColor?: string;
	iconAnchorX?: number;
	iconAnchorY?: number;
	zoomLevelToChangeIcon?: number;
	centerOnMapUpdate?: boolean;
	centerOnBounds?: boolean;
	showMesh?: boolean;
	bounds?: IMapBound;
	filterMarkersOutsideBounds?: boolean;
}

export interface IMapBound {
	start: {
		lat: string;
		lng: string;
	};
	end: {
		lat: string;
		lng: string;
	};
}

export type IMapMarkers = Array<IMapMarker>;
export interface IMapMarker {
	id: string;
	lat: string;
	lng: string;
	title: string;
	label: string;
	link: string;
	mesh?: Array<string>;
	color?: string;
	iconDefault?: string;
	iconZoomed?: string;
	iconSpiderfied?: string;
}

@Component({
	selector: 'app-telco-maps',
	templateUrl: './telco-maps.component.html',
	styleUrls: ['./telco-maps.component.scss'],
})
export class TelcoMapsComponent implements AfterViewInit {
	map: any;
	oms: any;
	iw: any;
	bounds: any;
	zoomLevel = 1;
	_markers!: IMapMarkers;
	markersHash = {};
	mesh: any;
	_mapConfig: IMapConfig;
	_mapDefaultConfig: IMapConfig = {
		iconDefault: 'SITE',
		iconZoomed: 'SITE_ZOOMED_ALT',
		iconSpiderfied: 'NETWORK_ELEMENT',
		iconColor: '#E04B4B',
		iconAnchorX: 31,
		iconAnchorY: -33,
		zoomLevelToChangeIcon: 14,
		centerOnMapUpdate: true,
		centerOnBounds: true,
		showMesh: true,
		filterMarkersOutsideBounds: false,
	};
	staticMarker: any;
	viewInit = false;
	boundsBeforeSpiderfy: any;
	preSpiderfyTimerref: any;
	spiderfyTimerref: any;
	unspiderfyTimerref: any;

	neId = 'ne_135';
	ticketid = 'ticket-123';
	data2: any = [
		{
			title: 'CE-id-123',
			actions: ['Edit', 'Delete'],
		},
		{
			title: 'CE-id-124',
			actions: ['Edit', 'Delete'],
		},
		{
			title: 'CE-id-125',
			actions: ['Edit', 'Delete'],
		},
		{
			title: 'CE-id-126',
			actions: ['Edit', 'Delete'],
		},
		{
			title: 'CE-id-124',
			actions: ['Edit', 'Delete'],
		},
		{
			title: 'CE-id-125',
			actions: ['Edit', 'Delete'],
		},
		{
			title: 'CE-id-126',
			actions: ['Edit', 'Delete'],
		},
		{
			title: 'CE-id-124',
			actions: ['Edit', 'Delete'],
		},
		{
			title: 'CE-id-125',
			actions: ['Edit', 'Delete'],
		},
		{
			title: 'CE-id-126',
			actions: ['Edit', 'Delete'],
		},
	];

	@ViewChild('map') mapElement;
	@HostListener('window:resize', ['$event'])
	onResize() {
		this.centerMap(this.map, this.map.markers);
	}

	@Input() set config(value: IMapConfig) {
		this._mapConfig = { ...this._mapDefaultConfig, ...value };
		if (!this.viewInit) return;
		this.resetMarkers();
	}
	@Input() set markers(value: IMapMarkers) {
		let filteredMarkers = value;
		if (this._mapConfig.bounds && this._mapConfig.filterMarkersOutsideBounds) {
			filteredMarkers = this.filterMarkers(value, this._mapConfig.bounds);
		}
		this._markers = filteredMarkers;
		// console.log(this._markers);

		if (!this.viewInit) return;
		this.resetMarkers();
	}

	@Output() showDialog: EventEmitter<any> = new EventEmitter<any>();

	@Output() hideDialog: EventEmitter<any> = new EventEmitter<any>();

	constructor(private zone: NgZone) {}

	ngAfterViewInit() {
		if (!(this._markers && this._markers.length > 0)) {
			this.oneTimeSetup();
			return;
		}

		this.oneTimeSetup();

		this.resetMarkers();

		this.viewInit = true;
	}

	oneTimeSetup() {
		// Load map
		const mapProperties = {
			center: new google.maps.LatLng(0, 0),
			zoom: 10,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			fullscreenControl: false,
			// restriction: {
			//   latLngBounds: latLngBounds,
			//   strictBounds: false,
			// },
		};

		const latLngBounds = new google.maps.LatLngBounds();

		if (this._mapConfig && this._mapConfig.bounds) {
			latLngBounds.extend(new google.maps.LatLng(+this._mapConfig.bounds.start.lat, +this._mapConfig.bounds.start.lng));

			latLngBounds.extend(new google.maps.LatLng(+this._mapConfig.bounds.end.lat, +this._mapConfig.bounds.end.lng));

			mapProperties['restriction'] = {
				latLngBounds: latLngBounds,
				strictBounds: false,
			};
		}

		// HTML canvas keeps misfiring ApplicationRef.tick()
		// To prevent that, initialize canvas outside angular
		this.zone.runOutsideAngular(() => {
			this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
		});

		if (this._mapConfig && this._mapConfig.bounds && this._mapConfig.centerOnBounds) {
			this.map.fitBounds(latLngBounds);
		}

		// Add markers array
		this.map.markers = [];

		// Add marker listener array
		this.map.markerListeners = [];

		// Add mesh array
		this.map.mesh = [];

		// Add cluster object
		this.map.markerCluster = null;

		// // Create spiderfier instance
		// const options = {
		//   keepSpiderfied: true, // will keep spider chart open after clicking on a marker to show Infowindow
		//   markersWontMove: true, // we promise not to move any markers, allowing optimizations
		//   markersWontHide: true, // we promise not to change visibility of any markers, allowing optimizations
		//   basicFormatEvents: true, // allow the library to skip calculating advanced formatting information
		//   minZoomLevel: this._mapConfig.zoomLevelToChangeIcon, // minimum zoom level at which cluster will spiderfy
		// };
		// this.oms = new OverlappingMarkerSpiderfier(this.map, options);

		// // Add info window
		// this.iw = new google.maps.InfoWindow();

		// Attach zoom change listener
		this.listenToZoomChange(this.map);
	}

	resetMarkers() {
		// If markers already exist, remove them before plotting new ones
		if (this.map && this.map.markers && this.map.markers.length > 0) {
			// this.oms.removeAllMarkers();
			this.map.markerCluster.clearMarkers();

			this.map.mesh.forEach((e: any) => {
				this.removeLine(e);
			});
			this.map.markerListeners.forEach((e: any) => {
				google.maps.event.clearInstanceListeners(e.mouseover);
				google.maps.event.clearInstanceListeners(e.mouseout);
			});
			this.map.markers = [];
			this.map.markerListeners = [];
			this.map.mesh = [];
			this.markersHash = {};
		}

		// If exists, add markers
		if (this._markers && this._markers.length > 0) {
			// Filter markers on map bounds
			if (this._mapConfig.bounds && this._mapConfig.filterMarkersOutsideBounds) {
				this._markers = this.filterMarkers(this._markers, this._mapConfig.bounds);
			}

			this._markers.forEach((e) => {
				this.addMarker(e, this.map, this.oms, this.iw, this.map.markers);
			});
		}

		// Create marker cluster
		const mcOptions = {
			styles: [
				{
					textColor: 'white',
					height: 32,
					url: 'assets/images/map-markers/marker.png',
					width: 32,
				},
				{
					textColor: 'white',
					height: 32,
					url: 'assets/images/map-markers/marker.png',
					width: 32,
				},
				{
					textColor: 'white',
					height: 32,
					url: 'assets/images/map-markers/marker.png',
					width: 32,
				},
				{
					textColor: 'white',
					height: 32,
					url: 'assets/images/map-markers/marker.png',
					width: 32,
				},
				{
					textColor: 'white',
					height: 32,
					url: 'assets/images/map-markers/marker.png',
					width: 32,
				},
			],
			// styles: [
			//   {
			//     textColor: 'white',
			//     height: 53,
			//     url: 'assets/images/map-markers/m1.png',
			//     width: 53,
			//   },
			//   {
			//     textColor: 'white',
			//     height: 56,
			//     url: 'assets/images/map-markers/m2.png',
			//     width: 56,
			//   },
			//   {
			//     textColor: 'white',
			//     height: 66,
			//     url: 'assets/images/map-markers/m3.png',
			//     width: 66,
			//   },
			//   {
			//     textColor: 'white',
			//     height: 78,
			//     url: 'assets/images/map-markers/m4.png',
			//     width: 78,
			//   },
			//   {
			//     textColor: 'white',
			//     height: 90,
			//     url: 'assets/images/map-markers/m5.png',
			//     width: 90,
			//   },
			// ],
		};
		this.map.markerCluster = new MarkerClusterer(this.map, this.map.markers, mcOptions);

		// If mesh enabled, add mesh
		if (this._mapConfig.showMesh) {
			this._markers.forEach((e) => {
				if (e.mesh && e.mesh.length > 0) {
					e.mesh.forEach((m) => {
						this.addLine(this.map, e.id, m);
					});
				}
			});
		}

		// Center
		if (this._mapConfig.centerOnMapUpdate) {
			this.centerMap(this.map, this.map.markers);
		}
		// else {
		//   // fit to bounds
		//   this.map.fitBounds(this.bounds);
		// }
	}

	addMarker(marker: any, map: any, oms = this.oms, iw: google.maps.InfoWindow = this.iw, markers: Array<google.maps.Marker>) {
		const mapMarker = this.getMapMarker(map, marker);

		markers.push(mapMarker);

		// Attach marker hover listener
		this.listenToMarkerHover(mapMarker);

		this.markersHash[marker.id] = { lat: marker.lat, lng: marker.lng };

		// oms.trackMarker(mapMarker);

		// oms.addListener('click', function (mapMarker, event: Event) {
		//   iw.setContent(mapMarker.description);
		//   iw.open(map, mapMarker);
		// });

		// oms.addListener('pre-spiderfy', (marker: Element) => {
		//   this.onSpiderfierEvent(this.map, [marker], 'pre-spiderfy');
		//   iw.close();
		// });

		// oms.addListener('spiderfy', (markers: Array<Element>) => {
		//   this.onSpiderfierEvent(this.map, markers, 'spiderfy');
		//   iw.close();
		// });

		// oms.addListener('unspiderfy', (markers: Array<Element>) => {
		//   this.onSpiderfierEvent(this.map, markers, 'unspiderfy');
		// });
	}

	addLine(map: any, sourceId: string, destinationId: string) {
		const sMarker = this.markersHash[sourceId];
		const dMarker = this.markersHash[destinationId];
		if (!sMarker || !dMarker) {
			return;
		}

		const source = new google.maps.LatLng(sMarker.lat, sMarker.lng);
		const destination = new google.maps.LatLng(dMarker.lat, dMarker.lng);

		const line = new google.maps.Polyline({
			map: map,
			path: [source, destination],
			strokeColor: '#444',
			strokeWeight: 1.5,
			zIndex: +google.maps.Marker.MAX_ZINDEX + 1,
		});

		map.mesh.push(line);
	}

	removeLine(line) {
		line.setMap(null);
	}

	getMapMarker(map, marker) {
		const locationAddressLatLng = new google.maps.LatLng(marker.lat, marker.lng);
		// const infoContent =
		//   '<div class="locationInfo">' +
		//   '<div><strong>' +
		//   marker.title +
		//   '</strong></div>' +
		//   '<div>' +
		//   marker.label +
		//   '</div>' +
		//   '<a href="' +
		//   marker.link +
		//   '">Se profil</a></div>';

		// const infoContent = this.getinfoContent();

		const iconDefault = this.getMapMarkerIcon(marker, marker.iconDefault ? marker.iconDefault : this._mapConfig.iconDefault);
		const iconZoomed = this.getMapMarkerIcon(marker, marker.iconZoomed ? marker.iconZoomed : this._mapConfig.iconZoomed);
		const iconSpiderfied = this.getMapMarkerIcon(marker, marker.iconSpiderfied ? marker.iconSpiderfied : this._mapConfig.iconSpiderfied);

		const mapMarker = new google.maps.Marker({
			map: map,
			position: locationAddressLatLng,
			icon: map.getZoom() < this._mapConfig.zoomLevelToChangeIcon ? iconDefault : iconZoomed,
		});
		// mapMarker.set('description', infoContent);
		mapMarker.set('iconDefault', iconDefault);
		mapMarker.set('iconZoomed', iconZoomed);
		mapMarker.set('iconSpiderfied', iconSpiderfied);

		return mapMarker;
	}

	getinfoContent() {
		const htmlStr =
			`<div id="map-content-box">
      <div class="header-wrapper">
        <div class="left-box">
          <div class="line1">
            <p id="pid">` +
			this.neId +
			`</p>
      </div>
      <div class="line2">
        <p id="pid" class=" opacity50 margin10"> Alarms:` +
			300 +
			`</p>
      <p id="pid" class="opacity50">Ticket:` +
			200 +
			`</p>
      </div>
    </div>
    <div class="right-box">
      <div class="icon-box margin10 "></div>
      <div class="icon-box"></div>
    </div>
  </div>
  <div class="body-wrapper">` +
			this.generateLayout() +
			`  </div>
      </div>
      `;

		return htmlStr;
	}

	generateLayout() {
		let str = '';
		for (let i = 0; i < this.data2.length; i += 1) {
			str +=
				` <div class="row">
        <div class="body-row">
          <p id="pid" class="text">` +
				this.data2[i].title +
				`</p>
        </div>
        <div class="right-box">` +
				this.getActions(this.data2[i].actions) +
				`</div>
        </div>`;
		}
		return str;
	}

	getActions(data) {
		let str = '';
		for (let i = 0; i < data.length; i += 1) {
			str +=
				`<div class="icon-box margin10">
        ` + `</div>`;
			return str;
		}
	}

	getMapMarkerIcon(marker: any, icon: any) {
		// var iconDot = {
		//   path: 'M-3,0a3,3 0 1,0 6,0a3,3 0 1,0 -6,0',
		//   fillColor: 'red',
		//   fillOpacity: 1,
		//   strokeColor: 'transparent',
		//   anchor: new google.maps.Point(0, 0),
		// };

		return {
			path: mapIcons.markers[icon.toUpperCase()],
			fillColor: marker.color ? marker.color : this._mapConfig.iconColor,
			fillOpacity: 1,
			strokeColor: 'transparent',
			anchor: new google.maps.Point(this._mapConfig.iconAnchorX, this._mapConfig.iconAnchorY),
			scale: 1,
		};
	}

	// removeMarker(marker) {
	//   this.oms.removeMarker(marker);
	// }

	// removeAllMarkers() {
	//   this.oms.removeAllMarkers();
	// }

	onSpiderfierEvent(map: any, markers: any, type: string) {
		switch (type) {
			case 'pre-spiderfy':
				// Block multiple events
				if (this.preSpiderfyTimerref) return;
				this.preSpiderfyTimerref = setTimeout(() => {
					this.preSpiderfyTimerref = null;
				}, 1);

				// Delete static marker if already exists
				// (Happens when you click on a marker when another
				// marker is already spiderfied)
				if (this.staticMarker) {
					this.staticMarker.setMap(null);
					this.staticMarker = null;
				}

				this.staticMarker = new google.maps.Marker({
					map: map,
					position: new google.maps.LatLng(markers[0].position.lat(), markers[0].position.lng()),
					icon: markers[0].iconZoomed,
				});
				break;

			case 'spiderfy':
				// Block multiple events
				if (this.spiderfyTimerref) return;
				this.spiderfyTimerref = setTimeout(() => {
					this.spiderfyTimerref = null;
				}, 1);

				// Change icon
				markers.forEach((e: any) => {
					e.setIcon(e.iconSpiderfied);
				});

				// // Center
				// this.boundsBeforeSpiderfy = this.bounds;
				// this.centerMap(map, markers);
				break;

			case 'unspiderfy':
				// Block multiple events
				if (this.unspiderfyTimerref) return;
				this.unspiderfyTimerref = setTimeout(() => {
					this.unspiderfyTimerref = null;
				}, 1);

				// Remove static marker
				if (this.staticMarker) {
					this.staticMarker.setMap(null);
					this.staticMarker = null;
				}

				// Change icon
				setTimeout(() => {
					const zoomed = this.zoomLevel < this._mapConfig.zoomLevelToChangeIcon ? false : true;
					markers.forEach((e) => {
						e.setIcon(zoomed ? e.iconZoomed : e.iconDefault);
					});
				}, 1);

				// // Center
				// this.bounds = this.boundsBeforeSpiderfy;
				// map.fitBounds(this.bounds);
				break;
		}
	}

	centerMap(map: any, markers: any) {
		this.bounds = new google.maps.LatLngBounds();

		if (this._mapConfig.bounds && this._mapConfig.centerOnBounds) {
			this.bounds.extend(new google.maps.LatLng(+this._mapConfig.bounds.start.lat, +this._mapConfig.bounds.start.lng));

			this.bounds.extend(new google.maps.LatLng(+this._mapConfig.bounds.end.lat, +this._mapConfig.bounds.end.lng));
		} else {
			markers.forEach((marker: any) => {
				const latlng = new google.maps.LatLng(marker.position.lat(), marker.position.lng());
				this.bounds.extend(latlng);
			});
		}

		// fit to bounds
		map.fitBounds(this.bounds);

		// zoom out if greater than threshold
		setTimeout((_) => {
			map.getZoom() <= this._mapConfig.zoomLevelToChangeIcon ? null : map.setZoom(this._mapConfig.zoomLevelToChangeIcon);
		}, 1);
	}

	listenToZoomChange(map: any) {
		google.maps.event.addListener(map, 'zoom_changed', () => {
			this.updateMapIcon(map);
		});
	}

	listenToMarkerHover(marker: any) {
		const mouseover = marker.addListener('mouseover', (e: any) => {
			const index = this._markers.findIndex((marker) => {
				return +marker.lat === +e.latLng.lat() && +marker.lng === +e.latLng.lng();
			});
			// console.log(
			//   'Mousein',
			//   e.latLng.lat(),
			//   e.latLng.lng(),
			//   this._markers,
			//   index,
			// );
			this.zone.run(() => {
				this.showDialog.emit({
					marker: this._markers[index],
					event: e.domEvent,
				});
			});
		});

		const mouseout = marker.addListener('mouseout', (e: any) => {
			this.zone.run(() => {
				this.hideDialog.emit(e.domEvent);
			});
		});

		this.map.markerListeners.push({
			mouseover,
			mouseout,
		});
	}

	// unlistenToMarkerClick(_markers) {
	//   google.maps.event.clearListeners(marker, 'click', () => {
	//   });
	// }

	updateMapIcon(map) {
		if (!this.map || !this.map.markers || !this.map.markers.length) {
			return;
		}

		const prevZoomLevel = this.zoomLevel;
		this.zoomLevel = this.map.getZoom();
		const showZoomedIcon = this.zoomLevel < this._mapConfig.zoomLevelToChangeIcon ? false : true;

		// Do not update icon if zoom threshold boundary is not crossed
		if (
			(prevZoomLevel < this._mapConfig.zoomLevelToChangeIcon && this.zoomLevel < this._mapConfig.zoomLevelToChangeIcon) ||
			(prevZoomLevel >= this._mapConfig.zoomLevelToChangeIcon && this.zoomLevel >= this._mapConfig.zoomLevelToChangeIcon)
		) {
			return;
		}

		if (showZoomedIcon) {
			map.markers.forEach((e: any) => {
				e.setIcon(e.iconZoomed);
			});
		} else {
			map.markers.forEach((e: any) => {
				e.setIcon(e.iconDefault);
			});
		}
	}

	filterMarkers(markers: any, bounds: any): any {
		const filteredMarkers = markers.filter((marker) => {
			const latS = Math.min(+bounds.start.lat, +bounds.end.lat);
			const latE = Math.max(+bounds.start.lat, +bounds.end.lat);
			const lngS = Math.min(+bounds.start.lng, +bounds.end.lng);
			const lngE = Math.max(+bounds.start.lng, +bounds.end.lng);

			if (+marker.lat >= latS && +marker.lat <= latE && +marker.lng >= lngS && +marker.lng <= lngE) {
				return true;
			}
		});
		return filteredMarkers;
	}
}
