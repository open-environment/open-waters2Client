import { Component, OnInit } from '@angular/core';
import { WqxMonloc } from '../../../../@core/wqx-data/wqx-monloc';
import { WqxProject } from '../../../../@core/wqx-data/wqx-project';
import { WqxRefData } from '../../../../@core/wqx-data/wqx-organization';
import { WqxRefSampColMethod, WqxRefCharacteristic } from '../../../../@core/wqx-data/wqx-refdata';
import { User } from '../../../../@core/data/users';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { WqxPubsubServiceService } from '../../../../@core/wqx-services/wqx-pubsub-service.service';
import { WQXRefDataService } from '../../../../@core/wqx-services/wqx-refdata-service';
import { WQXOrganizationService } from '../../../../@core/wqx-services/wqx-organization-service';
import { WqxMonlocService } from '../../../../@core/wqx-services/wqx-monloc.service';
import { WQXProjectService } from '../../../../@core/wqx-services/wqx-project-service';
import { ActivatedRoute, Router } from '@angular/router';
import { WQXActivityService } from '../../../../@core/wqx-services/wqx-activity-service';
import { NbToastrService } from '@nebular/theme';
import { finalize } from 'rxjs/operators';
import { WqxActivity, WqxResult } from '../../../../@core/wqx-data/wqx-activity';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-wqx-activity-edit',
  templateUrl: './wqx-activity-edit.component.html',
  styleUrls: ['./wqx-activity-edit.component.scss'],
})
export class WqxActivityEditComponent implements OnInit {

  populateCounter: number = 12; // when data is loaded counter is decremented by 1
  populateCounterHandle: any;
  maxIteration: number = 10; // we wait for 5 secs max
  user: User;
  currentOrgId: string;

  charNameList: { value: string, title: string }[] = [];
  bioSubjectTaxonomyList: { value: string, title: string }[] = [];

  activitySetting = {
    hideSubHeader: true,
    actions: {
      add: true,
      edit: true,
      delete: false,
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      resultIdx: {
        title: 'Name',
        type: 'string',
        filter: false,
      },
      charName: {
        title: 'Characteristic',
        type: 'html',
        valuePrepareFunction: (cell, row) => row.title,
        editor: {
          type: 'list',
          config: {
            list: this.charNameList,
          },
        },
        filter: false,
      },
      bioSubjectTaxonomy: {
        title: 'Taxonomy',
        type: 'html',
        valuePrepareFunction: (cell, row) => row.title,
        editor: {
          type: 'list',
          config: {
            list: this.bioSubjectTaxonomyList,
          },
        },
        filter: false,
      },
      resultMsr: {
        title: 'Result',
        type: 'string',
        filter: false,
      },
    },
  };
  // results: WqxResult[] = [];
  results: LocalDataSource = new LocalDataSource();

  lblMsg: string = '';
  lblMsgShow: boolean = false;
  txtActivityID: string;
  chkActInd: boolean = true;
  txtStartDate = new Date();
  txtEndDate = new Date();
  monlocs: WqxMonloc[] = [];
  monlocSelected: number;
  projects: WqxProject[] = [];
  projectSelected: number;
  chkWQXInd: boolean = true;
  activityTypes: WqxRefData[] = [];
  activityTypeSelected: string = '';
  activityMedias: WqxRefData[] = [];
  activityMediaSelected: string = '';
  activitySubMedias: WqxRefData[] = [];
  activitySubMediaSelected: string = '';
  sampCalls: WqxRefSampColMethod[] = [];
  sampCollSelected: number;
  txtDepth: string = '';
  depthUnitSelected: string = '';
  equipSelected: string = '';
  equips: WqxRefData[] = [];
  txtActComments: string = '';
  assemblageSelected: string = '';
  assemblages: WqxRefData[] = [];
  txtSamplingComponent: string = '';
  txtBioDuration: string = '';
  bioDurUnitSelected: string = '';
  txtSampComponentSeq: string = '';
  entryTypeSelected: string = '';
  lblModifyDate: string = '';
  canUserEdit: Boolean = false;
  activityIdx: number;
  showResults: boolean = true;

