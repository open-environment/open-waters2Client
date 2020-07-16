import { Component, OnInit } from '@angular/core';
import { WqxMonloc } from '../../../../@core/wqx-data/wqx-monloc';
import { WqxProject } from '../../../../@core/wqx-data/wqx-project';
import { WqxRefData } from '../../../../@core/wqx-data/wqx-organization';
import { WqxRefSampColMethod } from '../../../../@core/wqx-data/wqx-refdata';
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
import { WqxActivity } from '../../../../@core/wqx-data/wqx-activity';

@Component({
  selector: 'ngx-wqx-activity-edit',
  templateUrl: './wqx-activity-edit.component.html',
  styleUrls: ['./wqx-activity-edit.component.scss'],
})
export class WqxActivityEditComponent implements OnInit {

  populateCounter: number = 12; // when data is loaded counter is decremented by 1
  populateCounterHandle: any;

  user: User;
  currentOrgId: string;

  lblMsg: string = '';
  lblMsgShow: boolean = false;
  txtActivityID: string;
  chkActInd: boolean = true;
  txtStartDate = new Date();
  txtEndDate = new Date();
  monlocs: WqxMonloc[] = [];
  monlocSelected: string;
  projects: WqxProject[] = [];
  projectSelected: string;
  chkWQXInd: boolean = true;
  activityTypes: WqxRefData[] = [];
  activityTypeSelected: string;
  activityMedias: WqxRefData[] = [];
  activityMediaSelected: string;
  activitySubMedias: WqxRefData[] = [];
  activitySubMediaSelected: string;
  sampCalls: WqxRefSampColMethod[] = [];
  sampCollSelected: string;
  txtDepth: string;
  depthUnitSelected: string = '';
  equipSelected: string;
  equips: WqxRefData[] = [];
  txtActComments: string;
  assemblageSelected: string;
  assemblages: WqxRefData[] = [];
  txtSamplingComponent: string;
  txtBioDuration: string;
  bioDurUnitSelected: string;
  txtSampComponentSeq: string;
  entryTypeSelected: string;
  lblModifyDate: string;
  canUserEdit: Boolean = false;
  activityIdx: number;
  showResults: boolean = false;

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
      this.populateCounterHandle = setInterval(() => {
        console.log(this.populateCounter);
        if (this.populateCounter === 0) {
          clearInterval(this.populateCounterHandle);
          this.populateData(true);
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
    console.log('populate data called!' + this.activityIdx);
    if (this.activityIdx !== null && this.activityIdx > 0) {
      this.activityService.GetWQX_ACTIVITY_ByID(this.activityIdx).subscribe(
        (data: WqxActivity) => {
          console.log(data);
          this.txtActivityID = data.activityId;
          this.txtStartDate = new Date(data.actStartDt);
          // timezone???
          console.log('monlocIDX: ' + data.monlocIdx);
          console.log('projectIDX: ' + data.projectIdx);
          this.monlocSelected = (data.monlocIdx !== null && data.monlocIdx !== undefined) ? data.monlocIdx.toString() : '';
          this.projectSelected = (data.projectIdx !== null && data.projectIdx !== undefined) ? data.projectIdx.toString() : '';
          if (data.actInd !== null) this.chkActInd = data.actInd;
          if (data.wqxInd !== null) this.chkWQXInd = data.wqxInd;

          console.log('populate activity tab');
          // populate activity tab
          this.activityTypeSelected = data.actType;
          this.activityMediaSelected = data.actMedia;
          this.activitySubMediaSelected = data.actSubMedia;
          if (data.actEndDt !== null) this.txtEndDate = new Date(data.actEndDt);
          this.txtDepth = data.actDepthHeightMSR;
          this.depthUnitSelected = data.actDepthHeightMSRUnit;
          this.equipSelected = data.sampCallEquip;
          this.sampCollSelected = (data.sampCollMethodIdx !== null) ? data.sampCollMethodIdx.toString() : '';
          this.txtActComments = data.actComment;

          console.log('populate bio tab');
          // populate bio tab
          this.assemblageSelected = data.bioAssemblageSample;
          this.txtBioDuration = data.bioDurationMSR;
          this.bioDurUnitSelected = data.bioDurationMSRUnit;
          this.txtSamplingComponent = data.bioSampComponent;
          this.txtSampComponentSeq = data.bioSampComponentSeq;
          if (data.entryType !== null) {
            this.entryTypeSelected = data.entryType;
          } else {
            this.entryTypeSelected = 'C';
          }
        },
      );
    }
  }
  onSubmit() {
    console.log('submit called');
    const actId: number = isNaN(this.activityIdx) ? 0 : this.activityIdx;
    const projIdx: number = isNaN(+this.projectSelected) ? 0 : +this.projectSelected;
    const monlocIdx: number = isNaN(+this.monlocSelected) ? 0 : +this.monlocSelected;
    const sampCompSeq: number = isNaN(+this.txtSampComponentSeq) ? 0 : +this.txtSampComponentSeq;
    const sampColl: number = isNaN(+this.sampCollSelected) ? 0 : +this.sampCollSelected;
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
  onExitClicked() {
    this.router.navigate(['../wqx-activity'], { relativeTo: this.activatedRoute });
  }
}
