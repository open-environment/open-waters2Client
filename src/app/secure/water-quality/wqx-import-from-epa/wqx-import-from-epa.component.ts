import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { AuthService } from '../../../@core/auth/auth.service';
import { User } from '../../../@core/data/users';
import { ImportStatusModel, TWqxImportLog } from '../../../@core/wqx-data/wqx-import';
import { WQXActivityService } from '../../../@core/wqx-services/wqx-activity-service';
import { WqxImportService } from '../../../@core/wqx-services/wqx-import.service';
import { WqxMonlocService } from '../../../@core/wqx-services/wqx-monloc.service';
import { WQXProjectService } from '../../../@core/wqx-services/wqx-project-service';

@Component({
  selector: 'ngx-wqx-import-from-epa',
  templateUrl: './wqx-import-from-epa.component.html',
  styleUrls: ['./wqx-import-from-epa.component.scss'],
})
export class WqxImportFromEpaComponent implements OnInit {

  user: User;
  currentOrgId: string = '';

  importLogs: TWqxImportLog[];

  loading: boolean = false;

  importTypeOption: string = '2';
  selectedImportType: string = 'MLOC';

  constructor(private importService: WqxImportService,
    private authService1: AuthService,
    private router: Router,
    private toasterService: NbToastrService,
    private monlocService: WqxMonlocService,
    private projectService: WQXProjectService,
    private activityService: WQXActivityService) {
    const u = this.authService1.getUser();
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
  }

  ngOnInit() {
    console.log('import-from-epa component: ngOnInit');
    console.log(this.currentOrgId);
    this.importService.GetWQX_IMPORT_LOG(this.currentOrgId).subscribe(
      (result) => {
        console.log('GetWQX_IMPORT_LOG: valid');
        console.log(result);
        this.importLogs = result;
      },
      (err) => {
        console.log('GetWQX_IMPORT_LOG: failed');
        console.log(err);
      },
    );
  }
  btnContinueClicked() {
    if (!this.currentOrgId) {
      this.toasterService.danger('Please select or create an organization first.');
      return;
    }
    this.loading = true;
    console.log(this.importTypeOption);
    console.log(this.selectedImportType);
    if (this.selectedImportType === 'MLOC') {
      this.importMonloc();
    } else if (this.selectedImportType === 'PROJ') {
      this.importProject();
    } else if (this.selectedImportType === 'ACT') {
      this.importActivity();
    } else {
      //do nothing
    }
  }
  importMonloc() {
    this.monlocService.DeleteTWqxImportTempMonloc(this.user.userIdx).subscribe(
      (result) => {
        console.log('DeleteTWqxImportTempMonloc: valid');
        console.log(result);
        if (result > 0) {
          this.monlocService.WQXImportMonLocAsync(this.currentOrgId, this.user.userIdx).subscribe(
            (result1: ImportStatusModel) => {
              console.log('WQXImportMonLocAsync: valid');
              console.log(result1);
              if (result1.importStatus === true) {
                this.router.navigate(['/secure/water-quality/wqx-import-monloc'],
                  { queryParams: { e: 1 } });
              } else {
                if (result1.importStatusMsg)
                  this.toasterService.danger(result1.importStatusMsg);
              }
            },
            (err) => {
              console.log('WQXImportMonLocAsync: failed');
              console.log(err);
              this.toasterService.danger('Unable to proceed with import.');
            },
            () => { this.loading = false; },
          );
        } else {
          this.toasterService.danger('Unable to proceed with import.');
        }
      },
      (err) => {
        console.log('DeleteTWqxImportTempMonloc: failed');
        console.log(err);
        this.loading = false;
        this.toasterService.danger('Unable to proceed with import.');

      },
    );
  }
  importProject() {
    this.projectService.DeleteTWqxImportTempProject(this.user.userIdx).subscribe(
      (result) => {
        console.log('DeleteTWqxImportTempProject: valid');
        console.log(result);
        if (result > 0) {

          this.projectService.WQXImportProjectAsync(this.currentOrgId, this.user.userIdx).subscribe(
            (result1: ImportStatusModel) => {
              console.log('WQXImportProjectAsync: valid');
              console.log(result1);
              if (result1.importStatus === true) {
                this.router.navigate(['/secure/water-quality/wqx-import-project'],
                  { queryParams: { e: 1 } });
              } else {
                if (result1.importStatusMsg)
                  this.toasterService.danger(result1.importStatusMsg);
              }
            },
            (err) => {
              console.log('WQXImportProjectAsync: failed');
              console.log(err);
              this.toasterService.danger('Unable to proceed with import.');
            },
            () => { this.loading = false; },
          );

        } else {
          this.toasterService.danger('Unable to proceed with import.');
        }
      },
      (err) => {
        console.log('DeleteTWqxImportTempProject: failed');
        console.log(err);
        this.toasterService.danger('Unable to proceed with import.');
      },
    );
  }
  importActivity() {
    this.activityService.DeleteTWqxImportTempSample(this.user.userIdx).subscribe(
      (result) => {
        console.log('DeleteTWqxImportTempSample: valid');
        console.log(result);
        if (result > 0) {
          const impLog = {} as TWqxImportLog;
          impLog.importId = 0;
          impLog.orgId = this.currentOrgId;
          impLog.typeCd = 'Sample';
          impLog.fileName = 'Sample';
          impLog.fileSize = 0;
          impLog.importStatus = 'New';
          impLog.importProgress = '0';
          impLog.importProgressMsg = 'Import scheduled';
          impLog.importFile = null;
          impLog.createUserId = this.user.name;
          this.importService.InsertOrUpdateTwqxImportLog(impLog).subscribe(
            (result2: number) => {
              console.log('InsertOrUpdateTwqxImportLog: valid');
              console.log(result2);
              const importId: number = result2;
              if (importId) {
                this.importService.ImportActivityAsync(this.currentOrgId, importId, this.user.name).subscribe(
                  (result3) => {
                    console.log('ImportActivityAsync: valid');
                    console.log(result3);
                    this.router.navigate(['/secure/water-quality/wqx-import-sample']);
                  },
                  (err3) => {
                    console.log('ImportActivityAsync: failed');
                    console.log(err3);
                  },
                );
              }
            },
            (err2) => {
              console.log('InsertOrUpdateTwqxImportLog: failed');
              console.log(err2);
            }
          );
          // InsertOrUpdateTwqxImportLog
        } else {
          this.toasterService.danger('Unable to proceed with import.');
        }
      },
      (err) => {
        console.log('DeleteTWqxImportTempSample: failed');
        console.log(err);
        this.toasterService.danger('Unable to proceed with import.');
      },
    );
  }
  onRowDelete(importLog: TWqxImportLog) {
    this.importService.DeleteTWqxImportLog(importLog.importId).subscribe(
      (result) => {
        console.log('DeleteTWqxImportLog: valid');
        console.log(result);
        this.router.navigate(['/secure/water-quality/wqx-import']);
      },
      (err) => {
        console.log('DeleteTWqxImportLog: failed');
        console.log(err);
      },
    );
  }
}
