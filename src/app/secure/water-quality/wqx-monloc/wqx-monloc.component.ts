import { Component, OnInit } from '@angular/core';
import { WqxMonloc, WqxMonlocConfig } from '../../../@core/wqx-data/wqx-monloc';
import { NbWindowService, NbWindowRef } from '@nebular/theme';
import { MonlocConfigWindowComponent } from './monloc-config-window/monloc-config-window.component';
import { WqxPubsubServiceService } from '../../../@core/wqx-services/wqx-pubsub-service.service';
import { User } from '../../../@core/data/users';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { WqxMonlocService } from '../../../@core/wqx-services/wqx-monloc.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-wqx-monloc',
  templateUrl: './wqx-monloc.component.html',
  styleUrls: ['./wqx-monloc.component.scss'],
})
export class WqxMonlocComponent implements OnInit {

  user: User;
  currentOrgId: string;
  chkDeletedInd: boolean = false;
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
  configWinRef: NbWindowRef;
  monlocSource: WqxMonloc[] = [];
  constructor(private windowService: NbWindowService,
    private pubSubService: WqxPubsubServiceService,
    private authService: NbAuthService,
    private monlocService: WqxMonlocService,
    private router: Router) {
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        this.user = token.getPayload(); // here we receive a payload from the token and assigns it to our `user` variable
        this.currentOrgId = this.user.OrgID;

        this.pubSubService.monlocChkData.subscribe((data: WqxMonlocConfig[]) => {
          this.onConfigSaved(data);
        });

        this.populateData(true);
      }
    });
  }

  ngOnInit() {
  }

  populateData(isFirst: boolean) {
    this.monlocService.GetWQX_MONLOC(this.chkDeletedInd, this.currentOrgId, false).subscribe(
      (data) => {
        console.log(data);
        if (isFirst === true) {
          this._monlocSetting.columns = {};
          this.prePop();
          this.postPop();
        }
        this.monlocSetting = Object.assign({}, this._monlocSetting);
        this.monlocSource = data;
      },
    );
  }
  onConfigSaved(data: WqxMonlocConfig[]) {
    console.log('config saved!');
    this._monlocSetting.columns = {};
    this.prePop();
    this.i = 0;
    data.forEach(element => {
      this.addColumn(element);
    });
    this.postPop();
    this.monlocSetting = Object.assign({}, this._monlocSetting);
    this.configWinRef.close();
    this.populateData(false);
  }
  prePop() {
    this._monlocSetting.columns['monlocId'] = {
      title: 'ID',
      type: 'string',
      filter: false,
    };
    this._monlocSetting.columns['monlocName'] = {
      title: 'Name',
      type: 'string',
      filter: false,
    };
    this._monlocSetting.columns['monlocType'] = {
      title: 'Type',
      type: 'string',
      filter: false,
    };
    this._monlocSetting.columns['monlocDesc'] = {
      title: 'Description',
      type: 'string',
      filter: false,
    };
  }
  postPop() {
    this._monlocSetting.columns['latitudeMsr'] = {
      title: 'Latitude',
      type: 'string',
      filter: false,
    };
    this._monlocSetting.columns['longitudeMsr'] = {
      title: 'Longitude',
      type: 'string',
      filter: false,
    };
    this._monlocSetting.columns['horizAccuracyUnit'] = {
      title: 'Depth Unit',
      type: 'string',
      filter: false,
    };
  }
  public addColumn(element: WqxMonlocConfig) {
    if (element.value === true) {
      let elemName: string = '';
      switch (element.name) {
        case 'HUC_EIGHT': {
          elemName = '8-Digit HUC';
          break;
        }
        case 'HUC_TWELVE': {
          elemName = '12-Digit HUC';
          break;
        }
        case 'TRIBAL_LAND': {
          elemName = 'Tribal Land';
          break;
        }
        case 'SOURCE_MAP_SCALE': {
          elemName = 'Source Map Scale';
          break;
        }
        case 'HORIZ_COLL_METHOD': {
          elemName = 'Horiz. Collection Method';
          break;
        }
        case 'HORIZ_REF_DATUM': {
          elemName = 'Horiz. Datum';
          break;
        }
        case 'ERT_MEASURE': {
          elemName = 'Vertical Measure';
          break;
        }
        case 'COUNTRY_CODE': {
          elemName = 'Country';
          break;
        }
        case 'STATE_CODE': {
          elemName = 'State';
          break;
        }
        case 'COUNTY_CODE': {
          elemName = 'County';
          break;
        }
        case 'WELL_TYPE': {
          elemName = 'Well Type';
          break;
        }
        case 'AQUIFER_NAME': {
          elemName = 'Aquifer';
          break;
        }
        case 'FORMATION_TYPE': {
          elemName = 'Formation';
          break;
        }
        case 'WELLHOLE_DEPTH': {
          elemName = 'Wellhole Depth';
          break;
        }
      }
      this._monlocSetting.columns[elemName] = {
        title: elemName,
        type: 'string',
        filter: false,
      };
      this.i++;
    }
  }


  onChkDeletedInd(checked: boolean) {
    this.chkDeletedInd = checked;
    console.log(this.chkDeletedInd);
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
    this.configWinRef = this.windowService.open(MonlocConfigWindowComponent, { title: `` });

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
