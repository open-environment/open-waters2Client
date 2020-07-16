import { Component, OnInit, NgModule } from '@angular/core';
import { NbDatepickerModule, NbWindowService, NbWindowRef, NbToastrService } from '@nebular/theme';
import { WqxMonloc } from '../../../@core/wqx-data/wqx-monloc';
import { WqxRefData } from '../../../@core/wqx-data/wqx-organization';
import { WqxProject } from '../../../@core/wqx-data/wqx-project';
import { Router } from '@angular/router';
import { User } from '../../../@core/data/users';
import { LocalDataSource } from 'ng2-smart-table/lib/data-source/local/local.data-source';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { WQXActivityService } from '../../../@core/wqx-services/wqx-activity-service';
import { WqxActivityConfig } from '../../../@core/wqx-data/wqx-activity';
import { ActivityConfigWindowComponent } from './activity-config-window/activity-config-window.component';
import { WqxPubsubServiceService } from '../../../@core/wqx-services/wqx-pubsub-service.service';
import { WqxMonlocService } from '../../../@core/wqx-services/wqx-monloc.service';
import { WQXProjectService } from '../../../@core/wqx-services/wqx-project-service';

@Component({
  selector: 'ngx-wqx-activity',
  templateUrl: './wqx-activity.component.html',
  styleUrls: ['./wqx-activity.component.scss'],
})
@NgModule({
  imports: [
    // ...
    NbDatepickerModule,
  ],
})
export class WqxActivityComponent implements OnInit {

  user: User;
  currentOrgId: string;

  i = 0;
  activitySetting;
  _activitySetting = {
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

    columns: {},
  };

  activitySource = new LocalDataSource([]);

  txtStartDate: Date;
  txtEndDate: Date;
  monlocs: WqxMonloc[] = [];
  monlocSelected: string;

  actTypes: WqxRefData[] = [];
  actTypeSelected: string;
  chkDeletedInd: boolean = true;

  projects: WqxProject[] = [];
  projectSelected: string;

  wqxStatuses: { value: string, text: string }[] = [
    { value: '', text: 'All Records' },
    { value: 'U', text: 'Only Pending Records' },
    { value: 'N', text: 'Only Failed Records' },
    { value: 'Y', text: 'Only Passing Records' },
  ];
  wqxStatusSelected: string;

  configWinRef: NbWindowRef;

