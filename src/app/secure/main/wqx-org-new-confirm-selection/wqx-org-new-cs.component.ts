import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { User } from '../../../@core/data/users';
import { EPAOrganization } from '../../../@core/wqx-data/wqx-organization';
import { WQXOrganizationService } from '../../../@core/wqx-services/wqx-organization-service';

// declare var jQuery: any;
// declare var $: any;


@Component({
  selector: 'ngx-wqx-org-new-cs',
  templateUrl: './wqx-org-new-cs.component.html',
  styleUrls: ['./wqx-org-new-cs.component.scss'],
})
export class WqxOrgNewCSComponent implements OnInit {
  _orgId: string;
  msg1: string;
  currentOrgId: string;
  user: User;
  eo: EPAOrganization;
  constructor(private service: WQXOrganizationService,
    private activatedRoute: ActivatedRoute,
    private authService: NbAuthService) {
    console.log('wqx-org-new-cs comp called...');
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        this.user = token.getPayload(); // here we receive a payload from the token and assigns it to our `user` variable
      }
    });

  }
  ngOnInit(): void {
    this.currentOrgId = this.activatedRoute.snapshot.queryParamMap.get('orgId');
    if (this.currentOrgId !== '') {
      this._orgId = this.currentOrgId;
      this.service.getWQXOrganizationById(this.currentOrgId)
        .subscribe(
          (_data) => {
            if (_data != null) {
              this.msg1 = _data.orgFormalName + '(' + _data.orgId + ') is already using Open Waters. Click \'Confirm\' to notify an Administrator for this Organization to approve your access request.';
            } else {
              this.msg1 = 'This Organization does not yet exist in Open Waters. Click \'Confirm\' to request access to this organization.';
            }
          },
        );
    }


    /* (function ($) {
      $(document).ready(function () {
        console.log("Hello from jQuery!");
      });
    })(jQuery); */
  }

  onConfirm(): void {
    console.log('confirm called!');
    // check to see if selected organization is already in Open Waters
    this.service.getWQXOrganizationById(this.currentOrgId)
      .subscribe(
        (org) => {
          console.log('subscribe called!');
          if (org == null) {
            console.log('1');
            // ***************************************************************************
            // *************** CASE 1: CREATE NEW ORG
            // ***************************************************************************
            this.service.getTEPAOrgsByOrgId(this.user.userIdx)
              .subscribe(
                x => {
                  this.eo = x;
                  if (this.eo != null) {
                    this.service.InsertOrUpdateTWQXOrganization(this.eo.orgID, this.eo.orgFormalName, null, null, '', null, '', null, null, null, null, false, null, this.user.name, '', '', '', '').subscribe(
                      (data) => { console.log(data); },
                      (err) => { console.log(err); },
                    );
                  } else {

                  }
                });
          } else {
            console.log('2');
            // ***************************************************************************
            // *************** CASE 2: ORG ALREADY IN OPEN WATERS
            // ***************************************************************************

            // now check to see if there are any Admins for this organization
            this.service.getWQXUserOrgsAdminsByOrg(this.currentOrgId)
              .subscribe(oe => console.log(oe));
          }
        },
        (err) => { console.log(err); },
        () => { console.log('complete'); },
      );

    // Org is now in Open Waters, so user added to Org with pending status
    console.log('add orguser');
    const result = this.service.insertTWQXUserOrgs(this.currentOrgId, this.user.userIdx, 'P', this.user.name)
      .subscribe(
        (x) => { console.log(x + ':' + result); },
        (err) => { console.log(err); },
        () => { console.log('complete'); },
      );
    // send email with request
    this.msg1 = 'Your request has been made. You will be emailed when your request has been approved.';
  }
}
