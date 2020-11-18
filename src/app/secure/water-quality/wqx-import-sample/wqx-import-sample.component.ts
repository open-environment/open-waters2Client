import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../@core/auth/auth.service';
import { User } from '../../../@core/data/users';
import { ImportSampleResultDisplay } from '../../../@core/wqx-data/wqx-import';
import { WqxImportService } from '../../../@core/wqx-services/wqx-import.service';


@Component({
  selector: 'ngx-wqx-import-sample',
  templateUrl: './wqx-import-sample.component.html',
  styleUrls: ['./wqx-import-sample.component.scss']
})
export class WqxImportSampleComponent implements OnInit {

  user: User;
  currentOrgId: string = '';

  importSamples: ImportSampleResultDisplay[];
  selectedimportSamples: ImportSampleResultDisplay[];
  wqxImport: boolean = false;
  wqxSubmitStatus: string = 'U';
  activityReplaceType: string = 'R';
  cols: any[];

  constructor(private authService: AuthService,
    private importService: WqxImportService,
    private router: Router) {
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
      if (localStorage.getItem('selectedOrgId') !== null) {
        this.currentOrgId = localStorage.getItem('selectedOrgId');
      }
      this.importService.GetWQX_IMPORT_TEMP_SAMPLEByUserIdx(this.user.userIdx).subscribe(
        (data: ImportSampleResultDisplay[]) => {
          console.log(data);
          const colList: string[] = 'ACT_COMMENT,ACT_MEDIA,ACT_START_DT,ACT_SUBMEDIA,ACT_TYPE,ACTIVITY_ID,IMPORT_STATUS_CD,IMPORT_STATUS_DESC,MONLOC_ID,ORG_ID,PROJECT_ID,PROJECT_IDX,TEMP_SAMPLE_IDX,USER_ID'.split(',');
          this.populateGrid(data);
        },
        (err) => {
          console.log(err);
        },
      );
    }
  }

  populateGrid(data: ImportSampleResultDisplay[]) {
    let colList: string[] = [];
    this.importService.GetImportTempSampleHeaders().subscribe(
      (result) => {
        if (result) {
          console.log(result);
          colList = result.split(',');
          if (colList.length > 0 && colList[0]) {
            const filteredCols = [];
            this.cols.forEach(element => {
              const foundCol = colList.find(item => this.getElemName(item) === element.field);
              if (foundCol) {
                filteredCols.push(element);
              }
            });
            this.cols = filteredCols;
            this.importSamples = data;
          }
        }
      },
      (err) => {
        console.log(err);
      },
    );

  }

  getElemName(element) {
    switch (element) {
      case 'USER_ID':
        return 'userId';
        break;
      case 'TOP_DEPTHHEIGHT_MSR_UNIT':
        return 'topDepthheightMsrUnit';
        break;
      case 'TOP_DEPTHHEIGHT_MSR':
        return 'topDepthheightMsr';
        break;
      case 'TEMP_SAMPLE_IDX':
        return 'tempSampleIdx';
        break;
      case 'SAMP_PREP_THERM_PRESERV':
        return 'sampPrepThermPreserv';
        break;
      case 'SAMP_PREP_STORAGE_DESC':
        return 'sampPrepStorageDesc';
        break;
      case 'SAMP_PREP_NAME':
        return 'sampPrepName';
        break;
      case 'SAMP_PREP_IDX':
        return 'sampPrepIdx';
        break;
      case 'SAMP_PREP_ID':
        return 'sampPrepId';
        break;
      case 'SAMP_PREP_CTX':
        return 'sampPrepCtx';
        break;
      case 'SAMP_PREP_CONT_TYPE':
        return 'sampPrepContType';
        break;
      case 'SAMP_PREP_CONT_COLOR':
        return 'sampPrepContColor';
        break;
      case 'SAMP_PREP_CHEM_PRESERV':
        return 'sampPrepChemPreserv';
        break;
      case 'SAMP_COLL_METHOD_NAME':
        return 'sampCollMethodName';
        break;
      case 'SAMP_COLL_METHOD_IDX':
        return 'sampCollMethodIdx';
        break;
      case 'SAMP_COLL_METHOD_ID':
        return 'sampCollMethodId';
        break;
      case 'SAMP_COLL_METHOD_CTX':
        return 'sampCollMethodCtx';
        break;
      case 'SAMP_COLL_EQUIP_COMMENT':
        return 'sampCollEquipComment';
        break;
      case 'SAMP_COLL_EQUIP':
        return 'sampCollEquip';
        break;
      case 'RELATIVE_DEPTH_NAME':
        return 'relativeDepthName';
        break;
      case 'PROJECT_IDX':
        return 'projectIdx';
        break;
      case 'PROJECT_ID':
        return 'projectId';
        break;
      case 'ORG_ID':
        return 'orgId';
        break;
      case 'MONLOC_IDX':
        return 'monlocIdx';
        break;
      case 'MONLOC_ID':
        return 'monlocId';
        break;
      case 'IMPORT_STATUS_DESC':
        return 'importStatusDesc';
        break;
      case 'IMPORT_STATUS_CD':
        return 'importStatusCd';
        break;
      case 'DEPTH_REF_POINT':
        return 'depthRefPoint';
        break;
      case 'BOT_DEPTHHEIGHT_MSR_UNIT':
        return 'bioDepthheightMsrUni';
        break;
      case 'BOT_DEPTHHEIGHT_MSR':
        return 'bioDepthheightMsr';
        break;
      case 'BIO_TOXICITY_TEST_TYPE':
        return 'bioToxicityTestType';
        break;
      case 'BIO_SAMP_COMPONENT_SEQ':
        return 'bioSampComponentSeq';
        break;
      case 'BIO_SAMP_COMPONENT':
        return 'bioSampComponent';
        break;
      case 'BIO_REACH_WID_MSR_UNIT':
        return 'bioReachWidMsrUni';
        break;
      case 'BIO_REACH_WID_MSR':
        return 'bioReachWidMsr';
        break;
      case 'BIO_REACH_LEN_MSR_UNIT':
        return 'bioReachLenMsrUni';
        break;
      case 'BIO_REACH_LEN_MSR':
        return 'bioReachLenMsr';
        break;
      case 'BIO_PASS_COUNT':
        return 'bioPassCount';
        break;
      case 'BIO_NET_TYPE':
        return 'bioNetType';
        break;
      case 'BIO_NET_MESHSIZE_MSR':
        return 'bioNetMeshsizeMsr';
        break;
      case 'BIO_NET_AREA_MSR_UNIT':
        return 'bioNetAreaMsrUnit';
        break;
      case 'BIO_NET_AREA_MSR':
        return 'bioNetAreadMsr';
        break;
      case 'BIO_MESHSIZE_MSR_UNIT':
        return 'bioMeshsizeMsrUnit';
        break;
      case 'BIO_DURATION_MSR_UNIT':
        return 'bioDurationdMsrUnit';
        break;
      case 'BIO_DURATION_MSR':
        return 'bioDurationdMsr';
        break;
      case 'BIO_CURR_SPEED_MSR_UNIT':
        return 'bioCurrSpeedMsrUnit';
        break;
      case 'BIO_CURR_SPEED_MSR':
        return 'bioCurrSpeedMsr';
        break;
      case 'BIO_BOAT_SPEED_MSR_UNIT':
        return 'bioBoatSpeedMsrUnit';
        break;
      case 'BIO_BOAT_SPEED_MSR':
        return 'bioBoatSpeedMsr';
        break;
      case 'BIO_ASSEMBLAGE_SAMPLED':
        return 'bioAssemblageSampled';
        break;
      case 'ACTIVITY_IDX':
        return 'activityIdx';
        break;
      case 'ACTIVITY_ID':
        return 'activityId';
        break;
      case 'ACT_TYPE':
        return 'actType';
        break;
      case 'ACT_TIME_ZONE':
        return 'actTimeZone';
        break;
      case 'ACT_SUBMEDIA':
        return 'actSubmedia';
        break;
      case 'ACT_START_DT':
        return 'actStartDt';
        break;
      case 'ACT_MEDIA':
        return 'actMedia';
        break;
      case 'ACT_END_DT':
        return 'actEndDt';
        break;
      case 'ACT_DEPTHHEIGHT_MSR_UNIT':
        return 'actDepthheightMsrUnit';
        break;
      case 'ACT_DEPTHHEIGHT_MSR':
        return 'actDepthheightMsr';
        break;
      case 'ACT_COMMENT':
        return 'actComment';
        break;
      default:
        return '';
        break;
    }
  }
  iterateHeaders(data) {
    const impStruct = {
      tempSampleIdx: '',
      orgId: '',
      /* projectId: '',
      monlocId: '',
      activityId: '',
      actType: '',
      actMedia: '',
      actSubmedia: '',
      actStartDt: '',
      actEndDt: '',
      ctTimeZone: '',
      relativeDepthName: '',
      actDepthheightMsr: '',
      actDepthheightMsrUnit: '',
      topDepthheightMsr: '',
      topDepthheightMsrUnit: '',
      botDepthheightMsr: '',
      botDepthheightMsrUnit: '',
      depthRefPoint: '',
      actComment: '',
      bioAssemblageSampled: '',
      bioDurationMsr: '',
      bioDurationMsrUnit: '',
      bioSampComponent: '',
      bioSampComponentSeq: '',
      sampCollMethodId: '',
      sampCollMethodCtx: '',
      sampCollEquip: '',
      sampCollEquipComment: '',
      sampPrepId: '',
      sampPrepCtx: '',

      tempResultIdx: '',
      dataLoggerLine: '',
      resultDetectCondition: '',
      charName: '',
      methodSpeciationName: '',
      resultSampFraction: '',
      resultMsr: '',
      resultMsrUnit: '',
      resultMsrQual: '',
      resultStatus: '',
      statisticBaseCode: '',
      resultValueType: '',
      weightBasis: '',
      timeBasis: '',
      tempBasis: '',
      particlesizeBasis: '',
      precisionValue: '',
      biasValue: '',
      resultComment: '',
      resDepthHeightMsg: '',
      resDepthHeightMsrUnit: '',

      bioIntentName: '',
      bioIndividualId: '',
      bioSubjectTaxonomy: '',
      bioUnidentifiedSpeciesId: '',
      bioSampleTissueAnatomy: '',
      grpSummCountWeightMsr: '',
      grpSummCountWeightMsrUnit: '',
      freqClassCode: '',
      freqClassUnit: '',
      analyticMethodId: '',
      analyticMethodCtx: '',
      labName: '',
      labAnalysisStartDt: '',
      labAnalysisEndDt: '',
      resultLabCommentCode: '',
      methodDetectionLevel: '',
      labReportingLevel: '',
      pql: '',
      lowerQuantLimit: '',
      upperQuantLimit: '',
      detectionLimitUnit: '',
      labSampPrepStartDt: '',
      dilutionFactor: '',
      importStatusCd: '',
      importStatusDesc: '', */
    };
    type objType = typeof impStruct;
    const headers: Array<Object> = Object.keys(impStruct).map(key => {
      return { text: key, value: key };
    });
    console.log(headers);
    headers.forEach(header => {
      let isInculded: boolean = this.isHeaderIncluded(data, header);
    });

  }
  isHeaderIncluded(data, header) {
    let isInculded: boolean = false;
    data.forEach(element => {
      console.log(element);
      console.log(header);
      console.log(element[header]);
    });
    return isInculded;
  }
  ngOnInit() {

    this.cols = [
      { field: 'importStatusCd', header: 'Import Status' },
      { field: 'importStatusDesc', header: 'Import Errors' },
      { field: 'projectId', header: 'Project ID' },
      { field: 'monlocId', header: 'Monloc ID' },
      { field: 'activityId', header: 'Activity ID' },
      { field: 'actType', header: 'Activity Type' },
      { field: 'actMedia', header: 'Activity Media' },
      { field: 'actSubmedia', header: 'Sub-Media' },
      { field: 'actStartDt', header: 'Start Date' },
      { field: 'actEndDt', header: 'End Date' },
      { field: 'actTimeZone', header: 'Time Zone' },
      { field: 'relativeDepthName', header: 'Relative Depth' },
      { field: 'actDepthheightMsr', header: 'Activity Depth' },
      { field: 'actDepthheightMsrUnit', header: 'Depth Unit' },
      { field: 'topDepthheightMsr', header: 'Top Depth' },
      { field: 'topDepthheightMsrUnit', header: 'Top Depth Unit' },
      { field: 'botDepthheightMsr', header: 'Bot Depth' },
      { field: 'botDepthheightMsrUnit', header: 'Bot Depth Unit' },
      { field: 'actComment', header: 'Activity Comment' },
      { field: 'bioAssemblageSampled', header: 'Assemblage Sampled' },
      { field: 'bioDurationMsr', header: 'Duration' },
      { field: 'bioDurationMsrUnit', header: 'Duration Unit' },
      { field: 'bioSampComponent', header: 'Bio Samp Component' },
      { field: 'bioSampComponentSeq', header: 'Samp Component Seq' },
      { field: 'sampCollMethodId', header: 'Collection Method' },
      { field: 'sampCollMethodCtx', header: 'Collection Method Context' },
      { field: 'sampCollEquip', header: 'Equipment' },
      { field: 'sampCollEquipComment', header: 'Equipment Comment' },
      { field: 'sampPrepId', header: 'Samp Prep' },
      { field: 'sampPrepCtx', header: 'Samp Prep Context' },
      { field: 'resultDetectCondition', header: 'Detect Condition' },
      { field: 'charName', header: 'Characteristic' },
      { field: 'methodSpeciationName', header: 'Method Speciation' },
      { field: 'resultSampFraction', header: 'Samp Fraction' },
      { field: 'resultMsr', header: 'Result' },
      { field: 'resultMsrUnit', header: 'Unit' },
      { field: 'resultMsrQual', header: 'Qualifier' },
      { field: 'resultStatus', header: 'Result Status' },
      { field: 'statisticBaseCode', header: 'Statistic Base' },
      { field: 'resultValueType', header: 'Result Value Type' },
      { field: 'weightBasis', header: 'Weight Basis' },
      { field: 'timeBasis', header: 'Time Basis' },
      { field: 'tempBasis', header: 'Temp Basis' },
      { field: 'particlesizeBasis', header: 'Partical Size' },
      { field: 'precisionValue', header: 'Precision' },
      { field: 'biasValue', header: 'Bias' },
      { field: 'resultComment', header: 'Result Comment' },
      { field: 'bioIntentName', header: 'Bio Intent' },
      { field: 'bioSubjectTaxonomy', header: 'Taxonomy' },
      { field: 'freqClassCode', header: 'Freq Class' },
      { field: 'freqClassUnit', header: 'Freq Class Unit' },
      { field: 'analyticMethodId', header: 'Anal Method' },
      { field: 'analyticMethodCtx', header: 'Anal Method Context' },
      { field: 'labName', header: 'Lab Name' },
      { field: 'labAnalysisStartDt', header: 'Analysis Start Date' },
      { field: 'labAnalysisEndDt', header: 'Analysis End Date' },
      { field: 'resultLabCommentCode', header: 'Lab Comment' },
      { field: 'methodDetectionLevel', header: 'Detection Limit' },
      { field: 'labReportingLevel', header: 'Lab Reporting Level' },
      { field: 'pql', header: 'PQL' },
      { field: 'lowerQuantLimit', header: 'Lower Quant Limit' },
      { field: 'detectionLimitUnit', header: 'Detection Limit Unit' },
      { field: 'labSampPrepStartDt', header: 'Lab Prep Start Date' },
      { field: 'dilutionFactor', header: 'Dilution Factor' },
    ];
  }

  selectRow(checkValue) {
  }
  onRowSelect(event) {
  }

  onRowUnselect(event) {
  }
  onBtnImportClicked() {

    this.importService.ProcessImportTempSample(this.wqxSubmitStatus, this.activityReplaceType, this.user.userIdx).subscribe(
      (result) => {
      },
      (err) => {
        console.log(err);
      },
      () => {
        this.router.navigate(['/secure/water-quality/wqx-import']);
      },
    );

    // TODO:
    // if importing data from EPA, then save the records as already synced and passing
    // bool wqxImport = ((Request.QueryString["e"] ?? "") == "1") ? true : chkWQXImport.Checked;
    // string wqxSubmitStatus = ((Request.QueryString["e"] ?? "") == "1") ? "Y" : "U";
    /* console.log(this.selectedimportSamples);
    console.log(this.wqxImport);
    let _selectedImportSampleIds: string = '';
    this.selectedimportSamples.forEach(element => {
      _selectedImportSampleIds += element.TempSampleIdx.toString() + ',';
    }); 
    if (_selectedImportSampleIds.length > 0) {
      if (_selectedImportSampleIds.endsWith(',')) {
        _selectedImportSampleIds = _selectedImportSampleIds.substring(0, _selectedImportSampleIds.length - 1);
      }
      console.log(_selectedImportSampleIds);
      this.importService.ProcessImportTempSample(this.wqxSubmitStatus, this.activityReplaceType, this.user.userIdx).subscribe(
        (result) => {
          console.log('ProcessImport: valid');
          console.log(result);
          this.router.navigate(['/secure/water-quality/wqx-import']);
        },
        (err) => {
          console.log('ProcessImport: failed');
          console.log(err);
        },
      );
    } */


  }
  onButtonCancelImportClicked() {
    this.importService.CancelProcessImportTempSample(this.user.userIdx).subscribe(
      (result) => {
        this.router.navigate(['/secure/water-quality/wqx-import']);
      },
      (err) => {
        console.log(err);
      },
    );
  }


}




