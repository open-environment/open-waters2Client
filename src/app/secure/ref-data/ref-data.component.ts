import { Component, OnInit } from '@angular/core';
import { NbToastrService, NbWindowRef, NbWindowService } from '@nebular/theme';
import { ToasterService } from 'angular2-toaster';
import { AuthService } from '../../@core/auth/auth.service';
import { User } from '../../@core/data/users';
import { WqxRefData } from '../../@core/wqx-data/wqx-organization';
import { TWqxRefAnalMethod, TWqxRefLab, TWqxRefSampPrep, WqxRefCharacteristic, WqxRefCounty, WqxRefSampColMethod } from '../../@core/wqx-data/wqx-refdata';
import { WQXRefDataService } from '../../@core/wqx-services/wqx-refdata-service';
import { RefDataEntryComponent } from './ref-data-entry/ref-data-entry.component';

@Component({
  selector: 'ngx-ref-data',
  templateUrl: './ref-data.component.html',
  styleUrls: ['./ref-data.component.scss'],
})
export class RefDataComponent implements OnInit {

  user: User;
  currentOrgID: string = '';
  selectedTableName: string = '';
  searchString: string = '';
  displayGrid: string = 'Other';
  isAddNewShow: boolean = false;
  refDatas: WqxRefData[];
  refChars: WqxRefCharacteristic[];
  refAnals: TWqxRefAnalMethod[];
  refSamps: TWqxRefSampPrep[];
  refSampCols: WqxRefSampColMethod[];
  refCounties: WqxRefCounty[];
  refLabs: TWqxRefLab[];
  rd_totalRecords: number;
  rc_totalRecords: number;
  ra_totalRecords: number;
  rs_totalRecords: number;
  rsc_totalRecords: number;
  rl_totalRecords: number;
  rct_totalRecords: number;

  configWinRef: NbWindowRef;

  constructor(
    private refDataService: WQXRefDataService,
    private authService1: AuthService,
    private toasterSerivce: NbToastrService,
    private windowService: NbWindowService) {
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
    this.currentOrgID = this.user.OrgID;
  }

  ngOnInit() {
  }

