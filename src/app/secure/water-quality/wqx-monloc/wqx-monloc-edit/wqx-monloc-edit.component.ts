import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { WqxRefData } from '../../../../@core/wqx-data/wqx-organization';
import { WQXRefDataService } from '../../../../@core/wqx-services/wqx-refdata-service';
import { User } from '../../../../@core/data/users';
import { WqxRefCounty } from '../../../../@core/wqx-data/wqx-refdata';
import { NbToastrService, NbWindowRef, NbWindowService } from '@nebular/theme';
import { WqxMonlocService } from '../../../../@core/wqx-services/wqx-monloc.service';
import { ActivatedRoute, Router } from '@angular/router';
import { WqxMonloc } from '../../../../@core/wqx-data/wqx-monloc';
import { AuthService } from '../../../../@core/auth/auth.service';
import { AgmMap } from '@agm/core';
import { WqxMapWindowComponent } from '../wqx-map-window/wqx-map-window.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ngx-wqx-monloc-edit',
  templateUrl: './wqx-monloc-edit.component.html',
  styleUrls: ['./wqx-monloc-edit.component.scss'],
})
export class WqxMonlocEditComponent implements OnInit, AfterViewInit, OnDestroy {

  user: User;
  currentOrgId: string;

  monlocIdx: number = 0;
  txtMonLocID: string = '';
  txtMonLocName: string = '';
  txtMonLocDesc: string = '';
  txtHUC8: string = '';
  txtHUC12: string = '';
  chkLandInd: boolean;
  txtLandName: string = '';
  txtLatitude: string = '';
  txtLongitude: string = '';
  txtSourceMapScale: string = '';
  txtVertMeasure: string = '';
  txtAquifer: string = '';
  chkActInd: boolean = false;
  chkWQXInd: boolean = false;

  monlocTypes: WqxRefData[] = [];
  monlocTypeSelected: string = '';
  horizMethods: WqxRefData[] = [];
  horizMethodSelected: string = '';
  horizDatums: WqxRefData[] = [];
  horizDetumSelected: string = '';
  vertUnits: WqxRefData[] = [];
  vertUnitSelected: string = '';
  vertMethods: WqxRefData[] = [];
  vertMethodSelected: string = '';
  vertDetums: WqxRefData[] = [];
  vertDetumSelected: string = '';
  states: WqxRefData[] = [];
  stateSelected: string = '';
  counties: WqxRefCounty[] = [];
  countySelected: string = '';
  countries: WqxRefData[] = [];
  countrySelected: string = '';
  wellTypes: WqxRefData[] = [];
  wellTypeSelected: string = '';
  configWinRef: NbWindowRef;

  refDataServiceSubscription: Subscription[] = [];
  monlocServiceSubscription: Subscription[] = [];

  constructor(private authService: AuthService,
    private refDataService: WQXRefDataService,
    private toastrService: NbToastrService,
    private monlocService: WqxMonlocService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private windowService: NbWindowService) {

    if (this.authService.isAuthenticated() === true) {
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
      this.populateDropdowns();
    }
  }
  ngOnDestroy(): void {
    this.refDataServiceSubscription.forEach(element => {
      element.unsubscribe();
    });
    this.monlocServiceSubscription.forEach(element => {
      element.unsubscribe();
    });
  }
  ngAfterViewInit(): void {

  }

