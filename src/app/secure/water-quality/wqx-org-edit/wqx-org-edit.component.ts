import { Component, OnInit, ViewChild } from '@angular/core';
import { WqxOrganization, UserOrgDisplay, TOeUsers, ConnectTestResult, WqxRefData } from '../../../@core/wqx-data/wqx-organization';
import { Router, ActivatedRoute } from '@angular/router';
import { WQXOrganizationService } from '../../../@core/wqx-services/wqx-organization-service';
import { WqxPubsubServiceService } from '../../../@core/wqx-services/wqx-pubsub-service.service';
import { User } from '../../../@core/data/users';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { NgForm } from '@angular/forms';
import { ToasterService } from 'angular2-toaster';
import { NbToastrService } from '@nebular/theme';

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

  lblMsgShow: boolean = false;
  lblMsg: string = '';

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private organizationService: WQXOrganizationService,
              private pubSubService: WqxPubsubServiceService,
              private authService: NbAuthService,
              private toasterService: NbToastrService) {
                this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
                  if (token.isValid()) {
                    this.user = token.getPayload(); // here we receive a payload from the token and assigns it to our `user` variable
                  }
                });
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
      if (this.orgEditId !== null) {
         this.loadPageData(this.orgEditId);
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

    this.organizationService.GetT_WQX_REF_DATA('Tribe', true, true).subscribe(
      (tribeData: any) => {
        this.tcs = tribeData;
      },
    );

    this.epaSubmissionGroup = '1';

    this.organizationService.getWQXOrganizationById(this.orgEditId).subscribe(
      (o: WqxOrganization) => {
        if (o !== null) {
          console.log(o);
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

          // populate listbox with users already in organization
          this.organizationService.GetT_OE_USERSInOrganization(this.orgEditId).subscribe(
              (uio: any) => {
                this.lbUserInRole = uio;
                console.log('lbUserInRole');
                console.log(this.lbUserInRole);
              },
          );

          // populate listbox with users not in role
          this.organizationService.GetT_OE_USERSNotInOrganization(this.orgEditId).subscribe(
            (unio: any) => {
              this.lbAllUsers = unio;
              console.log('lbAllUsers');
              console.log(this.lbAllUsers);
            },
          );
        }
      },
    );
  }
  btnTestNAASLocalClick(): void {
    if (this.orgEditId === '' || this.orgEditId == null) {
      return;
    }
    this.savePageData();
    if (this.txtCDX === '') {
      this.lblMsgShow = true;
      this.lblMsg = 'Please enter a CDX Submitter first. This is your NAAS username provided by EPA.';
      return;
    }
    this.organizationService.ConnectTestResult(this.orgEditId, 'LOCAL').subscribe(
      (data: ConnectTestResult) => {
        console.log(data);
      },
    );
  }
  btnTestNAASGlobalClick(): void {
    if (this.orgEditId === '' || this.orgEditId == null) {
      return;
    }
    this.savePageData();
    this.organizationService.ConnectTestResult(this.orgEditId, 'GLOBAL').subscribe(
      (data: ConnectTestResult) => {
        console.log(data);
      },
    );
  }
  onSubmit() {
    this.savePageData();
  }
  savePageData() {
    if (this.epaSubmissionGroup === '2') {
      // this.txtCDX = '';
      this.txtCDXPwd = '';
    }

    // save updates to Organization
    this.organizationService.
      InsertOrUpdateTWQXOrganization(this.txtOrgID, this.txtOrgName,
        this.txtOrgDesc, this.tribalCodeSelected, '', '', this.txtOrgPhone, '',
        this.txtOrgPhoneExt, '', '', false, '', this.user.name,
        this.txtMailingAddress, this.txtMailCity, this.txtMailState,
        this.txtMailZIP).subscribe(
      (result) => {
        if (result === 1) {
          this.toasterService.success('Data Saved!');
          this.router.navigate(['../wqx-org'], { relativeTo: this.activatedRoute});
        }
       },
      (err) => {
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
    if (this.selectedUser1 !== null) {
      const roleCD: string = (this.isChecked === true) ? 'A' : 'U';
      this.organizationService.insertTWQXUserOrgs(this.selectedUser1.orG_ID, this.selectedUser1.useR_IDX, roleCD, this.selectedUser1.useR_NAME).subscribe(
        (result) => {
          // console.log(result);
        },
        (err) => {
          // console.log(err);
        },
      );
    }
  }
  onRemoveUserFromOrg(): void {
    if (this.selectedUser2 !== null) {
       this.organizationService.deleteTWqxUserOrgs(this.selectedUser2.orG_ID, this.selectedUser2.useR_IDX).subscribe(
        (result) => {
          console.log(result);
        },
        (err) => {
          console.log(err);
        },
      );
    }
  }

}
