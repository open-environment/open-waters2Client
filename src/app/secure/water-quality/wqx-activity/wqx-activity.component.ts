import { Component, OnInit, NgModule } from '@angular/core';
import { NbWindowService, NbWindowRef, NbToastrService } from '@nebular/theme';
import { WqxMonloc } from '../../../@core/wqx-data/wqx-monloc';
import { WqxRefData } from '../../../@core/wqx-data/wqx-organization';
import { WqxProject } from '../../../@core/wqx-data/wqx-project';
import { Router } from '@angular/router';
import { User } from '../../../@core/data/users';
import { LocalDataSource } from 'ng2-smart-table/lib/data-source/local/local.data-source';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { WQXActivityService } from '../../../@core/wqx-services/wqx-activity-service';
import { WqxActivityConfig, ActivityListDisplay } from '../../../@core/wqx-data/wqx-activity';
import { ActivityConfigWindowComponent } from './activity-config-window/activity-config-window.component';
import { WqxPubsubServiceService } from '../../../@core/wqx-services/wqx-pubsub-service.service';
import { WqxMonlocService } from '../../../@core/wqx-services/wqx-monloc.service';
import { WQXProjectService } from '../../../@core/wqx-services/wqx-project-service';

@Component({
  selector: 'ngx-wqx-activity',
  templateUrl: './wqx-activity.component.html',
  styleUrls: ['./wqx-activity.component.scss'],
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
  _activitySource: ActivityListDisplay[];

  cols: any[];
  defaultCols: any[];

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
    if (localStorage.getItem('selectedOrgId') !== null) {
      this.currentOrgId = localStorage.getItem('selectedOrgId');
    }
    // populate drop-downs
    this.populateDropdowns();
  }

  populateCols() {
    console.log('populateCols called!');
    this.defaultCols = [
      { field: 'monloC_ID', header: 'Monitoring Loc.' },
      { field: 'projecT_ID', header: 'Project' },
      { field: 'acT_TYPE', header: 'Type' },
      { field: 'acT_MEDIA', header: 'Media' },
      { field: 'acT_SUBMEDIA', header: 'SubMedia' },
      { field: 'acT_START_DT', header: 'Sample Date' },
      { field: 'acT_COMMENT', header: 'Comment' },
    ];
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
    this.populateCols();
    this.cols = this.defaultCols;
    this.activityService.getWqxActivityDisplay(this.chkDeletedInd,
      this.currentOrgId, isNaN(+this.monlocSelected) === true ? 0 : +this.monlocSelected,
      (this.txtStartDate === undefined) ? '' : this.txtStartDate.toUTCString(),
      (this.txtEndDate === undefined) ? '' : this.txtEndDate.toUTCString(), (this.actTypeSelected === undefined) ? '' : this.actTypeSelected, false, isNaN(+this.projectSelected) === true ? 0 : +this.projectSelected,
      ((this.wqxStatusSelected === undefined) ? '' : this.wqxStatusSelected)).subscribe(
        (data) => {
          /*           if (isFirst === true) {
                      this._activitySetting.columns = {};
                      this.prePop();
                      this.postPop();
                    }
                    this.activitySetting = Object.assign({}, this._activitySetting);
                    this.activitySource = new LocalDataSource(data); */
          this._activitySource = data;
          console.log(this._activitySource);
        },
      );
  }
  onConfigSaved(data: WqxActivityConfig[]) {
    console.log('config saved!');
    console.log('setting default cols...');

    // Avoid copy by reference
    this.cols = JSON.parse(JSON.stringify(this.defaultCols));

    data.forEach(element => {
      console.log('element >>');
      console.log(element);
      if (element.value === true) {
        this.cols.push({ field: element.field, header: element.header });
      }
    });
  }
  onSubmit() {
    console.log('submit called!');
    this.populateData(false);
  }

  onAddNew(): void {
    this.router.navigate(['/secure/water-quality/wqx-activity-edit'], { queryParams: { activityIdx: -1 } });
  }
  onExcel(): void {
    console.log('onExcel Click!');
  }
  onConfig(): void {
    this.configWinRef = this.windowService.open(ActivityConfigWindowComponent, { title: `` });
  }

  onEditClicked(activity: any) {
    console.log('onEditClicked');
    console.log(activity);
    this.router.navigate(['/secure/water-quality/wqx-activity-edit'], { queryParams: { activityIdx: activity.activitY_IDX } });
  }
  onDeleteClicked(activity: any) {
    console.log('onDeleteClicked');
    console.log(activity);
    console.log(activity.activityIdx);
    this.activityService.DeleteT_WQX_ACTIVITY(activity.activitY_IDX, this.user.userIdx).subscribe(
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
  onSendToEPA(activityIdx: number) {
    console.log('onSendToEPA');
    console.log(activityIdx);
  }
}
