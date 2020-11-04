import { Component, OnDestroy, OnInit } from '@angular/core';
import { WqxMonlocConfig, WqxMonloc, WqxMonloc4Excel } from '../../../@core/wqx-data/wqx-monloc';
import { NbWindowService, NbWindowRef, NbToastrService } from '@nebular/theme';
import { MonlocConfigWindowComponent } from './monloc-config-window/monloc-config-window.component';
import { WqxPubsubServiceService } from '../../../@core/wqx-services/wqx-pubsub-service.service';
import { User } from '../../../@core/data/users';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { WqxMonlocService } from '../../../@core/wqx-services/wqx-monloc.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../@core/auth/auth.service';
import { Subscription } from 'rxjs';
import { zip, from } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

@Component({
  selector: 'ngx-wqx-monloc',
  templateUrl: './wqx-monloc.component.html',
  styleUrls: ['./wqx-monloc.component.scss'],
})
export class WqxMonlocComponent implements OnInit, OnDestroy {

  user: User;
  currentOrgId: string;

  pubSubServiceSubscription: Subscription[] = [];
  monlocServiceSubscription: Subscription[] = [];
  chkDeletedInd: boolean = false;
  i = 0;

  configWinRef: NbWindowRef;
  wqxMonlocSource: WqxMonloc[] = [];
  cols: any[];
  defaultCols: any[];

  constructor(private windowService: NbWindowService,
    private pubSubService: WqxPubsubServiceService,
    private authService: NbAuthService,
    private authService1: AuthService,
    private monlocService: WqxMonlocService,
    private router: Router,
    private toasterService: NbToastrService) {
    localStorage.setItem('currentPage', 'monloc');
    if (this.authService1.isAuthenticated() === true) {
      const u = this.authService1.getUser();
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
      this.populateCols();
      this.cols = this.defaultCols;
      this.populateData();
      this.pubSubServiceSubscription.push(this.pubSubService.loadOrgId.subscribe((data: string) => {
        if (localStorage.getItem('currentPage') === 'monloc') {
          if (data !== null && data !== undefined && data !== '') {
            this.currentOrgId = data;
            this.populateData();
          }
        }
      }));
      this.pubSubServiceSubscription.push(this.pubSubService.monlocChkData.subscribe((data: WqxMonlocConfig[]) => {
        this.onConfigSaved(data);
      }));


    }
  }
  ngOnDestroy(): void {
    this.pubSubServiceSubscription.forEach(element => {
      element.unsubscribe();
    });
    this.monlocServiceSubscription.forEach(element => {
      element.unsubscribe();
    });
  }

  ngOnInit() {


  }
  populateCols() {
    this.defaultCols = [
      { field: 'monlocId', header: 'ID' },
      { field: 'monlocName', header: 'Name' },
      { field: 'monlocType', header: 'Type' },
      { field: 'monlocDesc', header: 'Description' },
      { field: 'latitudeMsr', header: 'Latitude' },
      { field: 'longitudeMsr', header: 'Longitude' },
      { field: 'wellholeDepthMsrUnit', header: 'Depth Unit' },
    ];
  }
  populateData() {
    this.populateCols();
    this.cols = this.defaultCols;
    this.monlocServiceSubscription.push(this.monlocService.GetWQX_MONLOC(!this.chkDeletedInd, this.currentOrgId, false).subscribe(
      (data: WqxMonloc[]) => {
        console.log(this.currentOrgId);
        this.wqxMonlocSource = data;
      },
    ));
  }
  onConfigSaved(data: WqxMonlocConfig[]) {
    // Avoid copy by reference
    this.cols = JSON.parse(JSON.stringify(this.defaultCols));

    data.forEach(element => {
      if (element.value === true) {
        this.cols.push({ field: element.field, header: element.header });
      }
    });
  }

  onChkDeletedInd(checked: boolean) {
    this.chkDeletedInd = checked;
    this.populateData();
  }
  onAddNew(): void {
    this.router.navigate(['/secure/water-quality/wqx-monloc-edit'], { queryParams: { monlocIdx: -1 } });
  }

  onConfig(): void {
    this.configWinRef = this.windowService.open(MonlocConfigWindowComponent,
      { title: ``, hasBackdrop: true });
  }

