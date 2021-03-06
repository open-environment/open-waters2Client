import { Component, OnInit } from '@angular/core';
import { User } from '../../../../@core/data/users';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { WqxRefData } from '../../../../@core/wqx-data/wqx-refdata';
import { WQXRefDataService } from '../../../../@core/wqx-services/wqx-refdata-service';
import { WQXProjectService } from '../../../../@core/wqx-services/wqx-project-service';
import { ActivatedRoute, Router } from '@angular/router';
import { WqxProject } from '../../../../@core/wqx-data/wqx-project';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-wqx-project-edit',
  templateUrl: './wqx-project-edit.component.html',
  styleUrls: ['./wqx-project-edit.component.scss'],
})
export class WqxProjectEditComponent implements OnInit {

  user: User;
  currentOrgId: string;

  txtProjName: string = '';
  txtProjID: string = '';
  txtProjDesc: string = '';
  txtQAPPAgency: string = '';
  chkActInd: boolean = false;
  chkWQXInd: boolean = false;
  chkQAPPInd: boolean = false;

  sampDesignTypeCodes: WqxRefData[] = [];
  sampDesignTypeCodeSelected: string = '';
  projectIdx: number = 0;
  constructor(private authService: NbAuthService,
    private refDataService: WQXRefDataService,
    private projectService: WQXProjectService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toasterSerivice: NbToastrService) {
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        this.user = token.getPayload(); // here we receive a payload from the token and assigns it to our `user` variable
        this.currentOrgId = this.user.OrgID;
        // populate drop-downs
        this.populateDropdowns();

      }
    });
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.projectIdx = parseInt(params['projectIdx'], 10);
      if (this.projectIdx > 0 && this.currentOrgId !== '') {

        // ******************* Populate project information on form
        this.populateProject();
      } else {
        this.chkActInd = true;
        this.chkWQXInd = true;
      }
    });
  }

  populateProject() {

    this.projectService.GetWQX_PROJECT_ByID(this.projectIdx).subscribe(
      (data: WqxProject) => {
        this.txtProjID = data.projectId;
        this.txtProjName = data.projectName;
        this.txtProjDesc = data.projectDesc;
        this.sampDesignTypeCodeSelected = data.sampDesignTypeCd;
        this.chkQAPPInd = data.qappApprovalInd;
        this.chkWQXInd = data.wqxInd;
        this.chkActInd = data.actInd;
      },
      (err) => { console.log(err); },
    );
  }
  populateDropdowns(): void {
    this.refDataService.GetT_WQX_REF_DATA('SamplingDesignType', true, true).subscribe(
      (data) => {
        this.sampDesignTypeCodes = data;
      },
      (err) => { console.log(err); },
    );
  }
  onSaveAndExitClicked(): void {
    console.log('onSaveAndExitClicked');
  }
  onCancelClicked(): void {
    console.log('onCancelClicked');
    this.router.navigate(['/secure/water-quality/wqx-project']);
  }
  onSampDesignTypeCodeSelect(selectedItem): void {
    this.sampDesignTypeCodeSelected = selectedItem;
  }
  onSubmit(): void {
    this.projectService.InsertOrUpdateWQX_PROJECT(this.projectIdx, this.currentOrgId, this.txtProjID,
      this.txtProjName, this.txtProjDesc, this.sampDesignTypeCodeSelected, this.chkQAPPInd,
      this.txtQAPPAgency, 'U', '', this.chkActInd, this.chkWQXInd, this.user.name).subscribe(
        (result) => {
          if (result > 0) {
            this.router.navigate(['/secure/water-quality/wqx-project']);
          } else {
            this.toasterSerivice.danger('Error updating record.');
          }
        },
        (err) => {
          this.toasterSerivice.danger('Error updating record.');
        },
      );
  }
}
