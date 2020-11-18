import { Component, OnDestroy, OnInit } from '@angular/core';
import { WqxProjectConfig, WqxProject, WqxProject4Excel } from '../../../@core/wqx-data/wqx-project';
import { User } from '../../../@core/data/users';
import { WQXProjectService } from '../../../@core/wqx-services/wqx-project-service';
import { Router } from '@angular/router';
import { NbWindowService, NbWindowRef, NbToastrService } from '@nebular/theme';
import { WqxPubsubServiceService } from '../../../@core/wqx-services/wqx-pubsub-service.service';
import { ProjectConfigWindowComponent } from './project-config-window/project-config-window.component';
import { LocalDataSource } from 'ng2-smart-table';
import { AuthService } from '../../../@core/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ngx-wqx-project',
  templateUrl: './wqx-project.component.html',
  styleUrls: ['./wqx-project.component.scss'],
})
export class WqxProjectComponent implements OnInit, OnDestroy {

  user: User;
  currentOrgId: string;

  projectSerivceSubscription: Subscription[] = [];
  pubSubServiceSubscription: Subscription[] = [];

  i: number = 0;
  configWinRef: NbWindowRef;
  projectSource = new LocalDataSource([]);
  WqxProjects: WqxProject[];
  cols: any[];
  defaultCols: any[];

  constructor(private authService: AuthService,
    private projectService: WQXProjectService,
    private router: Router,
    private windowService: NbWindowService,
    private pubSubService: WqxPubsubServiceService,
    private toasterService: NbToastrService) {
    localStorage.setItem('currentPage', 'project');
    if (this.authService.isAuthenticated() === true) {
      const u = this.authService.getUser();
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
      this.populateData();
      this.pubSubServiceSubscription.push(this.pubSubService.projectChkData.subscribe((data: WqxProjectConfig[]) => {
        this.onConfigSaved(data);
      }));


    }
  }
  ngOnDestroy(): void {
    this.projectSerivceSubscription.forEach(element => {
      element.unsubscribe();
    });
    this.pubSubServiceSubscription.forEach(element => {
      element.unsubscribe();
    });
  }

  ngOnInit() {

    this.pubSubServiceSubscription.push(this.pubSubService.loadOrgId.subscribe((data: any) => {
      if (localStorage.getItem('currentPage') === 'project')
        if (data) {
          this.currentOrgId = data;
          this.populateData();
        }
    }));

  }
  onConfigSaved(data: WqxProjectConfig[]) {
    // Avoid copy by reference
    this.cols = JSON.parse(JSON.stringify(this.defaultCols));

    data.forEach(element => {
      if (element.value === true) {
        this.cols.push({ field: element.field, header: element.header });
      }
    });
  }
  populateCols() {
    this.defaultCols = [
      { field: 'projectId', header: 'ID' },
      { field: 'projectName', header: 'Name' },
      { field: 'projectDesc', header: 'Description' },
      { field: 'actInd', header: 'Active' },
    ];
  }
  populateData() {
    this.populateCols();
    this.cols = this.defaultCols;
    this.projectSerivceSubscription.push(this.projectService.GetWQX_PROJECT(false, this.currentOrgId, null).subscribe(
      (data: WqxProject[]) => {
        this.WqxProjects = data;
      },
      (err) => {
        console.log(err);
      },
    ));
  }

  onAddNew(): void {
    this.router.navigate(['/secure/water-quality/wqx-project-edit'], { queryParams: { projectIdx: -1 } });
  }
  exportExcel() {
    const temp: WqxProject4Excel[] = [];
    this.WqxProjects.map(x => {
      const t = {} as WqxProject4Excel;
      t.ID = x.projectId;
      t.Name = x.projectName;
      t.Description = x.projectDesc;
      t.SamplingDesignType = x.sampDesignTypeCd;
      t.QAPPApproval = x.qappApprovalInd.toString();
      t.QAPPApprovalAgency = x.qappApprovalAgency;
      t.Active = x.actInd.toString();
      if (x.wqxInd) {
        t.SendToEPA = x.wqxInd.toString();
      } else {
        t.SendToEPA = 'false';
      }
      temp.push(t);
    });

    console.log(temp);
    import('xlsx').then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(temp);
      const workbook = { Sheets: { 'ProjectsExport': worksheet }, SheetNames: ['ProjectsExport'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, 'ProjectsExport');
    });
  }


  saveAsExcelFile(buffer: any, fileName: string): void {
    import('file-saver').then(FileSaver => {
      const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      const EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE,
      });
      FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
    });
  }
  onConfig(): void {
    this.configWinRef = this.windowService.open(ProjectConfigWindowComponent,
      {
        title: ``,
        hasBackdrop: true,
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
  }

  onEditClicked(project: WqxProject) {
    this.router.navigate(['/secure/water-quality/wqx-project-edit'], { queryParams: { projectIdx: project.projectIdx } });
  }
  onDeleteClicked(project: WqxProject) {
    this.projectSerivceSubscription.push(this.projectService.DeleteT_WQX_PROJECT(project.projectIdx, this.user.name).subscribe(
      (result) => {
        if (result === 1) {
          this.toasterService.success('Record successfully deleted.', '', { destroyByClick: true, duration: 5000 });
        } else if (result === -1) {
          this.toasterService.danger('Activities found for this project - record cannot be deleted.', '', { destroyByClick: true, duration: 5000 });
        } else if (result === 0) {
          this.toasterService.danger('Unable to delete project.', '', { destroyByClick: true, duration: 5000 });
        } else {

        }
        this.populateData();
      },
      (err) => {
        console.log(err);
      },
    ));
  }
  onSendToEPA(projectIdx: number) {
    this.router.navigate(['/secure/water-quality/wqx-hist'], { queryParams: { TableCD: 'PROJ', TableIdx: projectIdx } });
  }
}
