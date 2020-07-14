import { Component, OnInit, NgModule } from '@angular/core';
import { NbDatepickerModule, NbWindowService, NbWindowRef } from '@nebular/theme';
import { WqxMonloc } from '../../../@core/wqx-data/wqx-monloc';
import { WqxRefData } from '../../../@core/wqx-data/wqx-organization';
import { WqxProject } from '../../../@core/wqx-data/wqx-project';
import { Router } from '@angular/router';
import { User } from '../../../@core/data/users';
import { LocalDataSource } from 'ng2-smart-table/lib/data-source/local/local.data-source';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { WQXActivityService } from '../../../@core/wqx-services/wqx-activity-service';

@Component({
  selector: 'ngx-wqx-activity',
  templateUrl: './wqx-activity.component.html',
  styleUrls: ['./wqx-activity.component.scss']
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
  monlocSetting;
  _monlocSetting = {
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

  monlocSource = new LocalDataSource([]);

  txtStartDate = new Date();
  txtEndDate = new Date();
  monlocs: WqxMonloc[] = [];
  monlocSelected: string;

  actTypes: WqxRefData[] = [];
  actTypeSelected: string;
  chkDeletedInd: boolean = false;

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
  ) {
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        this.user = token.getPayload(); // here we receive a payload from the token and assigns it to our `user` variable
        this.currentOrgId = this.user.OrgID;

        /* this.pubSubService.monlocChkData.subscribe((data: WqxMonlocConfig[]) => {
          this.onConfigSaved(data);
        }); */

        this.populateData(true);
      }
    });
  }

  ngOnInit() {

  }

  populateData(isFirst: boolean) {
    this.activityService.getWqxActivityDisplay(this.chkDeletedInd,
      this.currentOrgId, isNaN(+this.monlocSelected) === true ? 0 : +this.monlocSelected, this.txtStartDate.toUTCString(),
      this.txtEndDate.toUTCString(), this.actTypeSelected, false, isNaN(+this.projectSelected) === true ? 0 : +this.projectSelected,
      ((this.wqxStatusSelected === undefined) ? '' : this.wqxStatusSelected)).subscribe(
        (data) => {
          console.log(data);
          if (isFirst === true) {
            this._monlocSetting.columns = {};
            this.prePop();
            this.postPop();
          }
          this.monlocSetting = Object.assign({}, this._monlocSetting);
          this.monlocSource = new LocalDataSource(data);
        },
      );
  }

  prePop() {
    this._monlocSetting.columns['activitY_IDX'] = {
      title: 'Activity ID',
      type: 'string',
      filter: false,
    };
    this._monlocSetting.columns['monloC_ID'] = {
      title: 'Monitoring Loc.',
      type: 'string',
      filter: false,
    };
    this._monlocSetting.columns['projecT_ID'] = {
      title: 'Project',
      type: 'string',
      filter: false,
    };
    this._monlocSetting.columns['acT_TYPE'] = {
      title: 'Type',
      type: 'string',
      filter: false,
    };
    this._monlocSetting.columns['acT_MEDIA'] = {
      title: 'Media',
      type: 'string',
      filter: false,
    };
    this._monlocSetting.columns['acT_SUBMEDIA'] = {
      title: 'SubMedia',
      type: 'string',
      filter: false,
    };
    this._monlocSetting.columns['acT_START_DT'] = {
      title: 'Sample Date',
      type: 'string',
      filter: false,
    };
  }
  postPop() {
    this._monlocSetting.columns['acT_COMMENT'] = {
      title: 'Comment',
      type: 'string',
      filter: false,
    };
    this._monlocSetting.columns['wqX_SUBMIT_STATUS'] = {
      title: 'Send to EPA',
      type: 'string',
      filter: false,
    };

  }
  onSubmit() {
    console.log('submit called!');
    //console.log(this.ngModelDate);
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
    // this.configWinRef = this.windowService.open(MonlocConfigWindowComponent, { title: `` });

  }
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
  onCustom(event): void {
    if (event.action === 'edit') {
      console.log(event.data.monlocIdx);
      this.router.navigate(['/secure/water-quality/wqx-monloc-edit'], { queryParams: { monlocIdx: event.data.monlocIdx } });
    }
  }
}
