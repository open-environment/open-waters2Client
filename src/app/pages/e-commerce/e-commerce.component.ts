import { Component, NgModule, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { WqxOrganization, UserOrgDisplay } from '../../@core/wqx-data/wqx-organization';
import { User } from '../../@core/data/users';
import { WQXOrganizationService } from '../../@core/wqx-services/wqx-organization-service';
import { WQXProjectService } from '../../@core/wqx-services/wqx-project-service';
import { WQXActivityService } from '../../@core/wqx-services/wqx-activity-service';
import { Router } from '@angular/router';
import { WqxPubsubServiceService } from '../../@core/wqx-services/wqx-pubsub-service.service';
import { NbStepperComponent, NbToastrService } from '@nebular/theme';
import { AuthService } from '../../@core/auth/auth.service';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
@Component({
  selector: 'ngx-ecommerce',
  templateUrl: './e-commerce.component.html',
  styleUrls: ['./e-commerce.component.scss'],
})
export class ECommerceComponent {
  @ViewChild('stepper', { static: true }) stepper: NbStepperComponent;
  disableStepNavigation = true;
  stepButton: string = 'Enable Step Navigation';

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
  isAdminTaskShow: string = '';
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

  _userOrgDisplay: UserOrgDisplay[];
  cols: any[];

  constructor(private organizationService: WQXOrganizationService,
    private projectService: WQXProjectService,
    private activityService: WQXActivityService,
    private router: Router,
    private pubSubService: WqxPubsubServiceService,
    private toasterService: NbToastrService,
    private authService1: AuthService) {
    console.log('dashboard: constructor called...');

    this.cols = [
      { field: 'useR_ID', header: 'User ID' },
      { field: 'orG_ID', header: 'Organization' },
    ];

    // *******************************************************************************
    // ************* Data Collection Metrics Panel ***********************************
    // *******************************************************************************
    console.log('OIDC');
    if (this.authService1.isAuthenticated() === true) {
      const u = this.authService1.getUser();
      console.log(u.profile.sub);
      // this.currentUser = token.getPayload();
      // TODO: need to fix this
      if (this.currentUser === undefined || this.currentUser === null)
        this.currentUser = {
          userIdx: 0,
          name: '',
          picture: '',
          UserIDX: '',
          OrgID: '',
          isAdmin: '',
        };
      this.currentUser.userIdx = u.userIdx;
      this.currentUser.name = u.name;
      this.currentUser.OrgID = u.OrgID;
      this.currentUser.isAdmin = u.isAdmin;
      if (this.currentUser.isAdmin.toString() === 'true') {
        this.isAdminTaskShow = 'view';
      }
      if (this.currentUser.OrgID !== null || this.currentUser.OrgID !== '') {
        if (this.currentUser.OrgID === '-1') {
          /* this.authService.logout('email').subscribe(
            (result: NbAuthResult) => {
              const navigationExtras: NavigationExtras = { state: { data: 'You need authorization to access your current organization.' } };
              this.router.navigate(['/pages/miscellaneous/unauthorized'], navigationExtras);
            },
            (err) => { console.log(err); },
          ); */
        } else {
          console.log('setting default orgid to' + this.currentUser.OrgID);
          this.pubSubService.setOrgId(this.currentUser.OrgID);
          this.pnlOrgSpecificShow = true;
          this.PopulateOrgSpecific();
        }

      } else {
        this.pnlOrgSpecificShow = false;
      }
      this.organizationService.getVWQXAllOrgs().subscribe(
        (result) => { this.lblOrg = result.length.toString(); },
      );

      if ((this.currentUser.OrgID !== null ||
        this.currentUser.OrgID !== '') &&
        this.currentUser.OrgID !== '-1') {
        // ****************************************************************************
        // **************Admin Tasks Panel ***************************************
        // ****************************************************************************
        this.bindAdminTaskData();
      }
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
          this.organizationService.GetWQX_USER_ORGS_ByUserIDX(this.currentUser.userIdx, true).subscribe(
            (oNotPends) => {
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
                console.log('oNotPends');
                console.log(oNotPends);
                // STEP 1 IS COMPLETE, now try out tests 2-6
                this.btnWiz1 = 'View';
                this.lblWiz1 = 'Congrats! You are associated with an Organization. Click to view its details.';
                this.stepper.selectedIndex = 1;
                // STEP 2: submit authorization ******************************************
                oNotPends.forEach(element => {
                  if (element.cdxSubmitInd === true) {
                    this.lblWiz2 = 'Congrats! Your organization is authorized to submit to EPA-WQX.';
                    this.btnWiz2 = 'Change Credentials';
                    this.stepper.selectedIndex = 2;
                  } else {
                    this.lblWiz2 = 'In order to submit data to EPA using Open Waters, you must contact EPA and request that they authorize Open Waters to submit data.';
                    this.btnWiz2 = 'Get Started';
                  }
                });

                // STEP 3:Mon Loc******************************************
                this.projectService.GetWQXMonlocMyOrgCount(+this.currentUser.userIdx).subscribe(
                  (result) => {
                    if (result > 0) {
                      this.lblWiz3Show = true;
                      this.btnWiz3Show = true;
                      this.lblWiz3 = 'One or more monitoring locations have been created. Click to view.';
                      this.btnWiz3 = 'View';
                      this.monLocOk = true;
                      this.stepper.selectedIndex = 3;
                    } else {
                      this.lblWiz3 = 'Click to enter a monitoring location record.';
                    }
                  },
                );

                // STEP 4:Project ******************************************
                this.projectService.GetWQXProjectMyOrgCount(+this.currentUser.userIdx).subscribe(
                  (result) => {
                    if (result > 0) {
                      this.lblWiz4 = 'One or more projects have been created. Click to view.';
                      this.btnWiz4 = 'View';
                      this.projOk = true;
                      this.stepper.selectedIndex = 4;
                    } else {
                      this.lblWiz4 = 'Click to manually enter a project record or import records from a spreadsheet or EPA.';
                    }
                  },
                );

                // STEP 5: Organization Starter Data ******************************************

                if (oNotPends[0].defaultTimezone === null || oNotPends[0].defaultTimezone === '') {
                  this.lblWiz5 = 'Click to enter default organization data (e.g. Default Timezone, characteristics) that will be helpful during activity data entry.';
                  this.stepper.selectedIndex = 5;
                } else {
                  this.lblWiz5 = 'Organization default data (e.g. Default Timezone) has been defined. Click to view.';
                }

                // STEP 6: Activity ******************************************
                if (this.projOk === true && this.monLocOk === true) {
                  this.lblWiz6 = 'You must enter a monitoring location and a project before you begin to create activities.';
                  this.btnWiz6Show = false;
                } else {
                  this.activityService.getWQXActivityMyOrgCount(+this.currentUser.userIdx).subscribe(
                    (result) => {
                      if (result > 0) {
                        this.lblWiz6 = 'One or more activities have been created. Click to view.';
                        this.btnWiz6 = 'View';
                        // this.stepper.selectedIndex = 0; (Index out of range)
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

    /* this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {
        }
      }); */


  }
  private PopulateOrgSpecific() {
    this.organizationService.GetWQX_ORGANIZATION_ByID(this.currentUser.OrgID)
      .subscribe((x) => { this.lblOrgName = x.orgFormalName; });
    this.projectService.GetWQX_PROJECT(true, this.currentUser.OrgID, false)
      .subscribe(
        (x) => {
          this.lblProject2 = x.length.toString();
        });
    this.activityService.GetWQX_Activities(true, this.currentUser.OrgID, 0, '', '', '', false, 0)
      .subscribe((x) => { this.lblSamp = x.length.toString(); });
    this.activityService.GetWQX_Activities(true, this.currentUser.OrgID, 0, '', '', '', true, 0)
      .subscribe((x) => { this.lblSampPend2 = x.length.toString(); });
    this.activityService.GetT_WQX_RESULTCount(this.currentUser.OrgID)
      .subscribe(
        (x) => { this.lblResult = x.toString(); },
        (er) => { console.log(er); });
  }

  Step1GetStarted() {
    console.log('route');
  }

  bindAdminTaskData() {
    this.organizationService.getAdminTaskData(this.currentUser.userIdx, this.currentUser.OrgID)
      .subscribe(
        (data: UserOrgDisplay[]) => {
          this._userOrgDisplay = data;
        },
      );
  }
  onBtnWiz1Click() {
    console.log('onBtnWiz1Click clicked');
    if (this.btnWiz1 === 'View') {
      console.log('View');
      this.router.navigate(['/secure/water-quality/wqx-org']);
    } else {
      console.log('not View');
      this.router.navigate(['/secure/main/wqx-org-new']);
    }

    // this.router.navigate(['/secure/main/wqx-org-new'], { queryParams: { orgEditId: -1 } });
  }
  onBtnWiz2Click() {
    this.router.navigate(['/secure/water-quality/wqx-org-edit'], { queryParams: { c: 1 } });
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
  onApprove(uod: any) {
    console.log('onApprove');
    console.log(uod);
    const ApproveRejectCode = 'U';
    this.organizationService.ApproveRejectTWqxUserOrgs(uod.orG_ID, uod.useR_IDX, ApproveRejectCode)
      .subscribe(
        (result) => {
          console.log(result);
          if (result === -1) {
            this.toasterService.danger('User\'s request has been declined.');
          } else if (result === 1) {
            this.toasterService.success('User\'s request has been accepted.');
          } else {
            this.toasterService.danger('Unable to complete this action.');
          }
          this.bindAdminTaskData();
        },
        (_err) => {
          console.log(_err);
          this.toasterService.danger('Unable to complete this action.');
        },
      );
  }
  onReject(uod: any) {
    console.log('onApprove');
    console.log(uod);
    const ApproveRejectCode = 'R';
    this.organizationService.ApproveRejectTWqxUserOrgs(uod.orG_ID, uod.useR_IDX, ApproveRejectCode)
      .subscribe(
        (result) => {
          console.log(result);
          if (result === -1) {
            this.toasterService.danger('User\'s request has been declined.');
          } else if (result === 1) {
            this.toasterService.success('User\'s request has been accepted.');
          } else {
            this.toasterService.danger('Unable to complete this action.');
          }
          this.bindAdminTaskData();
        },
        (_err) => {
          console.log(_err);
          this.toasterService.danger('Unable to complete this action.');
        },
      );
  }
  handleChange(event) {
    console.log('handleChange!');
    console.log(event);
  }
  onFreeStepper() {
    if (this.stepper.disableStepNavigation) {
      this.stepButton = 'Disable Step Navigation';
    } else {
      this.stepButton = 'Enable Step Navigation';
    }
    this.stepper.linear = !this.stepper.linear;
    this.stepper.disableStepNavigation = !this.stepper.disableStepNavigation;
  }
}
