import { Component } from '@angular/core';
import { WqxOrganization } from '../../@core/wqx-data/wqx-organization';
import { User } from '../../@core/data/users';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { WQXOrganizationService } from '../../@core/wqx-services/wqx-organization-service';
import { WQXProjectService } from '../../@core/wqx-services/wqx-project-service';
import { WQXActivityService } from '../../@core/wqx-services/wqx-activity-service';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-ecommerce',
  templateUrl: './e-commerce.component.html',
  styleUrls: ['./e-commerce.component.scss'],
})
export class ECommerceComponent {
  currentUser: User;
  myOrgusers: WqxOrganization[];
  lblOrg: string;
  lblOrgName: string;
  lblProject2: string;
  lblSamp: string;
  lblSampPend2: string;
  lblResult: string;
  // private UserIDX: '1';
  // private excludePendingInd: false;
  // tslint:disable-next-line: one-line
  lblWiz1: string;
  btnWiz1: string = 'Get Started';
  pnlOrgSpecificShow: boolean;
  lblWiz1Show: boolean = true;
  btnWiz1Show: boolean = true;

  lblWiz2: string;
  btnWiz2: string = 'Get Started';
  lblWiz2Show: boolean = true;
  btnWiz2Show: boolean = true;

  lblWiz3: string;
  btnWiz3: string = 'Enter';
  lblWiz3Show: boolean = true;
  btnWiz3Show: boolean = true;
  btnWiz3bShow: boolean = true;

  lblWiz4: string;
  btnWiz4: string = 'Enter';
  lblWiz4Show: boolean = true;
  btnWiz4Show: boolean = true;
  btnWiz4bShow: boolean = true;

  lblWiz5: string;
  lblWiz5Show: boolean = true;
  btnWiz5Show: boolean = true;

  lblWiz6: string;
  btnWiz6: string = 'Enter';
  lblWiz6Show: boolean = true;
  btnWiz6Show: boolean = true;
  btnWiz6bShow: boolean = true;

