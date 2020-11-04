import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { User } from '../../../@core/data/users';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { WQXOrganizationService } from '../../../@core/wqx-services/wqx-organization-service';
import { WqxOrganization } from '../../../@core/wqx-data/wqx-organization';
import { WqxPubsubServiceService } from '../../../@core/wqx-services/wqx-pubsub-service.service';
import { AuthService } from '../../../@core/auth/auth.service';


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

  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private authService: AuthService,
    private router: Router,
    private organizationService: WQXOrganizationService,
    private pubSubService: WqxPubsubServiceService) {
    console.log('header component - constructor called');
    if (this.authService.isAuthenticated() === true) {
      const u = this.authService.getUser();
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
      const hdrOrgJson = localStorage.getItem('headerOrgs');
      if (hdrOrgJson) {
        this.orgs = JSON.parse(hdrOrgJson);
        setTimeout(() => {
          if (localStorage.getItem('selectedOrgId') !== null) {
            this.selectedOrgId = localStorage.getItem('selectedOrgId');
          } else {
            this.selectedOrgId = this.user.OrgID;
          }

        }, 100);
      } else {
        this.organizationService.GetWQX_USER_ORGS_ByUserIDX(+this.user.userIdx, true).subscribe(
          (data) => {
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
        );
      }

    }
  }

  ngOnInit() {
    console.log('header component - ngOnInit called');
    this.menuService.onItemClick().subscribe((event) => {
      this.onItemSelection(event.item.title);
    });
  }

  onItemSelection(title: string) {
    if (title === 'Log out') {
      this.authService.signout();
    } else if (title === 'Profile') {
      // Do something on Profile
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeOrg(orgId: string) {
    console.log('changeOrg:' + orgId);
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
    this.authService.signout();
  }
}
