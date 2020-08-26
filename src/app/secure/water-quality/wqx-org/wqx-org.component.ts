import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table/lib/data-source/local/local.data-source';
import { WQXOrganizationService } from '../../../@core/wqx-services/wqx-organization-service';
import { WqxPubsubServiceService } from '../../../@core/wqx-services/wqx-pubsub-service.service';
import { Router } from '@angular/router';
import { Column } from 'primeng/primeng';
import { WqxAllOrgs, WqxOrganization } from '../../../@core/wqx-data/wqx-organization';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { User } from '../../../@core/data/users';

@Component({
  selector: 'ngx-wqx-org',
  templateUrl: './wqx-org.component.html',
  styleUrls: ['./wqx-org.component.scss'],
})
export class WqxOrgComponent implements OnInit {
  user: User;
  orgs: WqxOrganization[] = [];

  constructor(private service: WQXOrganizationService,
    private pubSubService: WqxPubsubServiceService,
    private router: Router,
    private authService: NbAuthService) {
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        this.user = token.getPayload(); // here we receive a payload from the token and assigns it to our `user` variable
        console.log(this.user);
        this.loadData();
      }
    });
    this.pubSubService.loadData.subscribe((data: any) => {
      console.log('pubSubService called: ' + data);
    });

  }

  ngOnInit() {
  }

  loadData(): void {
    console.log('loadData called..');
    if (this.user.isAdmin.toString() === 'true') {
      console.log('User is admin..');
      this.service.GetWQX_ORGANIZATION()
        .subscribe(
          (data) => {
            console.log('GetWQX_ORGANIZATION: valid');
            this.orgs = data;
          },
          (err) => {
            console.log('GetWQX_ORGANIZATION: error: ' + err);
          },
        );
    } else {
      console.log('User is not admin..');
      this.service.GetWQX_USER_ORGS_ByUserIDX(this.user.userIdx, true).subscribe(
        (data) => {
          console.log('GetWQX_USER_ORGS_ByUserIDX: valid');
          this.orgs = data;
        },
        (err) => {
          console.log('GetWQX_USER_ORGS_ByUserIDX: error: ' + err);
        },
      );
    }
  }

  onEditClicked(org: WqxOrganization): void {
    const orgId = org.orgId;
    this.router.navigate(['/secure/water-quality/wqx-org-edit'], { queryParams: { orgEditId: orgId } });
  }
  onAddNewClick(): void {
    console.log('Add new clicked!');
    this.router.navigate(['/secure/water-quality/wqx-org-edit'], { queryParams: { orgEditId: -1 } });
  }
}