  RefDataSelect(tableName: string) {
    this.selectedTableName = tableName;
    console.log(this.selectedTableName);
    this.searchString = '';
    switch (tableName) {
      case 'County':
        this.displayGrid = 'County';
        break;
      case 'Characteristic':
        this.displayGrid = 'Characteristic';
        break;
      case 'SampleCollectionMethod':
        this.displayGrid = 'SampleCollectionMethod';
        break;
      case 'SamplePrepMethod':
        this.displayGrid = 'SamplePrepMethod';
        break;
      case 'AnalyticalMethod':
        this.displayGrid = 'AnalyticalMethod';
        break;
      case 'Laboratory':
        this.displayGrid = 'Laboratory';
        break;
      default:
        this.displayGrid = 'Other';
        break;
    }
    this.displayGrids();
  }
  displayGrids() {
    this.isAddNewShow = false;
    if (this.displayGrid === 'AnalyticalMethod' ||
      this.displayGrid === 'SampleCollectionMethod' ||
      this.displayGrid === 'SamplePrepMethod' ||
      this.displayGrid === 'Laboratory') {
      this.isAddNewShow = true;
    }



    if (this.selectedTableName === 'Characteristic') {
      this.refDataService.GetT_WQX_REF_CHARACTERISTICByCharName(this.searchString).subscribe(
        (result) => {
          console.log('GetT_WQX_REF_CHARACTERISTICByCharName: valid');
          console.log(result[0]);
          this.rc_totalRecords = result.length;
          this.refChars = result;
        },
        (err) => {
          console.log('GetT_WQX_REF_CHARACTERISTICByCharName: failed');
          console.log(err);
        },
      );
    } else if (this.selectedTableName === 'AnalyticalMethod') {
      this.refDataService.GetT_WQX_REF_ANAL_METHODByValue(this.searchString).subscribe(
        (result) => {
          console.log('GetT_WQX_REF_ANAL_METHODByValue: valid');
          console.log(result[0]);
          this.ra_totalRecords = result.length;
          this.refAnals = result;
        },
        (err) => {
          console.log('GetT_WQX_REF_ANAL_METHODByValue: failed');
          console.log(err);
        },
      );
    } else if (this.selectedTableName === 'SamplePrepMethod') {
      this.refDataService.GetAllT_WQX_REF_SAMP_PREPByContext(this.currentOrgID).subscribe(
        (result) => {
          console.log('GetAllT_WQX_REF_SAMP_PREPByContext: valid');
          console.log(result[0]);
          this.rs_totalRecords = result.length;
          this.refSamps = result;
        },
        (err) => {
          console.log('GetAllT_WQX_REF_SAMP_PREPByContext: failed');
          console.log(err);
        },
      );
    } else if (this.selectedTableName === 'SampleCollectionMethod') {
      this.refDataService.GetT_WQX_REF_SAMP_COL_METHOD_ByContext(this.currentOrgID).subscribe(
        (result) => {
          console.log('GetT_WQX_REF_SAMP_COL_METHOD_ByContext: valid');
          console.log(result[0]);
          this.rsc_totalRecords = result.length;
          this.refSampCols = result;
        },
        (err) => {
          console.log('GetT_WQX_REF_SAMP_COL_METHOD_ByContext: failed');
          console.log(err);
        },
      );
    } else if (this.selectedTableName === 'Laboratory') {
      this.refDataService.GetT_WQX_REF_LAB_ByOrgId(this.currentOrgID).subscribe(
        (result) => {
          console.log('GetT_WQX_REF_LAB_ByOrgId: valid');
          console.log(result[0]);
          this.rl_totalRecords = result.length;
          this.refLabs = result;
        },
        (err) => {
          console.log('GetT_WQX_REF_LAB_ByOrgId: failed');
          console.log(err);
        },
      );
    } else if (this.selectedTableName === 'County') {
      this.refDataService.GetAllT_WQX_REF_COUNTY().subscribe(
        (result) => {
          console.log('GetAllT_WQX_REF_COUNTY: valid');
          console.log(result[0]);
          this.rct_totalRecords = result.length;
          this.refCounties = result;
        },
        (err) => {
          console.log('GetAllT_WQX_REF_COUNTY: failed');
          console.log(err);
        },
      );
    } else {
      this.refDataService.GetT_WQX_REF_DATA_ByValueOrText(this.selectedTableName, this.searchString).subscribe(
        (result) => {
          console.log('GetT_WQX_REF_DATA_ByValueOrText: valid');
          console.log(result);
          this.rd_totalRecords = result.length;
          this.refDatas = result;
        },
        (err) => {
          console.log('GetT_WQX_REF_DATA_ByValueOrText: failed');
          console.log(err);
        },
      );
    }

  }
  onSearchClicked() {
    console.log(this.searchString);
    this.displayGrids();
  }

