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

@Component({
  selector: 'ngx-wqx-activity-edit',
  templateUrl: './wqx-activity-edit.component.html',
  styleUrls: ['./wqx-activity-edit.component.scss'],
})
export class WqxActivityEditComponent implements OnInit {

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



  constructor(private authService: NbAuthService,
    private pubSubService: WqxPubsubServiceService,
    private refDataService: WQXRefDataService,
    private organizationService: WQXOrganizationService,
    private monlocService: WqxMonlocService,
    private projectService: WQXProjectService) {
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        this.user = token.getPayload(); // here we receive a payload from the token and assigns it to our `user` variable
        this.currentOrgId = this.user.OrgID;
        if (this.user !== null && this.currentOrgId !== null) {
          this.populateData(true);
        }
        /* this.pubSubService.activityChkData.subscribe((data: WqxActivityConfig[]) => {
          this.onConfigSaved(data);
        }); */
      }
    });
  }

  ngOnInit() {
    // display warning if no reference data imported yet
    this.refDataService.GetT_WQX_REF_DATA_Count().subscribe(
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
    this.refDataService.GetT_WQX_REF_CHAR_ORG_Count(this.currentOrgId).subscribe(
      (result) => {
        if (result === 0) {
          this.lblMsg = 'You must define the characteristics that your organization will use (Organization screen) before you can enter sample data.';
          this.lblMsgShow = true;
        }
      },
    );

    // ONLY ALLOW EDIT FOR AUTHORIZED USERS OF ORG
    this.organizationService.CanUserEditOrg(this.user.userIdx, this.currentOrgId).subscribe(
      (result) => {
        this.canUserEdit = result;
      },
      (err) => { console.log(err); },
    );

    // populate drop-downs - sample level
    this.refDataService.GetT_WQX_REF_DATA('ActivityType', true, true).subscribe(
      (data) => {
        this.activityTypes = data;
      },
    );
    this.refDataService.GetT_WQX_REF_DATA('ActivityMedia', true, true).subscribe(
      (data) => {
        this.activityMedias = data;
      },
    );
    this.refDataService.GetT_WQX_REF_DATA('ActivityMediaSubdivision', true, true).subscribe(
      (data) => {
        this.activitySubMedias = data;
      },
    );
    this.refDataService.GetT_WQX_REF_DATA('SampleCollectionEquipment', true, true).subscribe(
      (data) => {
        this.equips = data;
      },
    );
    this.refDataService.GetT_WQX_REF_DATA('Assemblage', true, true).subscribe(
      (data) => {
        this.assemblages = data;
      },
    );
    this.monlocService.GetWQX_MONLOC(true, this.currentOrgId, false).subscribe(
      (data) => {
        this.monlocs = data;
      },
    );
    this.projectService.GetWQX_PROJECT(true, this.currentOrgId, false).subscribe(
      (data) => {
        console.log(data);
        this.projects = data;
      },
      (err) => {
        console.log(err);
      },
    );
    this.refDataService.GetT_WQX_REF_SAMP_COL_METHOD_ByContext(this.currentOrgId).subscribe(
      (data) => {
        this.sampCalls = data;
      },
    );
  }

  populateData(isFirst: boolean) {

  }
  onSubmit() {

  }
}