  constructor(private router: Router,
    private windowService: NbWindowService,
    private authService: NbAuthService,
    private activityService: WQXActivityService,
    private pubSubService: WqxPubsubServiceService,
    private toasterService: NbToastrService,
    private monlocService: WqxMonlocService,
    private projectService: WQXProjectService,
  ) {
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        this.user = token.getPayload(); // here we receive a payload from the token and assigns it to our `user` variable
        this.currentOrgId = this.user.OrgID;

        this.pubSubService.activityChkData.subscribe((data: WqxActivityConfig[]) => {
          this.onConfigSaved(data);
        });

        this.populateData(true);
      }
    });
  }

  ngOnInit() {
    // populate drop-downs
    this.populateDropdowns();
  }

  populateDropdowns() {
    this.monlocService.GetWQX_MONLOC_ByOrgID(this.currentOrgId).subscribe(
      (data) => {
        this.monlocs = data;
      },
    );
    this.activityService.GetT_WQX_REF_DATA_ActivityTypeUsed(this.currentOrgId).subscribe(
      (data) => {
        this.actTypes = data;
      },
    );
    this.projectService.GetWQX_PROJECT(true, this.currentOrgId, false).subscribe(
      (data) => {
        this.projects = data;
      },
    );
  }
  populateData(isFirst: boolean) {
    this.activityService.getWqxActivityDisplay(this.chkDeletedInd,
      this.currentOrgId, isNaN(+this.monlocSelected) === true ? 0 : +this.monlocSelected,
      (this.txtStartDate === undefined) ? '' : this.txtStartDate.toUTCString(),
      (this.txtEndDate === undefined) ? '' : this.txtEndDate.toUTCString(), (this.actTypeSelected === undefined) ? '' : this.actTypeSelected, false, isNaN(+this.projectSelected) === true ? 0 : +this.projectSelected,
      ((this.wqxStatusSelected === undefined) ? '' : this.wqxStatusSelected)).subscribe(
        (data) => {
          console.log(data);
          if (isFirst === true) {
            this._activitySetting.columns = {};
            this.prePop();
            this.postPop();
          }
          this.activitySetting = Object.assign({}, this._activitySetting);
          this.activitySource = new LocalDataSource(data);
        },
      );
  }
  onConfigSaved(data: WqxActivityConfig[]) {
    console.log('config saved!');
    this._activitySetting.columns = {};
    this.prePop();
    this.i = 0;
    data.forEach(element => {
      this.addColumn(element);
    });
    this.postPop();
    this.activitySetting = Object.assign({}, this._activitySetting);
    this.configWinRef.close();
    this.populateData(false);
  }
  prePop() {
    this._activitySetting.columns['activitY_ID'] = {
      title: 'Activity ID',
      type: 'string',
      filter: false,
    };
    this._activitySetting.columns['monloC_ID'] = {
      title: 'Monitoring Loc.',
      type: 'string',
      filter: false,
    };
    this._activitySetting.columns['projecT_ID'] = {
      title: 'Project',
      type: 'string',
      filter: false,
    };
    this._activitySetting.columns['acT_TYPE'] = {
      title: 'Type',
      type: 'string',
      filter: false,
    };
    this._activitySetting.columns['acT_MEDIA'] = {
      title: 'Media',
      type: 'string',
      filter: false,
    };
    this._activitySetting.columns['acT_SUBMEDIA'] = {
      title: 'SubMedia',
      type: 'string',
      filter: false,
    };
    this._activitySetting.columns['acT_START_DT'] = {
      title: 'Sample Date',
      type: 'string',
      filter: false,
    };
  }
  postPop() {
    this._activitySetting.columns['acT_COMMENT'] = {
      title: 'Comment',
      type: 'string',
      filter: false,
    };
    this._activitySetting.columns['wqX_SUBMIT_STATUS'] = {
      title: 'Send to EPA',
      type: 'string',
      filter: false,
    };

  }
  public addColumn(element: WqxActivityConfig) {
    if (element.value === true) {
      let elemName: string = '';
      let title: string = '';
      switch (element.name) {
        case 'SAMP_ACT_END_DT': {
          elemName = 'acT_END_DT';
          title = 'End Date';
          break;
        }
        case 'SAMP_COLL_METHOD': {
          elemName = 'samP_COLL_METHOD';
          title = 'Sample Collection Method';
          break;
        }
        case 'SAMP_COLL_EQUIP': {
          elemName = 'samP_COLL_EQUIP';
          title = 'Collection Equipment';
          break;
        }
        case 'SAMP_PREP': {
          elemName = 'samP_PREP_METHOD';
          title = 'Sample Prep Method';
          break;
        }
        case 'SAMP_DEPTH': {
          elemName = 'deptH_REF_POINT';
          title = 'Depth';
          break;
        }
      }
      this._activitySetting.columns[elemName] = {
        title: title,
        type: 'string',
        filter: false,
      };
      this.i++;
    }
  }
  onSubmit() {
    console.log('submit called!');
    // console.log(this.ngModelDate);
  }

  onAddNew(): void {
    console.log('Add New Click!');
    this.router.navigate(['/secure/water-quality/wqx-activity-edit'], { queryParams: { activityIdx: -1 } });
  }
  onExcel(): void {
    console.log('onExcel Click!');
  }
  onConfig(): void {
    this.configWinRef = this.windowService.open(ActivityConfigWindowComponent, { title: `` });
  }
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
  onCustom(event): void {
    console.log(event.data);
    if (event.action === 'edit') {
      this.router.navigate(['/secure/water-quality/wqx-activity-edit'], { queryParams: { activityIdx: event.data.activitY_IDX } });
    } else if (event.action === 'delete') {
      this.activityService.DeleteT_WQX_ACTIVITY(event.data.activitY_IDX, this.user.name).subscribe(
        (result) => {
          if (result === 1) {
            this.toasterService.success('Record successfully deleted.');
            this.populateData(false);
          } else {
            this.toasterService.success('Unable to delete activity.');
          }
        },
        (err) => {
          this.toasterService.success('Unable to delete activity.');
          console.log(err);
        },
      );
    }
  }
}
