import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { AuthService } from '../../../@core/auth/auth.service';
import { User } from '../../../@core/data/users';
import { VWqxTransactionLog, VWqxTransactionLogModel } from '../../../@core/wqx-data/wqx-mgmg';
import { WqxMgmtService } from '../../../@core/wqx-services/wqx-mgmt.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'ngx-wqx-hist',
  templateUrl: './wqx-hist.component.html',
  styleUrls: ['./wqx-hist.component.scss'],
})
export class WqxHistComponent implements OnInit {
  user: User;
  cols: any[];
  WqxLogs: VWqxTransactionLog[];
  currentOrgID: string = '';
  tableCd: string = '';
  tableIdx: number = 0;
  constructor(private mgmtService: WqxMgmtService,
    private activatedRoute: ActivatedRoute,
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
      if (localStorage.getItem('selectedOrgId') !== null) {
        this.currentOrgID = localStorage.getItem('selectedOrgId');
      }
    }
  }

  ngOnInit() {
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
    this.activatedRoute.queryParams.subscribe(params => {
      this.tableCd = params['TableCD'];
      this.tableIdx = parseInt(params['TableIdx'], 10);
      this.mgmtService.GetWQX_TRANSACTION_LOG(this.tableCd, this.tableIdx).subscribe(
        (data: VWqxTransactionLog[]) => {
          console.log('GetWQX_TRANSACTION_LOG: valid');
          console.log(data);
          this.WqxLogs = data;
        },
        (err) => {
          console.log('GetWQX_TRANSACTION_LOG: failed');
          console.log(err);
        },
      );
    });
  }
  onGetFileClicked(rowData: VWqxTransactionLog) {
    console.log('onGetFileClicked');
    console.log(rowData);
    this.processGetFile(rowData.logId);
  }
  processGetFile(logId: number) {
    this.mgmtService.GetWQX_TRANSACTION_LOG_ByLogID(logId).subscribe(
      (result: any) => {
        console.log('GetWQX_TRANSACTION_LOG_ByLogID: valid');
        console.log(result);
        const contentDisposition = result.headers.get('content-disposition');
        const filename = contentDisposition.split(';')[1].split('filename')[1].split('=')[1].trim();
        this.download(result.body, filename);
        /* if (result !== undefined && result !== null) {
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
        } */
      },
      (err) => {
        console.log('GetWQX_TRANSACTION_LOG_ByLogID: failed');
        console.log(err);
      },
    );
  }
  download(blob: Blob, nameFile?: string) {
    saveAs(blob, nameFile);
  }
}
