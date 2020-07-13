import { Component, OnInit } from '@angular/core';
import { NbWindowRef, NbToastrService } from '@nebular/theme';
import { WqxRefCharacteristic, AnalMethodDisplay } from '../../../../@core/wqx-data/wqx-refdata';
import { WqxRefData } from '../../../../@core/wqx-data/wqx-organization';
import { WQXRefDataService } from '../../../../@core/wqx-services/wqx-refdata-service';
import { User } from '../../../../@core/data/users';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { WqxPubsubServiceService } from '../../../../@core/wqx-services/wqx-pubsub-service.service';

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

  constructor(public windowRef: NbWindowRef,
    private refDataService: WQXRefDataService,
    private authService: NbAuthService,
    private pubSubService: WqxPubsubServiceService,
    private toasterServce: NbToastrService) {
      this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {
          this.user = token.getPayload(); // here we receive a payload from the token and assigns it to our `user` variable
          this.currentOrgId = this.user.OrgID;
        }
      });
      // populate drop-downs
     this.refDataService.GetT_WQX_REF_CHARACTERISTIC(true, false).subscribe(
      (data) => { this.chars = data; },
      (err) => { console.log(err); },
    );
    this.refDataService.GetT_WQX_REF_DATA('MeasureUnit', true, true).subscribe(
      (data) => { this.units = data; },
      (err) => { console.log(err); },
    );
    this.refDataService.GetT_WQX_REF_ANAL_METHOD(true).subscribe(
      (data) => { this.anals = data; console.log(data); },
      (err) => { console.log(err); },
    );

    this.refDataService.GetT_WQX_REF_DATA('ResultSampleFraction', true, true).subscribe(
      (data) => { this.fracs = data; },
      (err) => { console.log(err); },
    );
    this.refDataService.GetT_WQX_REF_DATA('ResultStatus', true, true).subscribe(
      (data) => { this.stats = data; },
      (err) => { console.log(err); },
    );
    this.refDataService.GetT_WQX_REF_DATA('ResultValueType', true, true).subscribe(
      (data) => { this.resultValues = data; },
      (err) => { console.log(err); },
    );
  }

  ngOnInit() {

  }

  close() {
    this.windowRef.close();
  }
  onCharSelected(selectedItem): void {
    this.selectedChar = selectedItem;
    console.log(this.selectedChar);
  }
  onUnitSelected(selectedItem): void {
    this.selectedUnit = selectedItem;
    console.log(this.selectedUnit);
  }
  onAnalSelected(selectedItem): void {
    this.selectedAnal = selectedItem;
    console.log(this.selectedAnal);
  }
  onFracSelected(selectedItem): void {
    this.selectedFrac = selectedItem;
    console.log(this.selectedFrac);
  }
  onStatusSelected(selectedItem): void {
    this.selectedStatus = selectedItem;
    console.log(this.selectedStatus);
  }
  onResultValuesSelected(selectedItem): void {
    this.selectedResultValue = selectedItem;
    console.log(this.selectedResultValue);
  }
  onSubmit(): void {
    let analVal: number = 0;
    analVal = isNaN(parseInt(this.selectedAnal, 10)) === true ? 0 : parseInt(this.selectedAnal, 10);
    this.refDataService.InsertOrUpdateT_WQX_REF_CHAR_ORG(this.selectedChar, this.currentOrgId, this.user.name,
      this.txtDetectLimit, this.selectedUnit, analVal, this.selectedFrac,
      this.selectedResultValue, '', this.txtQuantLower, this.txtQuantUpper).subscribe(
      (data) => {
        if (data === 1) {
          this.toasterServce.success('Record saved.');
        } else {
          this.toasterServce.danger('Record could not be saved.');
        }
        this.pubSubService.charChanged(true);
       },
      (err) => {
        this.toasterServce.danger('Record could not be saved.');
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
