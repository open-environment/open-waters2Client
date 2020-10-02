import { Component, OnInit } from '@angular/core';
import { WqxOrganization, UserOrgDisplay, TOeUsers, ConnectTestResult, WqxRefData } from '../../../@core/wqx-data/wqx-organization';
import { Router, ActivatedRoute } from '@angular/router';
import { WQXOrganizationService } from '../../../@core/wqx-services/wqx-organization-service';
import { WqxPubsubServiceService } from '../../../@core/wqx-services/wqx-pubsub-service.service';
import { User } from '../../../@core/data/users';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { NbToastrService } from '@nebular/theme';
import { AuthService } from '../../../@core/auth/auth.service';

@Component({
  selector: 'ngx-wqx-org-edit',
  templateUrl: './wqx-org-edit.component.html',
  styleUrls: ['./wqx-org-edit.component.scss'],
})
export class WqxOrgEditComponent implements OnInit {

  // @ViewChild('f', {static: false}) myForm: NgForm;
  user: User;
  tcs: WqxRefData[] = [];
  myTcs: WqxRefData[] = [];

  epaSubmissionGroup = '1';
  orgEditId: string = '';


  txtOrgID: string = '';
  txtOrgIDReadOnly: boolean = false;
  txtOrgName: string = '';
  txtOrgDesc: string = '';
  tribalCodeSelected: string = '';
  txtOrgEmail: string = '';
  txtOrgPhone: string = '';
  txtOrgPhoneExt: string = '';
  txtMailingAddress: string = '';
  txtMailCity: string = '';
  txtMailState: string = '';
  txtMailZIP: string = '';
  lblCDXSubmitInd: string = '';
  txtCDX: string = '';
  txtCDXPwd: string = '';

  lbUserInRole: any[];
  lbAllUsers: any[];
  selectedUser1: any;
  selectedUser2: any;

  listItemClass1: boolean = false;
  listItemClass2: boolean = false;

  isChecked: boolean = false;
  divCDXglobal: boolean = false;
  divCDXme: boolean = true;
  pnlCDXResults: boolean = false;

  lblMsgShow: boolean = false;
  lblMsg: string = '';

