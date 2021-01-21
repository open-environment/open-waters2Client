import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { User } from '../../../@core/data/users';
import { Subject, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { WQXOrganizationService } from '../../../@core/wqx-services/wqx-organization-service';
import { WqxOrganization } from '../../../@core/wqx-data/wqx-organization';
import { WqxPubsubServiceService } from '../../../@core/wqx-services/wqx-pubsub-service.service';
import { AuthService } from '../../../@core/auth/auth.service';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: User;
  token: any;

  orgs: WqxOrganization[] = [];
  selectedOrgId: string;


  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];

  pubSubServiceSubscription: Subscription[] = [];
  organizationServiceSubscription: Subscription[] = [];

  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private authService: AuthService,
    private router: Router,
    private organizationService: WQXOrganizationService,
    private pubSubService: WqxPubsubServiceService) {
    if (this.authService.isAuthenticated() === true) {
      const u = this.authService.getUser();
      // TODO: need to fix this
      if (!this.user)
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

      // Set organization in dropdown
      const hdrOrgJson = localStorage.getItem('headerOrgs');
      console.log('1');
      if (hdrOrgJson) {
        console.log('2');
        this.orgs = JSON.parse(hdrOrgJson);
        setTimeout(() => {
          if (localStorage.getItem('selectedOrgId') !== null) {
            this.selectedOrgId = localStorage.getItem('selectedOrgId');
          } else {
            this.selectedOrgId = this.user.OrgID;
          }

        }, 100);
      } else {
        console.log('3');
        this.organizationService.GetWQX_USER_ORGS_ByUserIDX(+this.user.userIdx, true).subscribe(
          (data) => {
            console.log('4');
            console.log(data);
            data.forEach(element => {
              const newOrg = {} as WqxOrganization;
              newOrg.orgId = element.orgId;
              newOrg.orgFormalName = element.orgFormalName;
              this.orgs.push(newOrg);
            });
            localStorage.setItem('headerOrgs', JSON.stringify(this.orgs));
            setTimeout(() => {
              this.selectedOrgId = this.user.OrgID;
            }, 100);

          },
          (err) => {
            console.log(err);
          },
        )
      }

    }
  }

  ngOnInit() {
    this.menuService.onItemClick().subscribe((event) => {
      this.onItemSelection(event.item.title);
    });
  }

  onItemSelection(title: string) {
    if (title === 'Log out') {
      this.authService.signout();
    } else if (title === 'Profile') {
      this.router.navigate(['/secure/my-account']);
    }
  }

  ngOnDestroy() {
    this.pubSubServiceSubscription.forEach(element => {
      element.unsubscribe();
    });
    this.organizationServiceSubscription.forEach(element => {
      element.unsubscribe();
    });
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeOrg(orgId: string) {
    console.log('changeOrg:' + orgId);

    // Query: Since we don't subscribe we don't need to handle subscription?
    // Need more study on this.
    this.pubSubService.setOrgId(orgId);

    localStorage.setItem('selectedOrgId', orgId);
  }
  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
  ReturnToPortal() {
    // this.authService.signout();
    window.location.href = environment.api.authUrl;
  }
}
