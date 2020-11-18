import { ERROR_COMPONENT_TYPE } from '@angular/compiler';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../@core/auth/auth.service';
import { User } from '../../../@core/data/users';
import { VWqxActivityLatest } from '../../../@core/wqx-data/wqx-activity';
import { MapMarkerModel } from '../../../@core/wqx-data/wqx-monloc';
import { WQXActivityService } from '../../../@core/wqx-services/wqx-activity-service';
import { WqxMonlocService } from '../../../@core/wqx-services/wqx-monloc.service';

@Component({
  selector: 'ngx-wqx-maps',
  templateUrl: './wqx-maps.component.html',
  styleUrls: ['./wqx-maps.component.scss'],
})
export class WqxMapsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
  title = 'angular-gmap';

  user: User;
  currentOrgId: string = '';
  latestActivities: VWqxActivityLatest[];
  cols: any[];

  map: google.maps.Map;
  infowindow: google.maps.InfoWindow;
  bounds = new google.maps.LatLngBounds();
  lat = 35.515;
  lng = -95.962;
  coordinates = new google.maps.LatLng(this.lat, this.lng);
  mapOptions: google.maps.MapOptions = {
    zoom: 5,
    center: this.coordinates,
    mapTypeId: google.maps.MapTypeId.TERRAIN,
    mapTypeControl: true,
    fullscreenControl: true,
    mapTypeControlOptions:
    {
      style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
      position: google.maps.ControlPosition.TOP_RIGHT,
    },
  };
  marker1: any;
  marker2: any;
  markers: any;

  gmarkers: google.maps.Marker[] = [];

  activityServiceSubscription: Subscription[] = [];
  monlocServiceSubscription: Subscription[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private activityService: WQXActivityService,
    private monlocService: WqxMonlocService) {
    const u = this.authService.getUser();
    if (this.user === undefined || this.user === null)
      this.user = {
        userIdx: 0,
        name: '',
        picture: '',
        UserIDX: '',
        OrgID: '',
        isAdmin: '',
      };
    this.user.userIdx = u.userIdx;
    this.user.name = u.name;
    this.user.OrgID = u.OrgID;
    this.user.isAdmin = u.isAdmin;
    this.currentOrgId = this.user.OrgID;
    if (localStorage.getItem('selectedOrgId') !== null) {
      this.currentOrgId = localStorage.getItem('selectedOrgId');
    }
  }
  ngOnInit() {
    this.cols = [
      { field: 'monlocName', header: 'Location' },
      { field: 'actStartDt', header: 'Last Sampled' },
      { field: 'alkalinityTotal', header: 'Alkalinity (mg/l)' },
    ];

    this.activityServiceSubscription.push(this.activityService.GetVWqxActivityLatest(this.currentOrgId).subscribe(
      (result: VWqxActivityLatest[]) => {
        this.latestActivities = result;
      },
      (err) => {
        console.log(err);
      },
    ));
  }
  ngOnDestroy(): void {
    this.activityServiceSubscription.forEach(element => {
      element.unsubscribe();
    });
    this.monlocServiceSubscription.forEach(element => {
      element.unsubscribe();
    });
  }
  ngAfterViewInit(): void {
    this.marker1 = new google.maps.Marker({
      position: this.coordinates,
      map: this.map,
      title: ``,
    });
    this.mapInitializer();
  }
  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
    this.infowindow = new google.maps.InfoWindow({ content: '...' });
    // Adding Click event to default marker
    this.marker1.addListener('click', () => {
      const infoWindow = new google.maps.InfoWindow({
        content: this.marker1.getTitle(),
      });
      infoWindow.open(this.marker1.getMap(), this.marker1);
    });

    // Adding default marker to map
    this.marker1.setMap(this.map);
    // Adding other markers
    this.loadAllMarkers();
    this.map.fitBounds(this.bounds);
  }

  loadAllMarkers(): void {
    this.monlocServiceSubscription.push(this.monlocService.GetSitesAsync(true, this.currentOrgId, false).subscribe(
      (result: MapMarkerModel[]) => {
        if (result) {
          console.log(result);
          result.forEach(element => {
            const myLatLng = new google.maps.LatLng(+element.lat, +element.lng);
            const marker = new google.maps.Marker({
              position: myLatLng,
              map: this.map,
              title: element.infoTitle,
            });
            this.bounds.extend(myLatLng);
            if (marker != null) {
              google.maps.event.addListener(marker, 'click', function () {
                const infWindow = new google.maps.InfoWindow({
                  content: element.infoBody,
                });
                // this.infowindow.setContent('<div class=fltbox><div class="mapInfoTitle">' + element.infoTitle + '</div><div class=mapInfoMain>' + element.infoBody + '</div></div>');
                infWindow.open(this.map, marker);
              });

              this.gmarkers.push(marker);
            }
          });
          if (this.markers) {
            this.markers.forEach(markerInfo => {
              // creating a new marker object
              const marker = new google.maps.Marker({
                ...markerInfo,
              });

              // creating a new info window with markers info
              const infoWindow = new google.maps.InfoWindow({
                content: marker.getTitle(),
              });

              // Add click event to open info window on marker
              marker.addListener('click', () => {
                infoWindow.open(marker.getMap(), marker);
              });

              // Adding marker to google map
              marker.setMap(this.map);
            });
          }

        }
      },
      (err) => {
        console.log(err);
      },
    ));


  }

  onShowData() {
    this.router.navigate(['/secure/water-quality/wqx-activity']);
  }
  onShowChart() {
    this.router.navigate(['/secure/data-analysis/wqx-charting']);
  }
}
