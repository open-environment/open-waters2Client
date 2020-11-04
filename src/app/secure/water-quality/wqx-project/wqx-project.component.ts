import { Component, OnDestroy, OnInit } from '@angular/core';
import { WqxProjectConfig, WqxProject } from '../../../@core/wqx-data/wqx-project';
import { User } from '../../../@core/data/users';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
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
  projectSetting;
  _projectSetting = {
    hideSubHeader: true,
    actions: {
      custom: [
        {
          name: 'edit',
          title: '<i class="ion-edit" title="Edit"></i>',
        },
        {
          name: 'delete',
          title: '<i class="far fa-trash-alt" title="delete"></i>',
        },
      ],
      add: false,
      edit: false,
      delete: false,
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: 'Select >>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {},
  };
  configWinRef: NbWindowRef;
  projectSource = new LocalDataSource([]);
  WqxProjects: WqxProject[];
  cols: any[];
  defaultCols: any[];

  constructor(private authService: NbAuthService,
    private authService1: AuthService,
    private projectService: WQXProjectService,
    private router: Router,
    private windowService: NbWindowService,
    private pubSubService: WqxPubsubServiceService,
    private toasterService: NbToastrService) {
    localStorage.setItem('currentPage', 'project');
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
      console.log('populateData1');
      this.populateData();
      this.pubSubServiceSubscription.push(this.pubSubService.projectChkData.subscribe((data: WqxProjectConfig[]) => {
        this.onConfigSaved(data);
      }));


    }
  }
  ngOnDestroy(): void {
    console.log('project - ngOnDestroy called');
    this.projectSerivceSubscription.forEach(element => {
      element.unsubscribe();
    });
    this.pubSubServiceSubscription.forEach(element => {
      element.unsubscribe();
    });
  }

  ngOnInit() {

    this.pubSubServiceSubscription.push(this.pubSubService.loadOrgId.subscribe((data: any) => {
      console.log('pubsubservice called - project');
      if (localStorage.getItem('currentPage') === 'project')
        if (data) {
          this.currentOrgId = data;
          console.log('populateData2');
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
      { field: 'projectType', header: 'Type' },
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
  onExcel(): void {
  }
  onConfig(): void {
    this.configWinRef = this.windowService.open(ProjectConfigWindowComponent,
      { title: ``, hasBackdrop: true });
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
        console.log('DeleteT_WQX_PROJECT: failed');
        console.log(err);
      },
    ));
  }
  onSendToEPA(projectIdx: number) {
    this.router.navigate(['/secure/water-quality/wqx-hist'], { queryParams: { TableCD: 'PROJ', TableIdx: projectIdx } });
  }
}
