import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { AuthService } from '../../../@core/auth/auth.service';
import { User } from '../../../@core/data/users';
import { TWqxImportTempMonloc, ImportSampleResultDisplay, TWqxImportTempActivityMetric } from '../../../@core/wqx-data/wqx-import';
import { WqxImportService } from '../../../@core/wqx-services/wqx-import.service';

@Component({
  selector: 'ngx-wqx-import-metric',
  templateUrl: './wqx-import-metric.component.html',
  styleUrls: ['./wqx-import-metric.component.scss']
})
export class WqxImportMetricComponent implements OnInit {

  user: User;
  currentOrgId: string = '';

  importMetrics: TWqxImportTempActivityMetric[];
  selectedimportMetrics: TWqxImportTempActivityMetric[];
  wqxImport: boolean = false;
  wqxSubmitStatus: string = 'U';
  activityReplaceType: string = 'R';
  cols: any[];

  constructor(private activatedRout: ActivatedRoute,
    private authService: NbAuthService,
    private authService1: AuthService,
    private importService: WqxImportService,
    private router: Router) {
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
      this.importService.GetWqxImportTempActivityMetric(this.user.userIdx).subscribe(
        (data: TWqxImportTempActivityMetric[]) => {
          console.log('GetWqxImportTempActivityMetric: valid');
          console.log(data);
          this.importMetrics = data;
        },
        (err) => {
          console.log('GetWqxImportTempActivityMetric: falied');
          console.log(err);
        },
      );
    }
  }

  ngOnInit() {

    this.cols = [
      { field: 'orgId', header: 'Organization' },
      { field: 'activityId', header: 'Activity ID' },
      { field: 'metricTypeId', header: 'Metric Type ID' },
      { field: 'metricTypeIdContext', header: 'Metric Type Context' },
      { field: 'metricScore', header: 'Metric Score' },
      { field: 'metricValueMsr', header: 'Metric Value' },
      { field: 'metricValueUnitMsr', header: 'Metric Value Unit' },
      { field: 'metricComment', header: 'Metric Comment' },
      { field: 'importStatusCd', header: 'Import Status' },
      { field: 'importStatusDesc', header: 'Import Errors' },
    ];

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


