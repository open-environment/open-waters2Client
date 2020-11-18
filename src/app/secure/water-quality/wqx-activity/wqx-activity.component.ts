import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbWindowService, NbWindowRef, NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../../../@core/auth/auth.service';
import { User } from '../../../@core/data/users';
import { WqxMonloc } from '../../../@core/wqx-data/wqx-monloc';
import { WqxRefData } from '../../../@core/wqx-data/wqx-organization';
import { WqxProject } from '../../../@core/wqx-data/wqx-project';
import { LocalDataSource } from 'ng2-smart-table/lib/data-source/local/local.data-source';
import { WQXActivityService } from '../../../@core/wqx-services/wqx-activity-service';
import { WqxActivityConfig, ActivityListDisplay, Activity4Excel } from '../../../@core/wqx-data/wqx-activity';
import { ActivityConfigWindowComponent } from './activity-config-window/activity-config-window.component';
import { WqxPubsubServiceService } from '../../../@core/wqx-services/wqx-pubsub-service.service';
import { WqxMonlocService } from '../../../@core/wqx-services/wqx-monloc.service';
import { WQXProjectService } from '../../../@core/wqx-services/wqx-project-service';


@Component({
  selector: 'ngx-wqx-activity',
  templateUrl: './wqx-activity.component.html',
  styleUrls: ['./wqx-activity.component.scss'],
})

export class WqxActivityComponent implements OnInit, OnDestroy {

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
  activityServiceSubscription: Subscription[] = [];
  pubSubServiceSubscription: Subscription[] = [];
  monlocServiceSubscription: Subscription[] = [];
  projectServiceSubscription: Subscription[] = [];
  constructor(private router: Router,
    private windowService: NbWindowService,
    private toasterService: NbToastrService,
    private authService: AuthService,
    private activityService: WQXActivityService,
    private pubSubService: WqxPubsubServiceService,
    private monlocService: WqxMonlocService,
    private projectService: WQXProjectService,
  ) {
    localStorage.setItem('currentPage', 'activity');
    if (this.authService.isAuthenticated() === true) {
      const u = this.authService.getUser();
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

      this.pubSubServiceSubscription.push(this.pubSubService.activityChkData.subscribe(
        (data: WqxActivityConfig[]) => {
          this.onConfigSaved(data);
        },
        (err) => {
          console.log(err);
        },
      ));

      this.populateData(true);
    }
  }
  ngOnDestroy(): void {
    this.activityServiceSubscription.forEach(element => {
      element.unsubscribe();
    });
    this.pubSubServiceSubscription.forEach(element => {
      element.unsubscribe();
    });
    this.monlocServiceSubscription.forEach(element => {
      element.unsubscribe();
    });
    this.projectServiceSubscription.forEach(element => {
      element.unsubscribe();
    });
  }

  ngOnInit() {
    this.pubSubServiceSubscription.push(this.pubSubService.loadOrgId.subscribe((data: any) => {
      if (localStorage.getItem('currentPage') === 'activity')
        if (data) {
          this.currentOrgId = data;
          this.populateDropdowns();
        }
    }));

    // populate drop-downs
    this.populateDropdowns();
  }