  btnAddNewClicked() {
    if (this.currentOrgID === '' || this.currentOrgID === null
      || this.currentOrgID === undefined) {
      this.toasterSerivce.danger('"Please select or create an organization first.');
      return;
    }
    this.configWinRef = this.windowService.open(RefDataEntryComponent,
      {
        title: ``,
        hasBackdrop: true,
        context: this.selectedTableName,
        closeOnBackdropClick: true,
        closeOnEsc: true,
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
        console.log('window close event');
        console.log(this.configWinRef.config.context);
        let data = {} as DummyData;
        data = JSON.parse(JSON.stringify(this.configWinRef.config.context));
        console.log(data.name);
        console.log(data.ctx);
        if (data.ctx === 'AnalyticalMethod') {
          const refAnal = {} as TWqxRefAnalMethod;
          refAnal.analyticMethodIdx = 0;
          refAnal.analyticMethodId = data.id;
          refAnal.analyticMethodCtx = this.currentOrgID;
          refAnal.analyticMethodName = data.name;
          refAnal.analyticMethodDesc = data.desc;
          this.refDataService.InsertOrUpdateT_WQX_REF_ANAL_METHOD(refAnal).subscribe(
            (result1) => {
              console.log('InsertOrUpdateT_WQX_REF_ANAL_METHOD: valid');
              console.log(result1);
              this.displayGrids();
            },
            (err1) => {
              console.log('InsertOrUpdateT_WQX_REF_ANAL_METHOD: failed');
              console.log(err1);
            },
          );
        } else if (data.ctx === 'SampleCollectionMethod') {
          const refSampColMethod = {} as WqxRefSampColMethod;
          refSampColMethod.sampCollMethodIdx = 0;
          refSampColMethod.sampCollMethodId = data.id;
          refSampColMethod.sampCollMethodCtx = this.currentOrgID;
          refSampColMethod.sampCollMethodName = data.name;
          refSampColMethod.sampCollMethodDesc = data.desc;
          this.refDataService.InsertOrUpdateT_WQX_REF_SAMP_COL_METHOD(refSampColMethod).subscribe(
            (result2) => {
              console.log('InsertOrUpdateT_WQX_REF_SAMP_COL_METHOD: valid');
              console.log(result2);
              this.displayGrids();
            },
            (err2) => {
              console.log('InsertOrUpdateT_WQX_REF_SAMP_COL_METHOD: failed');
              console.log(err2);
            },
          );
        } else if (data.ctx === 'SamplePrepMethod') {
          const refSampPrep = {} as TWqxRefSampPrep;
          refSampPrep.sampPrepIdx = 0;
          refSampPrep.sampPrepMethodId = data.id;
          refSampPrep.sampPrepMethodCtx = this.currentOrgID;
          refSampPrep.sampPrepMethodName = data.name;
          refSampPrep.sampPrepMethodDesc = data.desc;
          this.refDataService.InsertOrUpdateT_WQX_REF_SAMP_PREP(refSampPrep).subscribe(
            (result3) => {
              console.log('InsertOrUpdateT_WQX_REF_SAMP_PREP: valid');
              console.log(result3);
              this.displayGrids();
            },
            (err3) => {
              console.log('InsertOrUpdateT_WQX_REF_SAMP_PREP: failed');
              console.log(err3);
            },
          );
        } else if (data.ctx === 'Laboratory') {
          const refLab = {} as TWqxRefLab;
          refLab.labIdx = 0;
          refLab.labName = data.name;
          refLab.labAccredInd = '';
          refLab.labAccredAuthority = '';
          refLab.orgId = this.currentOrgID;
          refLab.actInd = true;
          this.refDataService.InsertOrUpdateT_WQX_REF_LAB(refLab).subscribe(
            (result4) => {
              console.log('InsertOrUpdateT_WQX_REF_LAB: valid');
              console.log(result4);
              this.displayGrids();
            },
            (err4) => {
              console.log('InsertOrUpdateT_WQX_REF_LAB: failed');
              console.log(err4);
            },
          );
        } else {
          // do nothing
        }
      },
    );
  }
  onRowDelete1(refData: WqxRefData) {
    this.refDataService.UpdateT_WQX_REF_DATAByIDX(refData.refDataIdx, refData.value, refData.text, false).subscribe(
      (result) => {
        console.log('UpdateT_WQX_REF_DATAByIDX: valid');
        console.log(result);
        refData.actInd = false;
        this.toasterSerivce.success('Record deleted.');
      },
      (err) => {
        console.log('UpdateT_WQX_REF_DATAByIDX: failed');
        console.log(err);
        this.toasterSerivce.danger('Record could not be deleted.');
      },
    );
  }
  onRowEditSave1(refData: WqxRefData) {
    console.log(refData);
    this.refDataService.InsertOrUpdateT_WQX_REF_DATA(refData).subscribe(
      (result) => {
        console.log('InsertOrUpdateT_WQX_REF_DATA: valid');
        console.log(result);
      },
      (err) => {
        console.log('InsertOrUpdateT_WQX_REF_DATA: failed');
        console.log(err);
      },
    );
  }

  onRowDelete2(refChar: WqxRefCharacteristic) {
    console.log(refChar);
    refChar.actInd = false;
    this.refDataService.InsertOrUpdateT_WQX_REF_CHARACTERISTIC(refChar).subscribe(
      (result) => {
        console.log('InsertOrUpdateT_WQX_REF_CHARACTERISTIC: valid');
        console.log(result);
        this.toasterSerivce.success('Record deleted.');
      },
      (err) => {
        console.log('InsertOrUpdateT_WQX_REF_CHARACTERISTIC: failed');
        console.log(err);
        this.toasterSerivce.danger('Record could not be deleted.');
      },
    );

  }
  onRowEditSave2(refChar: WqxRefCharacteristic) {
    console.log(refChar);
    this.refDataService.InsertOrUpdateT_WQX_REF_CHARACTERISTIC(refChar).subscribe(
      (result) => {
        console.log('InsertOrUpdateT_WQX_REF_CHARACTERISTIC: valid');
        console.log(result);
      },
      (err) => {
        console.log('InsertOrUpdateT_WQX_REF_CHARACTERISTIC: failed');
        console.log(err);
      },
    );
  }