  ngOnInit() {

    if (localStorage.getItem('selectedOrgId') !== null) {
      this.currentOrgId = localStorage.getItem('selectedOrgId');
    }
    this.activatedRoute.queryParams.subscribe(params => {
      this.monlocIdx = parseInt(params['monlocIdx'], 10);
      if (this.monlocIdx > 0 && this.currentOrgId !== '') {
        // allow dropdowns to populate
        // need to handle in a better way
        setTimeout(() => {
          this.populateMonloc();
        }, 1000);
      }
    });
  }
  populateMonloc() {

    this.chkWQXInd = true;
    this.chkActInd = true;

    this.monlocServiceSubscription.push(this.monlocService.GetWQX_MONLOC_ByID(this.monlocIdx).subscribe(
      (data: WqxMonloc) => {
        this.txtMonLocID = data.monlocId;
        this.txtMonLocName = data.monlocName;
        this.monlocTypeSelected = data.monlocType;
        this.txtMonLocDesc = data.monlocDesc;
        this.txtHUC8 = data.hucEight;
        this.txtHUC12 = data.hucTwelve;
        this.chkLandInd = (data.tribalLandInd === 'Y'); // this option is set to ''(null) during save as per original project.
        this.txtLandName = data.tribalLandName;
        this.txtLatitude = data.latitudeMsr;
        this.txtLongitude = data.longitudeMsr;
        this.txtSourceMapScale = data.sourceMapScale.toString();
        this.horizMethodSelected = data.horizCollMethod;
        this.horizDetumSelected = data.horizRefDatum;
        this.txtVertMeasure = data.vertMeasure;
        this.vertUnitSelected = data.vertMeasureUnit;
        this.vertMethodSelected = data.vertCollMethod;
        this.vertDetumSelected = data.vertRefDatum;
        this.stateSelected = data.stateCode;
        this.bindCounty(data.countyCode);
        // this.countySelected = data.countyCode;
        this.countrySelected = data.countryCode;
        this.wellTypeSelected = data.wellType;
        this.txtAquifer = data.aquiferName;
        this.chkWQXInd = data.wqxInd;
        this.chkActInd = data.actInd;
        document.getElementById('focusField').focus();
      },
      (err) => { console.log(err); },
    ));
  }
  populateDropdowns(): void {

    this.refDataServiceSubscription.push(this.refDataService.GetT_WQX_REF_DATA('MonitoringLocationType', true, true).subscribe(
      (data) => {
        this.monlocTypes = data;
      },
      (err) => { console.log(err); },
    ));
    this.refDataServiceSubscription.push(this.refDataService.GetT_WQX_REF_DATA('HorizontalCollectionMethod', true, true).subscribe(
      (data) => {
        this.horizMethods = data;
      },
      (err) => { console.log(err); },
    ));
    this.refDataServiceSubscription.push(this.refDataService.GetT_WQX_REF_DATA('HorizontalCoordinateReferenceSystemDatum', true, true).subscribe(
      (data) => {
        this.horizDatums = data;
      },
      (err) => { console.log(err); },
    ));
    this.refDataServiceSubscription.push(this.refDataService.GetT_WQX_REF_DATA('MeasureUnit', true, true).subscribe(
      (data) => {
        this.vertUnits = data;
      },
      (err) => { console.log(err); },
    ));
    this.refDataServiceSubscription.push(this.refDataService.GetT_WQX_REF_DATA('VerticalCollectionMethod', true, true).subscribe(
      (data) => {
        this.vertMethods = data;
      },
      (err) => { console.log(err); },
    ));
    this.refDataServiceSubscription.push(this.refDataService.GetT_WQX_REF_DATA('VerticalCoordinateReferenceSystemDatum', true, true).subscribe(
      (data) => {
        this.vertDetums = data;
      },
      (err) => { console.log(err); },
    ));
    this.refDataServiceSubscription.push(this.refDataService.GetT_WQX_REF_DATA('State', true, true).subscribe(
      (data) => {
        this.states = data;
      },
      (err) => { console.log(err); },
    ));
    this.refDataServiceSubscription.push(this.refDataService.GetT_WQX_REF_DATA('Country', true, true).subscribe(
      (data) => {
        this.countries = data;
      },
      (err) => { console.log(err); },
    ));
    this.refDataServiceSubscription.push(this.refDataService.GetT_WQX_REF_DATA('WellType', true, true).subscribe(
      (data) => {
        this.wellTypes = data;
      },
      (err) => { console.log(err); },
    ));
  }
  bindCounty(countyCode: string): void {
    if (this.stateSelected !== '') {
      this.refDataServiceSubscription.push(this.refDataService.GetT_WQX_REF_COUNTY(this.stateSelected).subscribe(
        (data) => {
          this.counties = data;
          if (countyCode !== '' || countyCode != null) {
            setTimeout(() => {
              this.countySelected = countyCode;
            }, 1000);
          }
        },
        (err) => { console.log(err); },
      ));
    }
  }



  onStateSelected(selectedItem): void {
    this.stateSelected = selectedItem;
    this.bindCounty(selectedItem);
  }
  onCountySelected(selectedItem): void {

  }
  onCountrySelected(selectedItem): void {
    this.countrySelected = selectedItem;
  }

