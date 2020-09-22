import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { User } from '../../../@core/data/users';
import { TWqxImportTempMonloc, ImportSampleResultDisplay } from '../../../@core/wqx-data/wqx-import';
import { WqxImportService } from '../../../@core/wqx-services/wqx-import.service';

@Component({
  selector: 'ngx-wqx-import-sample',
  templateUrl: './wqx-import-sample.component.html',
  styleUrls: ['./wqx-import-sample.component.scss']
})
export class WqxImportSampleComponent implements OnInit {

  user: User;
  importSamples: ImportSampleResultDisplay[];
  selectedimportSamples: ImportSampleResultDisplay[];
  wqxImport: boolean = false;
  wqxSubmitStatus: string = 'U';
  activityReplaceType: string = 'R';
  cols: any[];
  constructor(private activatedRout: ActivatedRoute,
    private authService: NbAuthService,
    private importService: WqxImportService,
    private router: Router) { }

  ngOnInit() {
    this.cols = [
      { field: 'importStatusCd', header: 'Import Status' },
      { field: 'importStatusDesc', header: 'Import Errors' },
      { field: 'projectId', header: 'Project ID' },
      { field: 'monlocId', header: 'Monloc ID' },
      { field: 'activityId', header: 'Activity IDe' },
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
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        this.user = token.getPayload(); // here we receive a payload from the token and assigns it to our `user` variable
        console.log(this.user);
        console.log('called GetWQX_IMPORT_TEMP_SAMPLEByUserIdx wtih userIdx: ' + this.user.userIdx);
        this.importService.GetWQX_IMPORT_TEMP_SAMPLEByUserIdx(this.user.userIdx).subscribe(
          (data: ImportSampleResultDisplay[]) => {
            console.log('GetWQX_IMPORT_TEMP_SAMPLEByUserIdx: valid');
            console.log(data);
            this.importSamples = data;
          },
          (err) => {
            console.log('GetWQX_IMPORT_TEMP_SAMPLEByUserIdx: falied');
            console.log(err);
          },
        );
      }
    });
    /* this.activatedRoute.queryParams.subscribe(params => {
      this.orgEditId = params['userid'];
    }); */
  }

  selectRow(checkValue) {
    console.log(checkValue);
  }
  onRowSelect(event) {
    // console.log('nRowSelect');
    // console.log(event.data);
  }

  onRowUnselect(event) {
    // console.log('onRowUnselect');
    // console.log(event.data);
  }
  onBtnImportClicked() {
    console.log('btnImportClicked!');

    this.importService.ProcessImportTempSample(this.wqxSubmitStatus, this.activityReplaceType, this.user.userIdx).subscribe(
      (result) => {
        console.log('ProcessImport: valid');
        console.log(result);
        this.router.navigate(['/secure/water-quality/wqx-import']);
      },
      (err) => {
        console.log('ProcessImport: failed');
        console.log(err);
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
    console.log('onButtonCancelImportClicked!');
    this.importService.CancelProcessImportTempSample(this.user.userIdx).subscribe(
      (result) => {
        console.log('CancelProcessImportTempSample: valid');
        console.log(result);
        this.router.navigate(['/secure/water-quality/wqx-import']);
      },
      (err) => {
        console.log('CancelProcessImportTempSample: failed');
        console.log(err);
      },
    );
  }
}