  onRowDelete3(refAnal: TWqxRefAnalMethod) {
    console.log(refAnal);
    refAnal.actInd = false;
    this.refDataService.InsertOrUpdateT_WQX_REF_ANAL_METHOD(refAnal).subscribe(
      (result) => {
        console.log('InsertOrUpdateT_WQX_REF_ANAL_METHOD: valid');
        console.log(result);
        this.toasterSerivce.success('Record deleted.');
      },
      (err) => {
        console.log('InsertOrUpdateT_WQX_REF_ANAL_METHOD: failed');
        console.log(err);
        this.toasterSerivce.danger('Record could not be deleted.');
      },
    );

  }
  onRowEditSave3(refAnal: TWqxRefAnalMethod) {
    console.log(refAnal);
    this.refDataService.InsertOrUpdateT_WQX_REF_ANAL_METHOD(refAnal).subscribe(
      (result) => {
        console.log('InsertOrUpdateT_WQX_REF_ANAL_METHOD: valid');
        console.log(result);
      },
      (err) => {
        console.log('InsertOrUpdateT_WQX_REF_ANAL_METHOD: failed');
        console.log(err);
      },
    );
  }

  onRowDelete4(refSamp: TWqxRefSampPrep) {
    console.log(refSamp);
    refSamp.actInd = false;
    this.refDataService.InsertOrUpdateT_WQX_REF_SAMP_PREP(refSamp).subscribe(
      (result) => {
        console.log('InsertOrUpdateT_WQX_REF_SAMP_PREP: valid');
        console.log(result);
        this.toasterSerivce.success('Record deleted.');
      },
      (err) => {
        console.log('InsertOrUpdateT_WQX_REF_SAMP_PREP: failed');
        console.log(err);
        this.toasterSerivce.danger('Record could not be deleted.');
      },
    );

  }
  onRowEditSave4(refSamp: TWqxRefSampPrep) {
    console.log(refSamp);
    this.refDataService.InsertOrUpdateT_WQX_REF_SAMP_PREP(refSamp).subscribe(
      (result) => {
        console.log('InsertOrUpdateT_WQX_REF_SAMP_PREP: valid');
        console.log(result);
      },
      (err) => {
        console.log('InsertOrUpdateT_WQX_REF_SAMP_PREP: failed');
        console.log(err);
      },
    );
  }

  onRowDelete5(refSampCol: WqxRefSampColMethod) {
    console.log(refSampCol);
    refSampCol.actInd = false;
    this.refDataService.InsertOrUpdateT_WQX_REF_SAMP_COL_METHOD(refSampCol).subscribe(
      (result) => {
        console.log('InsertOrUpdateT_WQX_REF_SAMP_COL_METHOD: valid');
        console.log(result);
        this.toasterSerivce.success('Record deleted.');
      },
      (err) => {
        console.log('InsertOrUpdateT_WQX_REF_SAMP_COL_METHOD: failed');
        console.log(err);
        this.toasterSerivce.danger('Record could not be deleted.');
      },
    );

  }
  onRowEditSave5(refSampCol: WqxRefSampColMethod) {
    console.log(refSampCol);
    this.refDataService.InsertOrUpdateT_WQX_REF_SAMP_COL_METHOD(refSampCol).subscribe(
      (result) => {
        console.log('InsertOrUpdateT_WQX_REF_SAMP_COL_METHOD: valid');
        console.log(result);
      },
      (err) => {
        console.log('InsertOrUpdateT_WQX_REF_SAMP_COL_METHOD: failed');
        console.log(err);
      },
    );
  }
  onRowDelete6(refLab: TWqxRefLab) {
    console.log(refLab);
    refLab.actInd = false;
    this.refDataService.InsertOrUpdateT_WQX_REF_LAB(refLab).subscribe(
      (result) => {
        console.log('InsertOrUpdateT_WQX_REF_LAB: valid');
        console.log(result);
        this.toasterSerivce.success('Record deleted.');
      },
      (err) => {
        console.log('InsertOrUpdateT_WQX_REF_LAB: failed');
        console.log(err);
        this.toasterSerivce.danger('Record could not be deleted.');
      },
    );

  }
  onRowEditSave6(refLab: TWqxRefLab) {
    console.log(refLab);
    this.refDataService.InsertOrUpdateT_WQX_REF_LAB(refLab).subscribe(
      (result) => {
        console.log('InsertOrUpdateT_WQX_REF_LAB: valid');
        console.log(result);
      },
      (err) => {
        console.log('InsertOrUpdateT_WQX_REF_LAB: failed');
        console.log(err);
      },
    );
  }

}
interface DummyData {
  id: string;
  name: string;
  desc: string;
  ctx: string;
}