  onSubmit() {
    if (this.txtMonLocID === '') {
      this.toastrService.danger('Monitoring Location ID is required.', 'Error!');
      return;
    } else {
      let sms: number = 0;
      sms = parseInt(this.txtSourceMapScale, 10);
      if (isNaN(sms)) sms = 0;
      this.monlocServiceSubscription.push(this.monlocService.InsertOrUpdateWQX_MONLOC(this.monlocIdx, this.currentOrgId, this.txtMonLocID, this.txtMonLocName,
        (this.monlocTypeSelected === null) ? '' : this.monlocTypeSelected,
        this.txtMonLocDesc,
        this.txtHUC8,
        this.txtHUC12,
        '', // (this.chkLandInd === null) ? '' : this.chkLandInd === true ? 'true' : 'false',
        this.txtLandName,
        this.txtLatitude,
        this.txtLongitude, sms, '', '',
        (this.horizMethodSelected === null) ? '' : this.horizMethodSelected,
        this.horizDetumSelected,
        this.txtVertMeasure,
        (this.vertUnitSelected === null) ? '' : encodeURIComponent(this.vertUnitSelected),
        (this.vertMethodSelected === null) ? '' : this.vertMethodSelected,
        (this.vertDetumSelected === null) ? '' : this.vertDetumSelected,
        (this.countrySelected === null) ? '' : this.countrySelected,
        (this.stateSelected === null) ? '' : this.stateSelected,
        (this.countySelected === null) ? '' : this.countySelected,
        (this.wellTypeSelected === null) ? '' : this.wellTypeSelected,
        (this.txtAquifer === null) ? '' : this.txtAquifer,
        '', '', '', 'U', '',
        (this.chkActInd === null) ? false : this.chkActInd,
        (this.chkWQXInd === null) ? false : this.chkWQXInd,
        this.user.name).subscribe(
          (result) => {
            if (result > 0) {
              this.toastrService.success('Data saved successfully.');
            } else {
              this.toastrService.danger('Error saving data.');
            }
            this.router.navigate(['/secure/water-quality/wqx-monloc']);
          },
          (err) => {
            this.toastrService.danger('Error saving data.');
            console.log(err);
          },
        ));
    }
  }

  onBtnCancelClicked(): void {
    this.router.navigate(['/secure/water-quality/wqx-monloc']);
  }
  onMapClicked() {

    if (this.txtLatitude !== '' && this.txtLongitude !== '') {
      this.configWinRef = this.windowService.open(WqxMapWindowComponent,
        {
          title: ``,
          hasBackdrop: true,
          closeOnBackdropClick: true,
          closeOnEsc: true,
          windowClass: 'mapWinClass',
          context: { lat: this.txtLatitude, lng: this.txtLongitude },
        });
      this.configWinRef.stateChange.subscribe(
        (data) => {
          console.log(data);
          if (data) {
            if (data.newState !== 'full-screen') this.configWinRef.fullScreen();
          }
        },
      );
      this.configWinRef.onClose.subscribe(
        (result) => {
          if (this.configWinRef.config !== null && this.configWinRef.config.context !== null) {
            let data = {} as DummyLatLng;
            data = JSON.parse(JSON.stringify(this.configWinRef.config.context));
            this.txtLatitude = data.lat;
            this.txtLongitude = data.lng;
          }
        },
        (err) => {
          console.log(err);
        },
      );
    } else {
      this.configWinRef = this.windowService.open(WqxMapWindowComponent,
        {
          title: ``,
          hasBackdrop: true,
          closeOnEsc: true,
          closeOnBackdropClick: true,
          windowClass: 'mapWinClass',
          context: { lat: '', lng: '' },
        });
      this.configWinRef.stateChange.subscribe(
        (data) => {
          console.log(data);
          if (data) {
            if (data.newState !== 'full-screen') this.configWinRef.fullScreen();
          }
        },
      );
      this.configWinRef.onClose.subscribe(
        (result) => {
          if (this.configWinRef.config !== null && this.configWinRef.config.context !== null) {
            let data = {} as DummyLatLng;
            data = JSON.parse(JSON.stringify(this.configWinRef.config.context));
            this.txtLatitude = data.lat;
            this.txtLongitude = data.lng;
          }
        },
        (err) => {
          console.log(err);
        },
      );
    }
  }
}

interface DummyLatLng {
  lat: string;
  lng: string;
}