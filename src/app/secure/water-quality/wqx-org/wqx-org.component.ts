import { Component, OnDestroy, OnInit } from '@angular/core';
import { WQXOrganizationService } from '../../../@core/wqx-services/wqx-organization-service';
import { WqxPubsubServiceService } from '../../../@core/wqx-services/wqx-pubsub-service.service';
import { Router } from '@angular/router';
import { WqxOrganization } from '../../../@core/wqx-data/wqx-organization';
import { NbAuthService } from '@nebular/auth';
import { User } from '../../../@core/data/users';
import { AuthService } from '../../../@core/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ngx-wqx-org',
  templateUrl: './wqx-org.component.html',
  styleUrls: ['./wqx-org.component.scss'],
})
export class WqxOrgComponent implements OnInit, OnDestroy {
  user: User;
  currentOrgId: string = '';

  pubSubServiceSubscription: Subscription[] = [];

  orgs: WqxOrganization[] = [];


  constructor(private service: WQXOrganizationService,
    private pubSubService: WqxPubsubServiceService,
    private router: Router,
    private authService: NbAuthService,
    private authService1: AuthService) {

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
    this.pubSubServiceSubscription.push(this.pubSubService.loadData.subscribe((data: any) => {
    }));

  }
  ngOnDestroy(): void {
    this.pubSubServiceSubscription.forEach(element => {
      element.unsubscribe();
    });
  }

  ngOnInit() {
    if (localStorage.getItem('selectedOrgId') !== null) {
      this.currentOrgId = localStorage.getItem('selectedOrgId');
    }
    this.loadData();
  }

  loadData(): void {
    if (this.user.isAdmin.toString() === 'true') {
      this.service.GetWQX_ORGANIZATION()
        .subscribe(
          (data) => {
            this.orgs = data;
          },
          (err) => {
            console.log(err);
          },
        );
    } else {
      this.service.GetWQX_USER_ORGS_ByUserIDX(this.user.userIdx, true).subscribe(
        (data) => {
          this.orgs = data;
        },
        (err) => {
          console.log(err);
        },
      );
    }
  }

  onEditClicked(org: WqxOrganization): void {
    const orgId = org.orgId;
    this.router.navigate(['/secure/water-quality/wqx-org-edit'], { queryParams: { orgEditId: orgId } });
  }
  onAddNewClick(): void {
    this.router.navigate(['/secure/water-quality/wqx-org-edit'], { queryParams: { orgEditId: -1 } });
  }
}
