import { Component, OnInit } from '@angular/core';
import { NbWindowRef, NbToastrService } from '@nebular/theme';
import { WqxRefCharacteristic, AnalMethodDisplay, WqxRefCharOrg } from '../../../../@core/wqx-data/wqx-refdata';
import { WqxRefData } from '../../../../@core/wqx-data/wqx-organization';
import { WQXRefDataService } from '../../../../@core/wqx-services/wqx-refdata-service';
import { User } from '../../../../@core/data/users';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { WqxPubsubServiceService } from '../../../../@core/wqx-services/wqx-pubsub-service.service';
import { AuthService } from '../../../../@core/auth/auth.service';

interface tempData {
  charName: string;
  orgId: string;
  mode: string;
}
@Component({
  selector: 'ngx-add-char-window',
  templateUrl: './add-char-window.component.html',
  styleUrls: ['./add-char-window.component.scss'],
})
export class AddCharWindowComponent implements OnInit {

  user: User;
  currentOrgId: string;
  chars: WqxRefCharacteristic[] = [];
  units: WqxRefData[] = [];
  anals: AnalMethodDisplay[] = [];
  fracs: WqxRefData[] = [];
  stats: WqxRefData[] = [];
  resultValues: WqxRefData[] = [];

  selectedChar: string = '';
  selectedUnit: string = '';
  selectedAnal: string = '';
  selectedFrac: string = '';
  selectedStatus: string = '';
  selectedResultValue: string = '';

  txtDetectLimit: string = '';
  txtQuantLower: string = '';
  txtQuantUpper: string = '';

  showForm: string = '';
  maxIteration: number;
  populateCounterHandle: NodeJS.Timer;
  populateCounter: number = 6;

  constructor(public windowRef: NbWindowRef,
    private refDataService: WQXRefDataService,
    private authService: NbAuthService,
    private authService1: AuthService,
    private pubSubService: WqxPubsubServiceService,
    private toasterServce: NbToastrService) {
    if (this.authService1.isAuthenticated() === true) {
      const u = this.authService1.getUser();
      console.log(u.profile.sub);
      // this.currentUser = token.getPayload();
      // TODO: need to fix this
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
      /* this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        this.user = token.getPayload(); // here we receive a payload from the token and assigns it to our `user` variable
      }
    }); */
      this.loadDropDowns();
      // wait for all the initalization like dropdowns
      this.maxIteration = 10; // reset max iteratiion
      this.populateCounterHandle = setInterval(() => {
        if (this.populateCounter === 0 || this.maxIteration <= 0) {
          clearInterval(this.populateCounterHandle);
          let data = {} as tempData;
          if (this.windowRef.config !== null && this.windowRef.config.context !== null) {
            data = JSON.parse(JSON.stringify(this.windowRef.config.context));
            console.log(data);
            if (data.mode === 'edit') {
              this.refDataService.GetT_WQX_REF_CHAR_ORGByName(data.orgId, encodeURIComponent(data.charName)).subscribe(
                (result: WqxRefCharOrg) => {
                  console.log('GetT_WQX_REF_CHAR_ORGByName: valid');
                  console.log(result);
                  this.selectedChar = result.charName;
                  this.txtDetectLimit = result.defaultDetectLimit;
                  this.selectedUnit = result.defaultUnit;
                  this.selectedAnal = result.defaultAnalMethodIdx.toString();
                  this.selectedFrac = result.defaultSampFraction;
                  this.selectedResultValue = result.defaultResultValueType;
                  this.txtQuantLower = result.defaulLowerQuantLimit;
                  this.txtQuantUpper = result.defaultUpperQuantLimit;
                  this.windowRef.config.context = null;
                },
                (err) => {
                  console.log('GetT_WQX_REF_CHAR_ORGByName: failed');
                  console.log(err);
                },
              );
            }

          }

          this.showForm = 'view';
        } else {
          this.maxIteration--;
        }
      }, 500);
    }
  }

  ngOnInit() {




  }

  loadDropDowns() {
    // populate drop-downs
    this.refDataService.GetT_WQX_REF_CHARACTERISTIC(true, false).subscribe(
      (data) => { this.chars = data; },
      (err) => { console.log(err); },
      () => { this.populateCounter--; },
    );
    this.refDataService.GetT_WQX_REF_DATA('MeasureUnit', true, true).subscribe(
      (data) => { this.units = data; },
      (err) => { console.log(err); },
      () => { this.populateCounter--; },
    );
    this.refDataService.GetT_WQX_REF_ANAL_METHOD(true).subscribe(
      (data) => { this.anals = data; console.log(data); },
      (err) => { console.log(err); },
      () => { this.populateCounter--; },
    );

    this.refDataService.GetT_WQX_REF_DATA('ResultSampleFraction', true, true).subscribe(
      (data) => { this.fracs = data; },
      (err) => { console.log(err); },
      () => { this.populateCounter--; },
    );
    this.refDataService.GetT_WQX_REF_DATA('ResultStatus', true, true).subscribe(
      (data) => { this.stats = data; },
      (err) => { console.log(err); },
      () => { this.populateCounter--; },
    );
    this.refDataService.GetT_WQX_REF_DATA('ResultValueType', true, true).subscribe(
      (data) => { this.resultValues = data; },
      (err) => { console.log(err); },
      () => { this.populateCounter--; },
    );
  }
  close() {
    this.windowRef.close();
  }
  onSubmit(): void {
    let analVal: number = 0;
    analVal = isNaN(parseInt(this.selectedAnal, 10)) === true ? 0 : parseInt(this.selectedAnal, 10);
    this.refDataService.InsertOrUpdateT_WQX_REF_CHAR_ORG(
      (this.selectedChar === null) ? '' : encodeURIComponent(this.selectedChar),
      (this.currentOrgId === null) ? '' : this.currentOrgId,
      (this.user.name === null) ? '' : this.user.name,
      (this.txtDetectLimit === null) ? '' : this.txtDetectLimit,
      (this.selectedUnit === null) ? '' : encodeURIComponent(this.selectedUnit),
      analVal,
      (this.selectedFrac === null) ? '' : encodeURIComponent(this.selectedFrac),
      (this.selectedStatus === null) ? '' : encodeURIComponent(this.selectedStatus),
      (this.selectedResultValue === null) ? '' : encodeURIComponent(this.selectedResultValue),
      (this.txtQuantLower === null) ? '' : this.txtQuantLower,
      (this.txtQuantUpper === null) ? '' : this.txtQuantUpper).subscribe(
        (data) => {
          console.log('InsertOrUpdateT_WQX_REF_CHAR_ORG: valid');
          if (data === 1) {
            this.toasterServce.success('Record saved.');
          } else {
            this.toasterServce.danger('Record could not be saved.');
          }
          this.pubSubService.charChanged(true);
        },
        (err) => {
          console.log('InsertOrUpdateT_WQX_REF_CHAR_ORG: failed');
          console.log(err);
        },
        () => {
          this.windowRef.close();
        },
      );
  }
  onCloseModel2Clicked(): void {
    this.windowRef.close();
  }
}
