import { Component, OnInit } from '@angular/core';
import { VWqxTransactionLog, VWqxPendingRecords, TOeAppTasks, CDXCredentials, VWqxTransactionLogModel } from '../../../@core/wqx-data/wqx-mgmg';
import { WqxMgmtService } from '../../../@core/wqx-services/wqx-mgmt.service';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { User } from '../../../@core/data/users';
import { NbToastrService } from '@nebular/theme';
import { AuthService } from '../../../@core/auth/auth.service';

@Component({
  selector: 'ngx-wqx-mgmt',
  templateUrl: './wqx-mgmt.component.html',
  styleUrls: ['./wqx-mgmt.component.scss'],
})
export class WqxMgmtComponent implements OnInit {

  user: User;
  currentOrgID: string = '';
  txtStartDate: string = '';
  txtEndDate: string = '';
  rbViewDataOptionSelected: string = '';
  rbSubmissionOptionSelected: string = '';
  cbShowAllOrgs: string = '';
  txtCurrentStatus: string = '';
  cols: any[];
  cols2: any[];
  WqxLogs: VWqxTransactionLog[];
  WqxPendingRecords: VWqxPendingRecords[];
  isSubmissionOptionsView: string = '';
  constructor(private mgmtService: WqxMgmtService,
    private authService: NbAuthService,
    private authService1: AuthService,
    private toasterService: NbToastrService) {
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
      this.currentOrgID = this.user.OrgID;
      if (this.user.isAdmin === 'true') {
        this.isSubmissionOptionsView = 'show';
      }
      this.mgmtService.GetT_OE_APP_TASKS_ByName('WQXSubmit').subscribe(
        (data: TOeAppTasks) => {
          console.log('GetT_OE_APP_TASKS_ByName: valid');
          console.log(data);
          this.txtCurrentStatus = data.taskStatus;
        },
        (err) => {
          console.log('GetT_OE_APP_TASKS_ByName: failed');
          console.log(err);
        },
      );
    }
    /* this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        this.user = token.getPayload(); // here we receive a payload from the token and assigns it to our `user` variable
        console.log(this.user);
        
      }
    }); */
  }

  ngOnInit() {

    if (localStorage.getItem('selectedOrgId') !== null) {
      this.currentOrgID = localStorage.getItem('selectedOrgId');
    }
    this.cols = [
      { field: 'orgId', header: 'Organization' },
      { field: 'logId', header: 'ID' },
      { field: 'tableCd', header: 'Type' },
      { field: 'record', header: 'Record' },
      { field: 'submitDt', header: 'Submission Date' },
      { field: 'submitType', header: 'Submission Typed' },
      { field: 'cdxSubmitTransId', header: 'CDX Transaction ID' },
      { field: 'cdxSubmitStatus', header: 'CDX Status' },
    ];
    this.cols2 = [
      { field: 'orgId', header: 'Organization' },
      { field: 'tableCd', header: 'Type' },
      { field: 'recId', header: 'ID' },
      { field: 'userId', header: 'Last Updated' },
      { field: 'updateDt', header: 'Updated Date' },
    ];

  }

  onSubmit() {

  }
  populateData() {
    console.log('populateData');
    console.log(this.cbShowAllOrgs);
    console.log(this.user.isAdmin);
    console.log(this.cbShowAllOrgs === 'true');
    console.log(this.user.isAdmin === 'true');
    let orgId: string = this.currentOrgID;
    if (this.cbShowAllOrgs === 'true' && this.user.isAdmin === 'true') {
      orgId = '';
    }
    if (this.rbViewDataOptionSelected === 'SUB') {
      this.mgmtService.GetV_WQX_TRANSACTION_LOG('', this.txtStartDate, this.txtEndDate, orgId).subscribe(
        (data: VWqxTransactionLog[]) => {
          console.log('GetV_WQX_TRANSACTION_LOG: valid');
          console.log(data);
          this.WqxLogs = data;
        },
        (err) => {
          console.log('GetV_WQX_TRANSACTION_LOG: failed');
          console.log(err);
        },
      );
    } else {
      this.mgmtService.GetV_WQX_PENDING_RECORDS(orgId, this.txtStartDate, this.txtEndDate).subscribe(
        (data: VWqxPendingRecords[]) => {
          console.log('GetV_WQX_PENDING_RECORDS: valid');
          console.log(data);
          this.WqxPendingRecords = data;
        },
        (err) => {
          console.log('GetV_WQX_PENDING_RECORDS: failed');
          console.log(err);
        },
      );
    }
  }
  onGetFileClicked(rowData: VWqxTransactionLog) {
    console.log('onGetFileClicked');
    console.log(rowData);
    this.processGetFile(rowData.logId);
  }
  processGetFile(logId: number) {
    this.mgmtService.GetWQX_TRANSACTION_LOG_ByLogID(logId).subscribe(
      (result: VWqxTransactionLogModel) => {
        console.log('GetWQX_TRANSACTION_LOG_ByLogID: valid');
        console.log(result);
        if (result !== undefined && result !== null) {
          if (result.wqxTransactionLog.responseFile === null &&
            result.wqxTransactionLog.responseTxt === null) {
            this.toasterService.danger('No validation details because submission succeeded.');
            return;
          } else {
            let data: Uint8Array;
            if (result.wqxTransactionLog.responseFile !== undefined && result.wqxTransactionLog.responseFile !== null) {
              console.log('1');
              // data = result.wqxTransactionLog.responseFile;
              console.log(result.responseFileXML);
              data = new TextEncoder().encode(result.responseFileXML);
            } else {
              console.log('2');
              data = new TextEncoder().encode(result.wqxTransactionLog.responseTxt);
            }
            console.log(data);
            const blob = new Blob([data], { type: 'text/xml' });
            const url = window.URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            if (result.wqxTransactionLog.responseFile !== undefined && result.wqxTransactionLog.responseFile !== null) {
              console.log('3');
              console.log(result.wqxTransactionLog.responseTxt);
              anchor.download = result.wqxTransactionLog.responseTxt;
            } else {
              console.log('4');
              anchor.download = 'download.xml';
            }
            anchor.href = url;
            anchor.click();
            // window.open(url);
          }
        }
      },
      (err) => {
        console.log('GetWQX_TRANSACTION_LOG_ByLogID: failed');
        console.log(err);
      },
    );
  }
  onApplyClick() {
    this.populateData();
  }
  onResetClick() {
    const data = {} as TOeAppTasks;
    data.taskName = 'WQXSubmit';
    data.taskStatus = 'STOPPED';
    data.taskFreqMs = 0;
    data.modifyUserId = 'system';
    this.mgmtService.UpdateT_OE_APP_TASKS(data).subscribe(
      (result) => {
        console.log('UpdateT_OE_APP_TASKS: valid');
        console.log(result);
      },
      (err) => {
        console.log('UpdateT_OE_APP_TASKS: failed');
        console.log(err);
      },
    );
  }
  onSubmitAll() {
    console.log('onSubmitAll called!');
    if (this.currentOrgID === '') {
      this.toasterService.info('Please select an Organization first.');
    } else {
      console.log(this.currentOrgID);
      console.log(this.rbSubmissionOptionSelected);
      // submit each record individually
      if (this.rbSubmissionOptionSelected === '0') {
        this.mgmtService.WQX_Master(this.currentOrgID).subscribe(
          (result) => {
            console.log('WQX_Master: valid');
            console.log(result);
            this.toasterService.success('Submission done');
          },
          (err) => {
            console.log('WQX_Master: failed');
            console.log(err);
            this.toasterService.danger('Submission failed');
          },
        );
      }

      // submit all pending data in one large batch
      if (this.rbSubmissionOptionSelected === '1') {

        // get CDX username, password, and CDX destination URL
        this.mgmtService.getCdxSubmitCredentials2(this.currentOrgID).subscribe(
          (result: CDXCredentials) => {
            console.log('getCdxSubmitCredentials2: valid');
            console.log(result);
            // add params
            const typeText: string = '';
            const recordIdx: number = 0;
            const insUpdIndicator: boolean = true;
            this.mgmtService.WQX_Submit_OneByOneAsync(
              typeText,
              recordIdx,
              result.userId,
              result.credential,
              result.nodeUrl,
              this.currentOrgID,
              insUpdIndicator).subscribe(
                (result2) => {
                  console.log('WQX_Submit_OneByOneAsync: valid');
                  console.log(result2);
                },
                (err2) => {
                  console.log('WQX_Submit_OneByOneAsync: failed');
                  console.log(err2);
                },
              );
          },
          (err) => {
            console.log('getCdxSubmitCredentials2: failed');
            console.log(err);
          },
        );
      }
    }
  }
}