  constructor(private authService: NbAuthService,
    private pubSubService: WqxPubsubServiceService,
    private refDataService: WQXRefDataService,
    private organizationService: WQXOrganizationService,
    private monlocService: WqxMonlocService,
    private projectService: WQXProjectService,
    private activatedRoute: ActivatedRoute,
    private activityService: WQXActivityService,
    private toasterService: NbToastrService,
    private router: Router) {

    // here finalize method did not work,
    // so we added counter decrement logic in all 3 methods
    // one of which will be executed
    // need to fix this
    this.authService.onTokenChange()
      .subscribe(
        (token: NbAuthJWTToken) => {
          this.populateCounter--;
          if (token.isValid()) {
            this.user = token.getPayload(); // here we receive a payload from the token and assigns it to our `user` variable
            this.currentOrgId = this.user.OrgID;
            if (this.user !== null && this.currentOrgId !== null) {

            }
            /* this.pubSubService.activityChkData.subscribe((data: WqxActivityConfig[]) => {
              this.onConfigSaved(data);
            }); */
          }
        },
        (err) => {
          this.populateCounter--;
        },
        () => {
          this.populateCounter--;
        },
      );
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.activityIdx = parseInt(params['activityIdx'], 10);

      // wait for all the initalization like dropdowns
      this.maxIteration = 10; // reset max iteratiion
      this.populateCounterHandle = setInterval(() => {
        if (this.populateCounter === 0 || this.maxIteration <= 0) {
          clearInterval(this.populateCounterHandle);
          this.populateData(true);
        } else {
          this.maxIteration--;
        }
      }, 500);

    });
    // display warning if no reference data imported yet
    this.refDataService.GetT_WQX_REF_DATA_Count()
      .pipe(
        finalize(() => {
          this.populateCounter--;
        }),
      )
      .subscribe(
        (result) => {
          if (result === 0) {
            this.lblMsg = 'You must import reference data from EPA before you can enter sample data.';
            this.lblMsgShow = true;
          }
        },
        (err) => {
          console.log(err);
        },
      );

    // redirect to org settings page if no org chars defined yet
    this.refDataService.GetT_WQX_REF_CHAR_ORG_Count(this.currentOrgId)
      .pipe(
        finalize(() => {
          this.populateCounter--;
        }),
      )
      .subscribe(
        (result) => {
          if (result === 0) {
            this.lblMsg = 'You must define the characteristics that your organization will use (Organization screen) before you can enter sample data.';
            this.lblMsgShow = true;
          }
        },
      );

    // ONLY ALLOW EDIT FOR AUTHORIZED USERS OF ORG
    this.organizationService.CanUserEditOrg(this.user.userIdx, this.currentOrgId)
      .pipe(
        finalize(() => {
          this.populateCounter--;
        }),
      )
      .subscribe(
        (result) => {
          this.canUserEdit = result;
        },
        (err) => { console.log(err); },
      );

    // populate drop-downs - sample level
    this.refDataService.GetT_WQX_REF_DATA('ActivityType', true, true)
      .pipe(
        finalize(() => {
          this.populateCounter--;
        }),
      )
      .subscribe(
        (data) => {
          this.activityTypes = data;
        },
      );
    this.refDataService.GetT_WQX_REF_DATA('ActivityMedia', true, true)
      .pipe(
        finalize(() => {
          this.populateCounter--;
        }),
      )
      .subscribe(
        (data) => {
          this.activityMedias = data;
        },
      );
    this.refDataService.GetT_WQX_REF_DATA('ActivityMediaSubdivision', true, true)
      .pipe(
        finalize(() => {
          this.populateCounter--;
        }),
      )
      .subscribe(
        (data) => {
          this.activitySubMedias = data;
        },
      );
    this.refDataService.GetT_WQX_REF_DATA('SampleCollectionEquipment', true, true)
      .pipe(
        finalize(() => {
          this.populateCounter--;
        }),
      )
      .subscribe(
        (data) => {
          this.equips = data;
        },
      );
    this.refDataService.GetT_WQX_REF_DATA('Assemblage', true, true)
      .pipe(
        finalize(() => {
          this.populateCounter--;
        }),
      )
      .subscribe(
        (data) => {
          this.assemblages = data;
        },
      );
    this.monlocService.GetWQX_MONLOC(true, this.currentOrgId, false)
      .pipe(
        finalize(() => {
          this.populateCounter--;
        }),
      )
      .subscribe(
        (data) => {
          this.monlocs = data;
        },
      );
    this.projectService.GetWQX_PROJECT(true, this.currentOrgId, false)
      .pipe(
        finalize(() => {
          this.populateCounter--;
        }),
      )
      .subscribe(
        (data) => {
          this.projects = data;
        },
        (err) => {
          console.log(err);
        },
      );
    this.refDataService.GetT_WQX_REF_SAMP_COL_METHOD_ByContext(this.currentOrgId)
      .pipe(
        finalize(() => {
          this.populateCounter--;
        }),
      )
      .subscribe(
        (data) => {
          this.sampCalls = data;
        },
      );
  }

  populateData(isFirst: boolean) {
    if (this.activityIdx !== null && this.activityIdx > 0) {
      this.activityService.GetWQX_ACTIVITY_ByID(this.activityIdx).subscribe(
        (data: WqxActivity) => {
          this.txtActivityID = data.activityId;
          this.txtStartDate = new Date(data.actStartDt);
          // timezone???
          this.monlocSelected = (data.monlocIdx !== null && data.monlocIdx !== undefined) ? data.monlocIdx : 0;
          this.projectSelected = (data.projectIdx !== null && data.projectIdx !== undefined) ? data.projectIdx : 0;
          if (data.actInd !== null) this.chkActInd = data.actInd;
          if (data.wqxInd !== null) this.chkWQXInd = data.wqxInd;
          if (data.createDt != null) this.lblModifyDate = data.createDt;
          if (data.updateDt != null) this.lblModifyDate = data.updateDt;

          // populate activity tab
          this.activityTypeSelected = data.actType;
          this.activityMediaSelected = data.actMedia;
          this.activitySubMediaSelected = data.actSubmedia;
          if (data.actEndDt !== null) this.txtEndDate = new Date(data.actEndDt);
          this.txtDepth = data.actDepthheightMsr;
          this.depthUnitSelected = data.actDepthheightMsrUnit;
          this.equipSelected = data.sampCollEquip;
          this.sampCollSelected = (data.sampCollMethodIdx !== null) ? data.sampCollMethodIdx : 0;
          this.txtActComments = data.actComment;

          // populate bio tab
          this.assemblageSelected = data.bioAssemblageSampled;
          this.txtBioDuration = data.bioDurationMsr;
          this.bioDurUnitSelected = data.bioDurationMsrUnit;
          this.txtSamplingComponent = data.bioSampComponent;
          this.txtSampComponentSeq = data.bioSampComponentSeq;
          if (data.entryType !== null) {
            this.entryTypeSelected = data.entryType;
          } else {
            this.entryTypeSelected = 'C';
          }

          // populate results
          this.populateResultsGrid();
        },
      );
    }
  }
  onSubmit() {
    this.activityTypeSelected = (this.activityTypeSelected === null || this.activityTypeSelected === undefined) ? '' : this.activityTypeSelected;
    this.activityMediaSelected = (this.activityMediaSelected === null || this.activityMediaSelected === undefined) ? '' : this.activityMediaSelected;
    this.activitySubMediaSelected = (this.activitySubMediaSelected === null || this.activitySubMediaSelected === undefined) ? '' : this.activitySubMediaSelected;
    this.depthUnitSelected = (this.depthUnitSelected === null || this.depthUnitSelected === undefined) ? '' : this.depthUnitSelected;
    this.assemblageSelected = (this.assemblageSelected === null || this.assemblageSelected === undefined) ? '' : this.assemblageSelected;
    this.bioDurUnitSelected = (this.bioDurUnitSelected === null || this.bioDurUnitSelected === undefined) ? '' : this.bioDurUnitSelected;
    this.equipSelected = (this.equipSelected === null || this.equipSelected === undefined) ? '' : this.equipSelected;
    this.entryTypeSelected = (this.entryTypeSelected === null || this.entryTypeSelected === undefined) ? '' : this.entryTypeSelected;
    const actId: number = isNaN(this.activityIdx) ? 0 : this.activityIdx;
    const projIdx: number = isNaN(this.projectSelected) ? 0 : this.projectSelected;
    const monlocIdx: number = isNaN(this.monlocSelected) ? 0 : this.monlocSelected;
    const sampCompSeq: number = isNaN(+this.txtSampComponentSeq) ? 0 : +this.txtSampComponentSeq;
    const sampColl: number = isNaN(this.sampCollSelected) ? 0 : this.sampCollSelected;
    this.activityService.InsertOrUpdateWQX_ACTIVITY(actId, this.currentOrgId, projIdx, monlocIdx,
      this.txtActivityID, this.activityTypeSelected, this.activityMediaSelected, this.activitySubMediaSelected,
      this.txtStartDate.toUTCString(), this.txtEndDate.toUTCString(), '', '', this.txtDepth, this.depthUnitSelected, '', '', '', '', '',
      this.txtActComments, this.assemblageSelected, this.txtBioDuration, this.bioDurUnitSelected, this.txtSamplingComponent,
      sampCompSeq, '', '', '', '', 0, '', '', '', '', '', '', '', '', '', '', sampColl, this.equipSelected,
      '', 0, '', '', '', '', '', 'U', this.chkActInd, this.chkWQXInd, this.user.name, this.entryTypeSelected).subscribe(
        (result) => {
          if (result > 0) {
            this.showResults = true;
          } else {
            this.toasterService.danger('Error updating record.');
          }
        },
        (err) => { this.toasterService.danger('Error updating record.'); },
      );
  }
  populateResultsGrid() {

    // display metrics grid
    // pnlMetrics.Visible = grdMetrics.Rows.Count > 0 || ddlEntryType.SelectedValue == "H" || ddlEntryType.SelectedValue == "T";


    this.refDataService.GetT_WQX_REF_CHARACTERISTIC_ByOrg(this.currentOrgId, false).subscribe(
      (data: WqxRefCharacteristic[]) => {
        if (data !== null && data !== undefined) {
          data.forEach(obj => {
            this.charNameList.push({ value: obj.charName, title: obj.charName });
          });
          const newSettings = this.activitySetting;
          newSettings.columns.charName.editor.config.list = this.charNameList;
          this.activitySetting = Object.assign({}, newSettings);

          // localStorage.setItem('charNameListLS', JSON.stringify(this.charNameList));
        }
      },
      (err) => {
        console.log(err);
      },
    );

    this.refDataService.GetT_WQX_REF_TAXA_ByOrg(this.currentOrgId).subscribe(
      (data: WqxRefData[]) => {
        if (data !== null && data !== undefined) {
          data.forEach(obj => {
            this.bioSubjectTaxonomyList.push({ value: obj.value, title: obj.text });
          });
          const newSettings = this.activitySetting;
          newSettings.columns.bioSubjectTaxonomy.editor.config.list = this.bioSubjectTaxonomyList;
          this.activitySetting = Object.assign({}, newSettings);

          // localStorage.setItem('charNameListLS', JSON.stringify(this.charNameList));
        }
      },
      (err) => {
        console.log(err);
      },
    );

    this.activityService.GetT_WQX_RESULT(this.activityIdx).subscribe(
      (data) => {
        this.results = new LocalDataSource(data);
      },
    );

  }
  onExitClicked() {
    this.router.navigate(['../wqx-activity'], { relativeTo: this.activatedRoute });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
  onSaveConfirm(event): void {

    const d = event.newData;
    console.log(d);
    // this.refDataService.InsertOrUpdateT_WQX_RESULT();
    event.confirm.resolve();
  }
  onCustom(event): void {
    console.log(event.data);
  }
}