  onEditClicked(monloc: WqxMonloc) {
    this.router.navigate(['/secure/water-quality/wqx-monloc-edit'], { queryParams: { monlocIdx: monloc.monlocIdx } });
  }
  onDeleteClicked(monloc: WqxMonloc) {
    this.monlocServiceSubscription.push(this.monlocService.DeleteT_WQX_MONLOC(monloc.monlocIdx, this.user.userIdx).subscribe(
      (result) => {
        if (result === 1) {
          this.toasterService.success('Record successfully deleted.', '', { destroyByClick: true, duration: 5000 });
        } else if (result === -1) {
          this.toasterService.danger('Activities found for this monitoring location - location cannot be deleted.', '', { destroyByClick: true, duration: 5000 });
        } else if (result === 0) {
          this.toasterService.danger('Unable to delete monitoring location.', '', { destroyByClick: true, duration: 5000 });
        } else {

        }
        this.populateData();
      },
      (err) => {
        console.log(err);
      },
    ));
  }
  pluckAndZip(items: string[]) {

  }
  exportExcel() {
    const dt = {} as ExcelData;

    const monlocDataJson = JSON.stringify(this.wqxMonlocSource);
    // const source = from([{ 'monlocIdx': 1054, 'orgId': 'MCNCREEK_WQX', 'monlocId': '11', 'monlocName': 'session name', 'monlocType': 'Cave', 'monlocDesc': 'desc text', 'hucEight': '12345678', 'hucTwelve': '123456789012', 'tribalLandInd': 'N', 'tribalLandName': 'tln', 'latitudeMsr': '40.7128', 'longitudeMsr': '74.006', 'sourceMapScale': 0, 'horizAccuracy': null, 'horizAccuracyUnit': null, 'horizCollMethod': 'Address Matching-Block Face', 'horizRefDatum': 'AMSMA', 'vertMeasure': '10', 'vertMeasureUnit': '#/100 gal', 'vertCollMethod': 'Altimetry', 'vertRefDatum': 'LTD', 'countryCode': '0S', 'stateCode': 'HI', 'countyCode': '007', 'wellType': 'Anode', 'aquiferName': '1', 'formationType': null, 'wellholeDepthMsr': null, 'wellholeDepthMsrUnit': null, 'wqxInd': false, 'wqxSubmitStatus': 'U', 'wqxUpdateDt': null, 'importMonlocId': null, 'actInd': true, 'createDt': '2020-10-15T22: 29: 18.453', 'createUserid': 'MTHULBOSMTBOIHHQADUTHVBL', 'updateDt': '2020-10-22T12: 54: 23.597', 'updateUserid': 'KSHITIJ_ATC', 'org': null, 'tAttainsAssessUnitsMloc': [], 'tWqxActivity': [], 'tWqxBioHabitatIndex': [] }, { 'monlocIdx': 1023, 'orgId': 'MCNCREEK_WQX', 'monlocId': '123', 'monlocName': 'mln', 'monlocType': 'River/Stream', 'monlocDesc': 'desc2', 'hucEight': '8', 'hucTwelve': '12', 'tribalLandInd': null, 'tribalLandName': 'tribal land', 'latitudeMsr': '40.6943\r\n', 'longitudeMsr': '-73.9249\r\n', 'sourceMapScale': 1, 'horizAccuracy': null, 'horizAccuracyUnit': null, 'horizCollMethod': 'INTERPOLATION-MAP', 'horizRefDatum': 'NAD27', 'vertMeasure': '111', 'vertMeasureUnit': 'ft', 'vertCollMethod': 'OTHER', 'vertRefDatum': 'OTHER', 'countryCode': 'US', 'stateCode': 'NJ', 'countyCode': '021', 'wellType': 'ANODE', 'aquiferName': 'Mixed (confined and unconfined) multiple aquifers', 'formationType': 'Hydrogeologic', 'wellholeDepthMsr': '112', 'wellholeDepthMsrUnit': 'ft', 'wqxInd': true, 'wqxSubmitStatus': 'U', 'wqxUpdateDt': null, 'importMonlocId': null, 'actInd': true, 'createDt': '2020-09-16T00: 46: 55.38', 'createUserid': 'ADMIN', 'updateDt': '2020-09-29T18: 49: 22.07', 'updateUserid': 'ADMIN', 'org': null, 'tAttainsAssessUnitsMloc': [], 'tWqxActivity': [], 'tWqxBioHabitatIndex': [] }, { 'monlocIdx': 1055, 'orgId': 'MCNCREEK_WQX', 'monlocId': '123a', 'monlocName': 'Test 1', 'monlocType': 'Wetland Palustrine Pond', 'monlocDesc': 'Test location 1', 'hucEight': '11111111', 'hucTwelve': '111111111111', 'tribalLandInd': 'N', 'tribalLandName': 'Test Land 1', 'latitudeMsr': '20.66', 'longitudeMsr': '80.99', 'sourceMapScale': null, 'horizAccuracy': null, 'horizAccuracyUnit': null, 'horizCollMethod': 'Address Matching-Primary Name', 'horizRefDatum': 'HARN', 'vertMeasure': '', 'vertMeasureUnit': '', 'vertCollMethod': 'GPS Carrier Phase Kinematic Relative Position', 'vertRefDatum': 'LTD', 'countryCode': 'US', 'stateCode': 'NY', 'countyCode': '061', 'wellType': '', 'aquiferName': '', 'formationType': null, 'wellholeDepthMsr': null, 'wellholeDepthMsrUnit': null, 'wqxInd': false, 'wqxSubmitStatus': 'U', 'wqxUpdateDt': null, 'importMonlocId': null, 'actInd': true, 'createDt': '2020-10-15T22: 29: 18.46', 'createUserid': 'MTHULBOSMTBOIHHQADUTHVBL', 'updateDt': '2020-10-26T13: 14: 24.103', 'updateUserid': 'ADMIN', 'org': null, 'tAttainsAssessUnitsMloc': [], 'tWqxActivity': [], 'tWqxBioHabitatIndex': [] }, { 'monlocIdx': 1052, 'orgId': 'MCNCREEK_WQX', 'monlocId': '20203', 'monlocName': 'Monitoring Location 3', 'monlocType': 'Canal Irrigation', 'monlocDesc': 'Test Location 3', 'hucEight': '20203202', 'hucTwelve': '202032020320', 'tribalLandInd': 'N', 'tribalLandName': 'Test 3', 'latitudeMsr': '20.3', 'longitudeMsr': '80.3', 'sourceMapScale': null, 'horizAccuracy': null, 'horizAccuracyUnit': null, 'horizCollMethod': 'Classical Surveying Techniques', 'horizRefDatum': 'HARN', 'vertMeasure': null, 'vertMeasureUnit': null, 'vertCollMethod': 'GPS Code (Pseudo Range) Precise Position', 'vertRefDatum': 'UNKWN', 'countryCode': 'US', 'stateCode': 'IN', 'countyCode': '175', 'wellType': null, 'aquiferName': null, 'formationType': null, 'wellholeDepthMsr': null, 'wellholeDepthMsrUnit': null, 'wqxInd': true, 'wqxSubmitStatus': 'Y', 'wqxUpdateDt': null, 'importMonlocId': null, 'actInd': true, 'createDt': '2020-10-15T11: 16: 39.89', 'createUserid': 'ADMIN', 'updateDt': null, 'updateUserid': null, 'org': null, 'tAttainsAssessUnitsMloc': [], 'tWqxActivity': [], 'tWqxBioHabitatIndex': [] }, { 'monlocIdx': 1053, 'orgId': 'MCNCREEK_WQX', 'monlocId': '20203a', 'monlocName': 'Monitoring Location 3', 'monlocType': 'Canal Irrigation', 'monlocDesc': 'Test Location 3', 'hucEight': '20203202', 'hucTwelve': '202032020320', 'tribalLandInd': 'N', 'tribalLandName': 'Test 3', 'latitudeMsr': '20.3', 'longitudeMsr': '80.3', 'sourceMapScale': null, 'horizAccuracy': null, 'horizAccuracyUnit': null, 'horizCollMethod': 'Classical Surveying Techniques', 'horizRefDatum': 'HARN', 'vertMeasure': '', 'vertMeasureUnit': '', 'vertCollMethod': 'GPS Code (Pseudo Range) Precise Position', 'vertRefDatum': 'UNKWN', 'countryCode': 'US', 'stateCode': 'IN', 'countyCode': '175', 'wellType': '', 'aquiferName': '', 'formationType': null, 'wellholeDepthMsr': null, 'wellholeDepthMsrUnit': null, 'wqxInd': false, 'wqxSubmitStatus': 'U', 'wqxUpdateDt': null, 'importMonlocId': null, 'actInd': true, 'createDt': '2020-10-15T22: 29: 18.403', 'createUserid': 'MTHULBOSMTBOIHHQADUTHVBL', 'updateDt': '2020-10-26T13: 14: 37.397', 'updateUserid': 'ADMIN', 'org': null, 'tAttainsAssessUnitsMloc': [], 'tWqxActivity': [], 'tWqxBioHabitatIndex': [] }]);
    const source = from(this.wqxMonlocSource);
    /*     const pluckedMonlocIds = source.pipe(pluck('monlocId'));
        const subscribeMonlocIds = pluckedMonlocIds.subscribe(val => {
          if (!dt.MonlocID) dt.MonlocID = [];
          dt.MonlocID.push(val);
        });
        const pluckedMonlocNames = source.pipe(pluck('monlocName'));
        const subscribeMonlocNames = pluckedMonlocNames.subscribe(val => {
          if (!dt.MonlocName) dt.MonlocName = [];
          dt.MonlocName.push(val);
        });
        console.log(dt);
        zip(from(dt.MonlocID), from(dt.MonlocName)).pipe(
          map(([MonlocID, MonlocName]) => ({ MonlocID, MonlocName })),
        ).subscribe(x => console.log(x)); */
    // const dtJson = JSON.stringify(dt);
    // console.log(dtJson);
    const temp: WqxMonloc4Excel[] = [];
    this.wqxMonlocSource.map(x => {
      const t = {} as WqxMonloc4Excel;
      t.ID = x.monlocId;
      t.Name = x.monlocName;
      t.Type = x.monlocType;
      t.Description = x.monlocDesc;
      t.EightDigitHUC = x.hucEight;
      t.TwelveDigitHUC = x.hucTwelve;
      t.TribalLand = x.tribalLandInd;
      t.Latitude = x.latitudeMsr;
      t.Longitude = x.longitudeMsr;
      if (x.sourceMapScale) t.SourceMapScale = x.sourceMapScale.toString();
      t.HorizCollectionMethod = x.horizCollMethod;
      t.HorizDatum = x.horizRefDatum;
      t.VertialMeasure = x.vertMeasure;
      t.Unit = x.vertMeasureUnit;
      t.VerticalCollectionMethod = x.vertCollMethod;
      t.VerticalDatum = x.vertRefDatum;
      t.County = x.countyCode;
      t.State = x.stateCode;
      t.Country = x.countryCode;
      t.WellType = x.wellType;
      t.Aquifer = x.aquiferName;
      t.Formation = x.formationType;
      t.WellholeDepth = x.wellholeDepthMsr;
      t.DepthUnit = x.wellholeDepthMsrUnit;
      if (x.wqxInd) {
        t.SendToEPA = x.wqxInd.toString();
      } else {
        t.SendToEPA = 'false';
      }
      temp.push(t);
    });

    import('xlsx').then(xlsx => {
      // const worksheet = xlsx.utils.json_to_sheet(this.wqxMonlocSource);
      const worksheet = xlsx.utils.json_to_sheet(temp);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, 'MonLocExport');
    });
  }


  saveAsExcelFile(buffer: any, fileName: string): void {
    import('file-saver').then(FileSaver => {
      const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      const EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE,
      });
      // FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
      FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
    });
  }
  onSendToEPA(monlocIdx: number) {
    this.router.navigate(['/secure/water-quality/wqx-hist'], { queryParams: { TableCD: 'MLOC', TableIdx: monlocIdx } });
  }
}
export interface ExcelData {
  // Fields will be header in exported excel
  MonlocID: string[];
  MonlocName: string[];
}
