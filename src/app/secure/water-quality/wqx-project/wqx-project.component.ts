import { Component, OnInit } from '@angular/core';
import { WqxProject } from '../../../@core/wqx-data/wqx-project';
import { User } from '../../../@core/data/users';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { WQXProjectService } from '../../../@core/wqx-services/wqx-project-service';
import { Router } from '@angular/router';
import { NbWindowService, NbWindowRef } from '@nebular/theme';
import { WqxPubsubServiceService } from '../../../@core/wqx-services/wqx-pubsub-service.service';
import { ProjectConfigWindowComponent } from './project-config-window/project-config-window.component';

@Component({
  selector: 'ngx-wqx-project',
  templateUrl: './wqx-project.component.html',
  styleUrls: ['./wqx-project.component.scss'],
})
export class WqxProjectComponent implements OnInit {

  user: User;
  currentOrgId: string;

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
  projectSource: WqxProject[] = [];
  constructor(private authService: NbAuthService,
    private projectService: WQXProjectService,
    private router: Router,
    private windowService: NbWindowService,
    private pubSubService: WqxPubsubServiceService) {
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        this.user = token.getPayload(); // here we receive a payload from the token and assigns it to our `user` variable
        this.currentOrgId = this.user.OrgID;
        this.populateData(true);
      }
    });
  }

  ngOnInit() {
  }
  populateData(isFirst: boolean) {
    this.projectService.GetWQX_PROJECT(false, this.currentOrgId, false).subscribe(
      (data) => {
        console.log(data);
        if (isFirst === true) {
          this._projectSetting.columns = {};
          this.prePop();
          this.postPop();
        }
        this.projectSetting = Object.assign({}, this._projectSetting);
        this.projectSource = data;
      },
    );
  }
  prePop() {
    this._projectSetting.columns['projectID'] = {
      title: 'ID',
      type: 'string',
      filter: false,
    };
    this._projectSetting.columns['projectName'] = {
      title: 'Name',
      type: 'string',
      filter: false,
    };
    this._projectSetting.columns['projectDesc'] = {
      title: 'Description',
      type: 'string',
      filter: false,
    };
    this._projectSetting.columns['sampDesignTypeCd'] = {
      title: 'Sampling Design Type',
      type: 'string',
      filter: false,
    };
    this._projectSetting.columns['qappApprovalInd'] = {
      title: 'QAPP Approval',
      type: 'string',
      filter: false,
    };
    this._projectSetting.columns['qappApprovalAgency'] = {
      title: 'QAPP Approval Agency',
      type: 'string',
      filter: false,
    };
    this._projectSetting.columns['actInd'] = {
      title: 'ACT_IND',
      type: 'string',
      filter: false,
    };
  }
  postPop() { }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
  onCustom(event): void {
    if (event.action === 'edit') {
      // console.log(event.data.monlocIdx);
      // this.router.navigate(['/secure/water-quality/wqx-monloc-edit'], { queryParams: { monlocIdx: event.data.monlocIdx } });
    }
  }
  onAddNew(): void {
    console.log('Add New Click!');
    this.router.navigate(['/secure/water-quality/wqx-monloc-edit'], { queryParams: { monlocIdx: -1 } });
  }
  onExcel(): void {
    console.log('onExcel Click!');
  }
  onConfig(): void {
    console.log('onConfig Click!');
    this.configWinRef = this.windowService.open(ProjectConfigWindowComponent, { title: `` });
  }
}