  populateCols() {
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
    this.monlocServiceSubscription.push(this.monlocService.GetWQX_MONLOC_ByOrgID(this.currentOrgId).subscribe(
      (data) => {
        this.monlocs = data;
      },
      (err) => {
        console.log(err);
      },
    ));
    this.activityServiceSubscription.push(this.activityService.GetT_WQX_REF_DATA_ActivityTypeUsed(this.currentOrgId).subscribe(
      (data) => {
        this.actTypes = data;
      },
      (err) => {
        console.log(err);
      },
    ));
    this.projectServiceSubscription.push(this.projectService.GetWQX_PROJECT(true, this.currentOrgId, false).subscribe(
      (data) => {
        this.projects = data;
      },
      (err) => {
        console.log(err);
      },
    ));
  }
  populateData(isFirst: boolean) {
    this.populateCols();
    this.cols = this.defaultCols;
    this.activityServiceSubscription.push(this.activityService.getWqxActivityDisplay(this.chkDeletedInd,
      this.currentOrgId, isNaN(+this.monlocSelected) === true ? 0 : +this.monlocSelected,
      (this.txtStartDate === undefined) ? '' : this.txtStartDate.toUTCString(),
      (this.txtEndDate === undefined) ? '' : this.txtEndDate.toUTCString(), (this.actTypeSelected === undefined) ? '' : this.actTypeSelected, false, isNaN(+this.projectSelected) === true ? 0 : +this.projectSelected,
      ((this.wqxStatusSelected === undefined) ? '' : this.wqxStatusSelected)).subscribe(
        (data) => {
          this._activitySource = data;
          console.log(this._activitySource);
        },
        (err) => {
          console.log(err);
        },
      ));
  }
  onConfigSaved(data: WqxActivityConfig[]) {
    // Avoid copy by reference
    this.cols = JSON.parse(JSON.stringify(this.defaultCols));

    data.forEach(element => {
      if (element.value === true) {
        this.cols.push({ field: element.field, header: element.header });
      }
    });
  }
  onSubmit() {
    this.populateData(false);
  }

  onAddNew(): void {
    this.router.navigate(['/secure/water-quality/wqx-activity-edit'], { queryParams: { activityIdx: -1 } });
  }
  exportExcel() {
    const temp: Activity4Excel[] = [];
    this._activitySource.map(x => {
      const data: any = x;
      const t = {} as Activity4Excel;
      t.ActivityID = data.activitY_ID;
      t.MonitoringLoc = data.monloC_ID;
      t.Project = data.projecT_ID;
      t.Type = data.acT_TYPE;
      t.Media = data.acT_MEDIA;
      t.SubMedia = data.acT_SUBMEDIA;
      t.SampleDate = data.acT_START_DT;
      t.EndDate = data.acT_END_DT;
      t.SampleCollectionMethod = data.samP_COLL_METHOD;
      t.CollectionEquipment = data.samP_COLL_EQUIP;
      t.EquipmentComment = data.samP_COLL_EQUIP_COMMENT;
      t.SamplePerMethod = data.samP_PREP_METHOD;
      t.Depth = data.acT_DEPTHHEIGHT_MSR;
      t.TopDepth = data.toP_DEPTHHEIGHT_MSR;
      t.BottomDepth = data.boT_DEPTHHEIGHT_MSR;
      t.DepthReferencePoint = data.deptH_REF_POINT;
      t.Comment = data.acT_COMMENT;
      if (data.wqX_IND) {
        t.SendToEPA = data.wqX_IND.toString();
      } else {
        t.SendToEPA = 'false';
      }
      temp.push(t);
    });

    console.log(temp);
    import('xlsx').then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(temp);
      const workbook = { Sheets: { 'ActivitiesExport': worksheet }, SheetNames: ['ActivitiesExport'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, 'ActivitiesExport');
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
    this.configWinRef = this.windowService.open(ActivityConfigWindowComponent,
      { title: ``, hasBackdrop: true, closeOnBackdropClick: true, closeOnEsc: true });
    this.configWinRef.stateChange.subscribe(
      (data) => {
        console.log(data);
        if (data) {
          if (data.newState !== 'full-screen') this.configWinRef.fullScreen();
        }
      },
    );
  }

  onEditClicked(activity: any) {
    this.router.navigate(['/secure/water-quality/wqx-activity-edit'], { queryParams: { activityIdx: activity.activitY_IDX } });
  }
  onDeleteClicked(activity: any) {
    this.activityServiceSubscription.push(this.activityService.DeleteT_WQX_ACTIVITY(activity.activitY_IDX, this.user.userIdx).subscribe(
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
    ));
  }
  onSendToEPA(activityIdx: number) {
    this.router.navigate(['/secure/water-quality/wqx-hist'],
      { queryParams: { TableCD: 'ACT', TableIdx: activityIdx } });
  }
}
