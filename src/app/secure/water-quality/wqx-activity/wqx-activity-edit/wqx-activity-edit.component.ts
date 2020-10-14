import { Component, OnInit } from '@angular/core';
import { WqxMonloc } from '../../../../@core/wqx-data/wqx-monloc';
import { WqxProject } from '../../../../@core/wqx-data/wqx-project';
import { WqxRefData } from '../../../../@core/wqx-data/wqx-organization';
import { WqxRefSampColMethod, WqxRefCharacteristic, AnalMethodDisplay, WqxRefCharLimits } from '../../../../@core/wqx-data/wqx-refdata';
import { User } from '../../../../@core/data/users';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { WqxPubsubServiceService } from '../../../../@core/wqx-services/wqx-pubsub-service.service';
import { WQXRefDataService } from '../../../../@core/wqx-services/wqx-refdata-service';
import { WQXOrganizationService } from '../../../../@core/wqx-services/wqx-organization-service';
import { WqxMonlocService } from '../../../../@core/wqx-services/wqx-monloc.service';
import { WQXProjectService } from '../../../../@core/wqx-services/wqx-project-service';
import { ActivatedRoute, Router } from '@angular/router';
import { WQXActivityService } from '../../../../@core/wqx-services/wqx-activity-service';
import { NbToastrService, NbListItemComponent } from '@nebular/theme';
import { finalize } from 'rxjs/operators';
import { WqxActivity, WqxResult } from '../../../../@core/wqx-data/wqx-activity';
import { LocalDataSource } from 'ng2-smart-table';
import { NgModel } from '@angular/forms';
import { SelectItem } from 'primeng/primeng';
import { AuthService } from '../../../../@core/auth/auth.service';

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

  // charNameList: { value: string, title: string }[] = [];
  charNameList: SelectItem[] = [];
  // bioSubjectTaxonomyList: { value: string, title: string }[] = [];
  bioSubjectTaxonomyList: SelectItem[] = [];
  unitList: SelectItem[] = [];
  analMethodList: SelectItem[] = [];
  sampFractionList: SelectItem[] = [];
  valueTypeList: SelectItem[] = [];
  statusList: SelectItem[] = [];
  bioIntentList: SelectItem[] = [];
  freqClassList: SelectItem[] = [];

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
  results: WqxResult[] = [];
  // results: LocalDataSource = new LocalDataSource();
  resultCols: { col: string, show: boolean }[] = [];
  rowData: WqxResult;

  lblMsg: string = '';
  lblMsgShow: boolean = false;
  txtActivityID: string;
  txtTimeZone: string;
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
  showMatrics: boolean = true;

  constructor(private authService: NbAuthService,
    private authService1: AuthService,
    private pubSubService: WqxPubsubServiceService,
    private refDataService: WQXRefDataService,
    private organizationService: WQXOrganizationService,
    private monlocService: WqxMonlocService,
    private projectService: WQXProjectService,
    private activatedRoute: ActivatedRoute,
    private activityService: WQXActivityService,
    private toasterService: NbToastrService,
    private router: Router) {

    // ToDo:  here finalize method did not work,
    // so we added counter decrement logic in all 3 methods
    // one of which will be executed
    // need to fix this
    if (this.authService1.isAuthenticated() === true) {
      const u = this.authService1.getUser();
      console.log(u.profile.sub);
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
      this.populateCounter--;
      this.currentOrgId = this.user.OrgID;
      if (localStorage.getItem('selectedOrgId') !== null) {
        this.currentOrgId = localStorage.getItem('selectedOrgId');
        // Get Default TimeZone
        console.log('Set Default Timezone');
        this.organizationService.getWQXOrganizationById(this.currentOrgId).subscribe(
          (result) => {
            if (result !== null) {
              if (result.defaultTimezone !== null || result.defaultTimezone !== undefined) {
                this.txtTimeZone = result.defaultTimezone;
              }
            }
          },
        );

      }
      if (this.user !== null && this.currentOrgId !== null) {

      }

    }
    /* this.authService.onTokenChange()
      .subscribe(
        (token: NbAuthJWTToken) => {
          if (token.isValid()) {
            this.user = token.getPayload(); // here we receive a payload from the token and assigns it to our `user` variable
          }
        },
        (err) => {
          this.populateCounter--;
        },
        () => {
          this.populateCounter--;
        },
      ); */
  }

  ngOnInit() {


    this.resultCols = [
      { 'col': 'Characteristic', show: true },
      { 'col': 'Taxonomy', show: true },
      { 'col': 'Result', show: true },
      { 'col': 'Unit', show: true },
      { 'col': 'Detection Limit', show: true },
      { 'col': 'Analytical Method', show: true },
      { 'col': 'Samp Fraction', show: true },
      { 'col': 'Value Type', show: true },
      { 'col': 'Status', show: true },
      { 'col': 'Lab Analysis Date', show: true },
      { 'col': 'PQL', show: true },
      { 'col': 'Lower Quant Limit', show: true },
      { 'col': 'Upper Quant Limit', show: true },
      { 'col': 'Biological Intent', show: true },
      { 'col': 'Frequency Class', show: true },
      { 'col': 'Comment', show: true },
    ];
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
    console.log('display warning if no reference data imported yet');
    this.refDataService.GetT_WQX_REF_DATA_Count()
      .pipe(
        finalize(() => {
          this.populateCounter--;
        }),
      )
      .subscribe(
        (result) => {
          console.log(result);
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
    console.log('redirect to org settings page if no org chars defined yet');
    this.refDataService.GetT_WQX_REF_CHAR_ORG_Count(this.currentOrgId)
      .pipe(
        finalize(() => {
          this.populateCounter--;
        }),
      )
      .subscribe(
        (result) => {
          console.log(result);
          if (result === 0) {
            this.lblMsg = 'You must define the characteristics that your organization will use (Organization screen) before you can enter sample data.';
            this.lblMsgShow = true;
          }
        },
        (err) => {
          console.log(err);
        },
      );

    // ONLY ALLOW EDIT FOR AUTHORIZED USERS OF ORG
    console.log('ONLY ALLOW EDIT FOR AUTHORIZED USERS OF ORG');
    this.organizationService.CanUserEditOrg(this.user.userIdx, this.currentOrgId)
      .pipe(
        finalize(() => {
          this.populateCounter--;
        }),
      )
      .subscribe(
        (result) => {
          console.log(result);
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
  onSubmit(f) {
    /*     console.log(f);
        return; */
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
            this.toasterService.success('Record updated succesfully.');
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

    console.log('populateResultsGrid');
    this.refDataService.GetT_WQX_REF_CHARACTERISTIC_ByOrg(this.currentOrgId, false).subscribe(
      (data: WqxRefCharacteristic[]) => {
        if (data !== null && data !== undefined) {
          this.charNameList.push({ label: '', value: null });
          data.forEach(obj => {
            this.charNameList.push({ label: obj.charName, value: obj.charName });
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
          this.bioSubjectTaxonomyList.push({ label: '', value: null });
          data.forEach(obj => {
            this.bioSubjectTaxonomyList.push({ label: obj.text, value: obj.value });
          });
          /* const newSettings = this.activitySetting;
          newSettings.columns.bioSubjectTaxonomy.editor.config.list = this.bioSubjectTaxonomyList;
          this.activitySetting = Object.assign({}, newSettings); */

          // localStorage.setItem('charNameListLS', JSON.stringify(this.charNameList));
        }
      },
      (err) => {
        console.log(err);
      },
    );
    this.refDataService.GetT_WQX_REF_DATA('MeasureUnit', true, true).subscribe(
      (data: WqxRefData[]) => {
        if (data !== null && data !== undefined) {
          this.unitList.push({ label: '', value: null });
          data.forEach(obj => {
            this.unitList.push({ label: obj.text, value: obj.value });
          });
        }
      },
      (err) => {
        console.log(err);
      },
    );
    this.refDataService.GetT_WQX_REF_ANAL_METHOD(true).subscribe(
      (data: AnalMethodDisplay[]) => {
        if (data !== null && data !== undefined) {
          this.analMethodList.push({ label: '', value: null });
          data.forEach(obj => {
            this.analMethodList.push({ label: obj.analMethodDisplayName, value: obj.analytiC_METHOD_IDX });
          });
        }
      },
    );
    this.refDataService.GetT_WQX_REF_DATA('ResultSampleFraction', true, true).subscribe(
      (data: WqxRefData[]) => {
        if (data !== null && data !== undefined) {
          this.sampFractionList.push({ label: '', value: null });
          data.forEach(obj => {
            this.sampFractionList.push({ label: obj.value, value: obj.text });
          });
        }
      },
      (err) => {
        console.log(err);
      },
    );
    this.refDataService.GetT_WQX_REF_DATA('ResultValueType', true, true).subscribe(
      (data: WqxRefData[]) => {
        if (data !== null && data !== undefined) {
          this.valueTypeList.push({ label: '', value: null });
          data.forEach(obj => {
            this.valueTypeList.push({ label: obj.value, value: obj.value });
          });
        }
      },
      (err) => {
        console.log(err);
      },
    );
    this.refDataService.GetT_WQX_REF_DATA('ResultStatus', true, true).subscribe(
      (data: WqxRefData[]) => {
        if (data !== null && data !== undefined) {
          this.statusList.push({ label: '', value: null });
          data.forEach(obj => {
            this.statusList.push({ label: obj.value, value: obj.value });
          });
        }
      },
      (err) => {
        console.log(err);
      },
    );
    this.refDataService.GetT_WQX_REF_DATA('BiologicalIntent', true, true).subscribe(
      (data: WqxRefData[]) => {
        if (data !== null && data !== undefined) {
          this.bioIntentList.push({ label: '', value: null });
          data.forEach(obj => {
            this.bioIntentList.push({ label: obj.value, value: obj.value });
          });
        }
      },
      (err) => {
        console.log(err);
      },
    );
    this.refDataService.GetT_WQX_REF_DATA('FrequencyClassDescriptor', true, true).subscribe(
      (data: WqxRefData[]) => {
        if (data !== null && data !== undefined) {
          this.freqClassList.push({ label: '', value: null });
          data.forEach(obj => {
            this.freqClassList.push({ label: obj.value, value: obj.value });
          });
        }
      },
      (err) => {
        console.log(err);
      },
    );
    this.activityService.GetT_WQX_RESULT(this.activityIdx).subscribe(
      (data) => {
        // this.results = new LocalDataSource(data);
        this.results = data;
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

  onRowEditInit(result: WqxResult) {
    // this.clonedCars[car.vin] = { ...car };
  }
  onRowDelete(result: WqxResult) {
    this.refDataService.DeleteT_WQX_RESULT(result.resultIdx).subscribe(
      (result2) => {
        if (result2 > 0) {
          this.populateResultsGrid();
        } else {
          this.toasterService.danger('Record could not be deleted!');
        }
      },
      (err2) => {
        console.log(err2);
        this.toasterService.danger('Record could not be deleted!');
      },
    );
  }
  onRowEditSave(result: WqxResult) {
    console.log('onRowEditSave');
    console.log(result);
    // ***VALIDATION***
    let isValid: boolean = true;
    if (isNaN(+result.resultMsr) === true ||
      result.resultMsr === 'ND' ||
      result.resultMsr === 'NR' ||
      result.resultMsr === 'PAQL' ||
      result.resultMsr === 'PBQL' ||
      result.resultMsr === 'DNQ') {
      isValid = false;
      this.toasterService.danger('Result must be numeric, or one of the following values: ND, NR, PAQL, PBQL, DNQ');
    } else {
      // if numeric, then check if result is within valid range (if available for the char/unit pairing)
      if (isNaN(+result.resultMsr) === false) {
        this.refDataService.GetT_WQX_REF_CHAR_LIMITS_ByNameUnit(result.charName, result.resultMsrUnit).subscribe(
          (data: WqxRefCharLimits) => {
            if (data !== null && data !== undefined) {
              if ((+result.resultMsr < data.lowerBound) || (+result.resultMsr > data.upperBound)) {
                isValid = false;
                this.toasterService.danger('Result value is outside acceptable range. " + cl.LOWER_BOUND + " - " + cl.UPPER_BOUND + " Please provide another value and save again.');
              }
            }
          },
        );
      }
    }
    if (isValid) {
      const r = result;
      this.refDataService.InsertOrUpdateT_WQX_RESULT(
        r.resultIdx, r.activityIdx,
        (r.resultDetectCondition === null) ? '' : r.resultDetectCondition,
        (r.charName === null) ? '' : encodeURIComponent(r.charName),
        (r.resultSampFraction === null) ? '' : r.resultSampFraction,
        (r.resultMsr === null) ? '' : r.resultMsr,
        (r.resultMsrUnit === null) ? '' : encodeURIComponent(r.resultMsrUnit),
        (r.resultStatus === null) ? '' : encodeURIComponent(r.resultStatus),
        (r.resultValueType === null) ? '' : encodeURIComponent(r.resultValueType),
        (r.resultComment === null) ? '' : r.resultComment,
        (r.bioIntentName === null) ? '' : encodeURIComponent(r.bioIntentName),
        (r.bioIndividualId === null) ? '' : r.bioIndividualId,
        (r.bioSubjectTaxonomy === null) ? '' : encodeURIComponent(r.bioSubjectTaxonomy),
        (r.bioSampleTissueAnatomy === null) ? '' : r.bioSampleTissueAnatomy,
        (r.analyticMethodIdx === null) ? 0 : r.analyticMethodIdx,
        (r.labIdx === null) ? 0 : r.labIdx,
        (r.labAnalysisStartDt === null) ? '' : r.labAnalysisStartDt.toUTCString(),
        (r.detectionLimit === null) ? '' : r.detectionLimit,
        (r.pql === null) ? '' : r.pql,
        (r.lowerQuantLimit === null) ? '' : r.lowerQuantLimit,
        (r.upperQuantLimit === null) ? '' : r.upperQuantLimit,
        (r.labSampPrepIdx === null) ? 0 : r.labSampPrepIdx,
        (r.labSampPrepStartDt === null) ? '' : r.labSampPrepStartDt,
        (r.dilutionFactor === null) ? '' : r.dilutionFactor,
        (r.freqClassCode === null) ? '' : encodeURIComponent(r.freqClassCode),
        (r.freqClassUnit === null) ? '' : encodeURIComponent(r.freqClassUnit),
        this.user.name).subscribe(
          (result2) => {
            if (result2 > 0) {
              // also update activity to set to "U" so it will be flagged for submission to EPA
              this.activityService.UpdateWQX_ACTIVITY_WQXStatus(this.activityIdx, 'U', true, true, this.user.name).subscribe(
                (result3) => {
                  this.populateResultsGrid();
                },
                (err3) => {
                  console.log(err3);
                  this.toasterService.danger('Error saving update.');
                },
              );
            } else {
              this.toasterService.danger('Error saving update.');
            }
          },
          (err2) => {
            console.log(err2);
            this.toasterService.danger('Error saving update.');
          },
        );
    } else {
      this.toasterService.danger('Validation failed.');
    }
  }

  onRowEditCancel(result: WqxResult, index: number) {
    // this.cars2[index] = this.clonedCars[car.vin];
    // delete this.clonedCars[car.vin];
  }

  checkColShow(col: string): boolean {
    return (this.resultCols.find(e => e.col === col) === undefined) ? false : (this.resultCols.find(e => e.col === col).show);
  }
  newRow() {
    const nr: WqxResult = {
      resultIdx: 0,
      activityIdx: this.activityIdx,
      dataLoggerLine: '',
      resultDetectCondition: '',
      charName: '',
      methodSpeciationName: '',
      resultSampFraction: '',
      resultMsr: '',
      resultMsrUnit: '',
      resultMsrQual: '',
      resultStatus: '',
      statisticBaseCode: '',
      resultValueType: '',
      weightBasis: '',
      timeBasis: '',
      tempBasis: '',
      particlesizeBasis: '',
      precisionValue: '',
      biasValue: '',
      confidenceIntervalValue: '',
      upperConfidenceLimit: '',
      lowerConfidenceLimit: '',
      resultComment: '',
      depthHeightMsr: '',
      depthHeightMsrUnit: '',
      depthaltituderefpoint: '',
      resultSampPoint: '',
      bioIntentName: '',
      bioIndividualId: '',
      bioSubjectTaxonomy: '',
      bioUnidentifiedSpeciesId: '',
      bioSampleTissueAnatomy: '',
      grpSummCountWeightMsr: '',
      grpSummCountWeightMsrUnit: '',
      taxDtlCellForm: '',
      taxDtlCellShape: '',
      taxDtlHabit: '',
      taxDtlVoltinism: '',
      taxDtlPollTolerance: '',
      taxDtlPollToleranceScale: '',
      taxDtlTrophicLevel: '',
      tTaxDtlFuncFeedingGroup1: '',
      taxDtlFuncFeedingGroup2: '',
      taxDtlFuncFeedingGroup3: '',
      freqClassCode: '',
      freqClassUnit: '',
      freqClassUpper: '',
      freqClassLower: '',
      analyticMethodIdx: 0,
      labIdx: 0,
      labAnalysisStartDt: null,
      labAnalysisEndDt: '',
      labAnalysisTimezone: '',
      resultLabCommentCode: '',
      detectionLimitType: '',
      detectionLimit: '',
      labTaxonAccredInd: '',
      labTaxonAccredAuthority: '',
      labReportingLevel: '',
      pql: '',
      lowerQuantLimit: '',
      upperQuantLimit: '',
      detectionLimitUnit: '',
      labSampPrepIdx: 0,
      labSampPrepStartDt: '',
      labSampPrepEndDt: '',
      dilutionFactor: '',
    };
    return nr;
  }
}