  monLocOk: boolean = false;
  projOk: boolean = false;
  settings = {
    actions: {
      custom: [
        {
          name: 'Approve',
          title: 'Approve',
        },
        {
          name: 'Reject',
          title: 'Reject',
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
    columns: {
      useR_ID: {
        title: 'User ID',
        type: 'string',
        filter: false,
      },
      orG_ID: {
        title: 'Organization',
        type: 'string',
        filter: false,
      },
    },
    noDataMessage: 'No Admin tasks at this time.',
  };

  source: LocalDataSource = new LocalDataSource();
  constructor(private organizationService: WQXOrganizationService,
    private projectService: WQXProjectService,
    private activityService: WQXActivityService,
    private authService: NbAuthService,
    private router: Router) {

    // *******************************************************************************
    // ************* Data Collection Metrics Panel ***********************************
    // *******************************************************************************

    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {
          this.currentUser = token.getPayload();
          if (this.currentUser.OrgID !== null || this.currentUser.OrgID !== '') {
            this.pnlOrgSpecificShow = true;

            this.organizationService.GetWQX_ORGANIZATION_ByID(this.currentUser.OrgID)
              .subscribe((x) => { this.lblOrgName = x.orgFormalName; });
            this.projectService.GetWQX_PROJECTS()
              .subscribe((x) => this.lblProject2 = x.length.toString());
            this.activityService.GetWQX_Activities(true, this.currentUser.OrgID, 0, '', '', '', false, 0)
              .subscribe((x) => { this.lblSamp = x.length.toString(); });
            this.activityService.GetWQX_Activities(true, this.currentUser.OrgID, 0, '', '', '', true, 0)
              .subscribe((x) => { this.lblSampPend2 = x.length.toString(); });
            this.activityService.GetT_WQX_RESULTCount(this.currentUser.OrgID)
              .subscribe(
                (x) => { this.lblResult = x.toString(); },
                (er) => { console.log(er); },
              );
          } else {
            this.pnlOrgSpecificShow = false;
          }

          // ****************************************************************************
          // **************Admin Tasks Panel ***************************************
          // ****************************************************************************
          this.bindAdminTaskData();

          this.organizationService.getVWQXAllOrgs().subscribe(
            (result) => { this.lblOrg = result.length.toString(); },
          );

          // ****************************************************************************
          // **************Getting started wizard ***************************************
          // ****************************************************************************

          // STEP 1 ***********************************
          this.organizationService.GetWQX_USER_ORGS_ByUserIDX(this.currentUser.userIdx, false).subscribe((o1s) => {
            this.myOrgusers = o1s;
            if (o1s.length === 0) {
              this.lblWiz1Show = true;
              this.lblWiz1 = 'To use Open Waters, you must first be linked with an Organization. This is the water monitoring agency you represent. If you intend to submit your data to EPA, this organization must first be created by EPA in their WQX system. Otherwise, if you never intend to submit your data to EPA, you can create any Organization ID you wish.';
              this.btnWiz1Show = true;
              this.btnWiz2Show = false;
              this.btnWiz3Show = false;
              this.btnWiz3bShow = false;
              this.btnWiz4Show = false;
              this.btnWiz5Show = false;
              this.btnWiz6Show = false;
              this.btnWiz6bShow = false;
            } else {
              this.organizationService.GetWQX_USER_ORGS_ByUserIDX(this.currentUser.userIdx, true).subscribe((oNotPends) => {
                if (oNotPends.length === 0) {
                  // only organization user is associated with is pending
                  this.btnWiz1Show = false;
                  this.lblWiz1 = 'Your request to view/submit data for an organization is pending. You must wait for an administrator to approve your request.';
                  this.btnWiz2Show = false;
                  this.btnWiz3Show = false;
                  this.btnWiz3bShow = false;
                  this.btnWiz4Show = false;
                  this.btnWiz4bShow = false;
                  this.btnWiz5Show = false;
                  this.btnWiz6Show = false;
                  this.btnWiz6bShow = false;

                } else {
                  // STEP 1 IS COMPLETE, now try out tests 2-6
                  this.btnWiz1 = 'View';
                  this.lblWiz1 = 'Congrats! You are associated with an Organization. Click to view its details.';

                  // STEP 2: submit authorization ******************************************
                  oNotPends.forEach(element => {
                    if (element.cdxSubmitInd === true) {
                      this.lblWiz2 = 'Congrats! Your organization is authorized to submit to EPA-WQX.';
                      this.btnWiz2 = 'Change Credentials';
                    } else {
                      this.lblWiz2 = 'In order to submit data to EPA using Open Waters, you must contact EPA and request that they authorize Open Waters to submit data.';
                      this.btnWiz2 = 'Get Started';
                    }
                  });

                  // STEP 3:Mon Loc******************************************
                  this.projectService.GetWQXMonlocMyOrgCount(+this.currentUser.UserIDX).subscribe(
                    (result) => {
                      if (result > 0) {
                        this.lblWiz3Show = true;
                        this.btnWiz3Show = true;
                        this.lblWiz3 = 'One or more monitoring locations have been created. Click to view.';
                        this.btnWiz3 = 'View';
                        this.monLocOk = true;
                      } else {
                        this.lblWiz3 = 'Click to enter a monitoring location record.';
                      }
                    },
                  );

                  // STEP 4:Project ******************************************
                  this.projectService.GetWQXProjectMyOrgCount(+this.currentUser.UserIDX).subscribe(
                    (result) => {
                      if (result > 0) {
                        this.lblWiz4 = 'One or more projects have been created. Click to view.';
                        this.btnWiz4 = 'View';
                        this.projOk = true;
                      } else {
                        this.lblWiz4 = 'Click to manually enter a project record or import records from a spreadsheet or EPA.';
                      }
                    },
                  );

                  // STEP 5: Organization Starter Data ******************************************

                  if (oNotPends[0].defaultTimezone === null || oNotPends[0].defaultTimezone === '') {
                    this.lblWiz5 = 'Click to enter default organization data (e.g. Default Timezone, characteristics) that will be helpful during activity data entry.';
                  } else {
                    this.lblWiz5 = 'Organization default data (e.g. Default Timezone) has been defined. Click to view.';
                  }

                  // STEP 6: Activity ******************************************
                  if (this.projOk === true && this.monLocOk === true) {
                    this.lblWiz6 = 'You must enter a monitoring location and a project before you begin to create activities.';
                    this.btnWiz6Show = false;
                  } else {
                    this.activityService.getWQXActivityMyOrgCount(+this.currentUser.UserIDX).subscribe(
                      (result) => {
                        if (result > 0) {
                          this.lblWiz6 = 'One or more activities have been created. Click to view.';
                          this.btnWiz6 = 'View';
                        } else {
                          this.lblWiz6 = 'Click to enter an activity record.';
                        }
                      },
                    );
                  }

                }
              });
            }
          });
        }
      });


  }
  Step1GetStarted() {
    console.log('route');
  }

  bindAdminTaskData() {
    this.organizationService.getAdminTaskData(this.currentUser.name, this.currentUser.OrgID)
      .subscribe(
        (_data) => {
          this.source.load(_data);
        },
      );
  }
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onCustom(event): void {
    let ApproveRejectCode = '';
    if (event.action === 'Approve') {
      ApproveRejectCode = 'U';
    } else if (event.action === 'Reject') {
      ApproveRejectCode = 'R';
    } else {
      // do nothing
    }
    if (ApproveRejectCode !== '') {
      this.organizationService.ApproveRejectTWqxUserOrgs(this.currentUser.OrgID, +this.currentUser.UserIDX, ApproveRejectCode)
        .subscribe(
          (_result) => { console.log(_result); },
          (_err) => { console.log(_err); },
        );
    }
    // const orgId = event.data.orgId;
    // this.router.navigate(['/wqx-pages/main/wqx-org-new-cs', {orgId: orgId}]);
  }
  onBtnWiz1Click() {
    if (this.btnWiz1 === 'View') {
      this.router.navigate(['/secure/water-quality/wqx-org']);
    } else {
      this.router.navigate(['/secure/main/wqx-org-new']);
    }

    // this.router.navigate(['/secure/main/wqx-org-new'], { queryParams: { orgEditId: -1 } });
  }
  onBtnWiz2Click() {
    console.log('onBtnWiz2Click clicked!');
  }
  onBtnWiz3Click() {
    this.router.navigate(['/secure/water-quality/wqx-monloc']);
  }
  onBtnWiz3bClick() {
    this.router.navigate(['/secure/water-quality/wqx-import']);
  }
  onBtnWiz4Click() {
    this.router.navigate(['/secure/water-quality/wqx-project']);
  }
  onBtnWiz4bClick() {
    this.router.navigate(['/secure/water-quality/wqx-import']);
  }
  onBtnWiz5Click() {
    this.router.navigate(['/secure/water-quality/wqx-org-data']);
  }
  onBtnWiz6Click() {
    this.router.navigate(['/secure/water-quality/wqx-activity']);
  }
  onBtnWiz6bClick() {
    this.router.navigate(['/secure/water-quality/wqx-import']);
  }
}