  txtAuthResult: string = '';
  txtSubmitResult: string = '';

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private organizationService: WQXOrganizationService,
    private pubSubService: WqxPubsubServiceService,
    private authService: NbAuthService,
    private authService1: AuthService,
    private toasterService: NbToastrService) {

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

    }
    /* this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        this.user = token.getPayload(); // here we receive a payload from the token and assigns it to our `user` variable
        console.log(this.user);
      }
    }); */
    if (this.orgEditId === null) {
      this.router.navigate(['/secure/water-quality/wqx-org']);
    }
    this.epaSubmissionGroup = '1';
    // this.loadPageData(this.orgEditId);

    this.pubSubService.loadData.subscribe((data: any) => {
      if (data !== null && data !== '') {
        // this.loadPageData(data);
      }
    });

  }

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe(params => {
      this.orgEditId = params['orgEditId'];
      if (this.orgEditId !== null && this.orgEditId !== undefined) {
        this.loadPageData(this.orgEditId);
      } else {
        if (this.user.OrgID !== null) {
          this.loadPageData(this.user.OrgID);
        }
      }
    });
  }

  loadPageData(data: any): void {
    if (data !== null && data !== '') {
      this.orgEditId = data;
    }
    /* This needs to be implemented
        if (Request.QueryString["c"] == "1")
        pnlCDX.CssClass = "fldErr row";
    */

    // read session variables
    // this is done in ngOnInit()

    // Populate Tribal Codes
    this.organizationService.GetT_WQX_REF_DATA('Tribe', true, true).subscribe(
      (tribeData: any) => {
        this.tcs = tribeData;

        this.epaSubmissionGroup = '2';
        this.onrbCDXChange(this.epaSubmissionGroup);

        this.organizationService.getWQXOrganizationById(this.orgEditId).subscribe(
          (o: WqxOrganization) => {
            console.log(o);

            if (o !== null) {
              this.txtOrgID = o.orgId;
              this.txtOrgIDReadOnly = false;
              this.txtOrgName = o.orgFormalName;
              this.txtOrgDesc = o.orgDesc;
              this.tribalCodeSelected = o.tribalCode;
              this.txtOrgEmail = o.electronicaddress;
              this.txtOrgPhone = o.telephoneNum;
              this.txtOrgPhoneExt = o.telephoneExt;
              this.txtMailingAddress = o.mailingAddress;
              this.txtMailCity = o.mailingAddCity;
              this.txtMailState = o.mailingAddState;
              this.txtMailZIP = o.mailingAddZip;
              if (o.cdxSubmitInd === true) {
                // lblCDXSubmitInd.CssClass = "fldPass";
                this.lblCDXSubmitInd = 'This Organization is able to submit to EPA.';
              } else {
                // lblCDXSubmitInd.CssClass = "fldErr";
                this.lblCDXSubmitInd = 'This Organization is unable to submit to EPA. Please correct this below.';
              }

              this.txtCDX = o.cdxSubmitterId;
              this.txtCDXPwd = '--------';

              if (o.cdxSubmitterId !== null && o.cdxSubmitterId !== '' && o.cdxSubmitterId.length > 0) {
                this.epaSubmissionGroup = '1';
              } else {
                this.epaSubmissionGroup = '2';
              }
              this.loadOrgDropDowns();

            }
          },
          (err) => {
            console.log(err);
          },
        );

      },
      (err) => {
        console.log(err);
      },
    );


  }
  loadOrgDropDowns() {
    // populate listbox with users already in organization
    this.organizationService.GetT_OE_USERSInOrganization(this.orgEditId).subscribe(
      (uio: any) => {
        console.log(uio);
        this.lbUserInRole = uio;
      },
    );

    // populate listbox with users not in role
    this.organizationService.GetT_OE_USERSNotInOrganization(this.orgEditId).subscribe(
      (unio: any) => {
        console.log('unio');
        console.log(unio);
        this.lbAllUsers = unio;
      },
    );
  }
  btnTestNAASLocalClick(): void {
    console.log('btnTestNAASLocalClick');
    this.pnlCDXResults = false;
    if (this.orgEditId === '' || this.orgEditId == null) {
      return;
    }
    this.savePageData(false);
    if (this.txtCDX === '') {
      this.lblMsgShow = true;
      this.lblMsg = 'Please enter a CDX Submitter first. This is your NAAS username provided by EPA.';
      this.toasterService.danger(this.lblMsg);
      return;
    }
    this.organizationService.ConnectTestResult(this.orgEditId, 'LOCAL').subscribe(
      (data: ConnectTestResult) => {
        console.log('ConnectTestResult: valid');
        console.log(data);
        this.pnlCDXResults = true;
        this.txtAuthResult = data.lblAuthResult;
        if (data.msg !== null && data.msg !== '') {
          console.log('data.msg has got value');
          this.txtSubmitResult = data.msg;
          console.log(this.txtSubmitResult);
          this.organizationService.InsertOrUpdateTWQXOrganization(this.orgEditId, '', '', '', '', '', '', '', '', '', '', false, '', this.user.name, '', '', '', '').subscribe(
            (result) => {
              console.log('InsertOrUpdateTWQXOrganization: valid');
              console.log(result);
            },
            (err) => {
              console.log('InsertOrUpdateTWQXOrganization: failed');
              console.log(err);
            },
          );
        } else {
          console.log('data.msg has no value');
          this.txtSubmitResult = data.lblSubmitResult;
          console.log(this.txtSubmitResult);
          this.organizationService.InsertOrUpdateTWQXOrganization(this.orgEditId, '', '', '', '', '', '', '', '', '', '', true, '', this.user.name, '', '', '', '').subscribe(
            (result) => {
              console.log('InsertOrUpdateTWQXOrganization: valid');
              console.log(result);
            },
            (err) => {
              console.log('InsertOrUpdateTWQXOrganization: failed');
              console.log(err);
            },
          );
        }
      },
      (err) => {
        this.toasterService.danger('Something went wrong!');
        console.log(err);
        this.organizationService.InsertOrUpdateTWQXOrganization(this.orgEditId, '', '', '', '', '', '', '', '', '', '', false, '', this.user.name, '', '', '', '').subscribe(
          (result2) => {
            console.log('InsertOrUpdateTWQXOrganization2: valid');
            console.log(result2);
          },
          (err2) => {
            console.log('InsertOrUpdateTWQXOrganization2: failed');
            console.log(err2);
          },
        );
      },
    );
  }
  btnTestNAASGlobalClick(): void {
    console.log('btnTestNAASGlobalClick');
    this.pnlCDXResults = false;
    if (this.orgEditId === '' || this.orgEditId == null) {
      return;
    }
    this.savePageData(false);
    this.organizationService.ConnectTestResult(this.orgEditId, 'GLOBAL').subscribe(
      (data: ConnectTestResult) => {
        console.log(data);
        this.pnlCDXResults = true;
        this.txtAuthResult = data.lblAuthResult;
        if (data.msg !== null && data.msg !== '') {
          console.log('data.msg has got value');
          this.txtSubmitResult = data.msg;
          console.log(this.txtSubmitResult);
          this.organizationService.InsertOrUpdateTWQXOrganization(this.orgEditId, '', '', '', '', '', '', '', '', '', '', false, '', this.user.name, '', '', '', '').subscribe(
            (result) => {
              console.log('InsertOrUpdateTWQXOrganization: valid');
              console.log(result);
            },
            (err) => {
              console.log('InsertOrUpdateTWQXOrganization: failed');
              console.log(err);
            },
          );
        } else {
          console.log('data.msg has no value');
          this.txtSubmitResult = data.lblSubmitResult;
          console.log(this.txtSubmitResult);
          this.organizationService.InsertOrUpdateTWQXOrganization(this.orgEditId, '', '', '', '', '', '', '', '', '', '', true, '', this.user.name, '', '', '', '').subscribe(
            (result) => {
              console.log('InsertOrUpdateTWQXOrganization: valid');
              console.log(result);
            },
            (err) => {
              console.log('InsertOrUpdateTWQXOrganization: failed');
              console.log(err);
            },
          );
        }
      },
      (err) => {
        this.toasterService.danger('Something went wrong!');
        console.log(err);
        this.organizationService.InsertOrUpdateTWQXOrganization(this.orgEditId, '', '', '', '', '', '', '', '', '', '', false, '', this.user.name, '', '', '', '').subscribe(
          (result2) => {
            console.log('InsertOrUpdateTWQXOrganization2: valid');
            console.log(result2);
          },
          (err2) => {
            console.log('InsertOrUpdateTWQXOrganization2: failed');
            console.log(err2);
          },
        );
      },
    );
  }
  onSubmit() {
    console.log('onSubmit called');
    this.savePageData(true);
  }
  savePageData(isSubmit: boolean) {
    console.log('savePageData called');
    console.log(this.epaSubmissionGroup);
    if (this.epaSubmissionGroup === '2') {
      console.log('setting cdx values');
      this.txtCDX = '';
      this.txtCDXPwd = '';
    }
    console.log(this.txtOrgName);
    console.log(this.tribalCodeSelected);
    const orgID = (this.txtOrgID === null) ? '' : this.txtOrgID;
    const orgName = (this.txtOrgName === null) ? '' : this.txtOrgName;
    if (orgID === '' || orgName === '') {
      this.toasterService.danger('Enter Organization ID and Name.');
      return;
    }
    // save updates to Organization
    this.organizationService.
      InsertOrUpdateTWQXOrganization(
        orgID, orgName,
        (this.txtOrgDesc === null) ? '' : this.txtOrgDesc,
        (this.tribalCodeSelected === null) ? '' : this.tribalCodeSelected,
        (this.txtOrgEmail === null) ? '' : this.txtOrgEmail,
        '',
        (this.txtOrgPhone === null) ? '' : this.txtOrgPhone,
        '',
        (this.txtOrgPhoneExt === null) ? '' : this.txtOrgPhoneExt,
        (this.txtCDX === null) ? '' : this.txtCDX,
        (this.txtCDX === '') ? '' : (this.txtCDXPwd === null) ? '' : this.txtCDXPwd,
        false, '', // default time zone is set to empty
        this.user.name,
        (this.txtMailingAddress === null) ? '' : this.txtMailingAddress,
        (this.txtMailCity === null) ? '' : this.txtMailCity,
        (this.txtMailState === null) ? '' : this.txtMailState,
        (this.txtMailZIP === null) ? '' : this.txtMailZIP,
      ).subscribe(
        (result) => {
          console.log('InsertOrUpdateTWQXOrganization: valid:' + result);
          if (result === 1) {
            if (isSubmit === false) { return; }
            this.toasterService.success('Data Saved!');
            this.router.navigate(['../wqx-org'], { relativeTo: this.activatedRoute });
          } else {
            this.toasterService.danger('Error updating record.');
          }
        },
        (err) => {
          console.log('InsertOrUpdateTWQXOrganization: err: ' + err);
          this.toasterService.danger('Error updating record.');
        },
      );
  }
  onCancelClicked(): void {
    this.router.navigate(['/secure/water-quality/wqx-org']);
  }
  onEditDefaultData(): void {
    this.router.navigate(['/secure/water-quality/wqx-org-data']);
  }
  onOrgAllUserClicked(user: UserOrgDisplay): void {
    if (user !== null) {
      this.selectedUser1 = user;
      this.listItemClass1 = true;
    }
  }
  onrbCDXChange(event: any) {
    console.log('onrbCDXChange');
    console.log(event);
    if (event === '1') {
      this.divCDXglobal = false;
      this.divCDXme = true;
    } else {
      this.divCDXglobal = true;
      this.divCDXme = false;
    }

  }
  onOrgAllUserNotInOrgClicked(user: TOeUsers): void {
    if (user !== null) {
      this.selectedUser2 = user;
      this.listItemClass2 = true;
    }
  }
  onAddUserToOrg(): void {
    console.log('user 1');
    console.log(this.selectedUser1);
    if (this.selectedUser1 !== null) {
      const roleCD: string = (this.isChecked === true) ? 'A' : 'U';
      this.organizationService.insertTWQXUserOrgs(this.orgEditId, this.selectedUser1.userIdx, roleCD, this.selectedUser1.fname).subscribe(
        (result) => {
          console.log('insertTWQXUserOrgs: valid');
          console.log(result);
          this.loadOrgDropDowns();
        },
        (err) => {
          this.toasterService.danger('User could not be added to organization.');
          console.log('insertTWQXUserOrgs: failed');
          console.log(err);
        },
      );
    }
  }
  onRemoveUserFromOrg(): void {
    if (this.selectedUser2 !== null) {
      this.organizationService.deleteTWqxUserOrgs(this.orgEditId, this.selectedUser2.useR_IDX).subscribe(
        (result) => {
          console.log('deleteTWqxUserOrgs: valid');
          console.log(result);
          this.loadOrgDropDowns();
        },
        (err) => {
          this.toasterService.danger('User could not be removed from organization.');
          console.log('deleteTWqxUserOrgs: failed');
          console.log(err);
        },
      );
    }
  }

}
