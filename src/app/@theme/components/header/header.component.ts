import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMenuService, NbSidebarService, NbSelectComponent } from '@nebular/theme';

import { User } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { Subject } from 'rxjs';
import { NbAuthJWTToken, NbAuthService, NbAuthResult } from '@nebular/auth';
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
  /* themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ]; */
  orgs: WqxOrganization[] = [];
  selectedOrgId: string;
  // currentTheme = 'default';

  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];

  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    // private themeService: NbThemeService,
    private layoutService: LayoutService,
    private authService: NbAuthService,
    private authService1: AuthService,
    private router: Router,
    private organizationService: WQXOrganizationService,
    private pubSubService: WqxPubsubServiceService) {

    if (this.authService1.isAuthenticated() === true) {
      const u = this.authService1.getUser();
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
      this.organizationService.GetWQX_USER_ORGS_ByUserIDX(+this.user.userIdx, true).subscribe(
        (data) => {
          data.forEach(element => {
            const newOrg = {} as WqxOrganization;
            newOrg.orgId = element.orgId;
            newOrg.orgFormalName = element.orgFormalName;
            this.orgs.push(newOrg);
          });
          console.log('setting default orgid');
          console.log(this.user.OrgID);
          setTimeout(() => {
            this.selectedOrgId = this.user.OrgID;
          }, 100);

        },
        (err) => {
          console.log(err);
        },
      );
    }


    /* this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {
          this.user = token.getPayload();
          console.log(+this.user.userIdx);
        }
      }); */
  }

  ngOnInit() {
    this.menuService.onItemClick().subscribe((event) => {
      this.onItemSelection(event.item.title);
    });

    // this.currentTheme = this.themeService.currentTheme;

    /* this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: any) => this.user = users.nick); */

    // const { xl } = this.breakpointService.getBreakpointsMap();
    /* this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
       this.menuService.onItemClick().subscribe(( event ) => {
        this.onItemSelection(event.item.title);
      }); */
  }

  onItemSelection(title: string) {
    if (title === 'Log out') {
      this.authService1.signout();
      /*  this.authService.logout('email').subscribe(
         (result: NbAuthResult) => {
           this.router.navigateByUrl('/auth/login');
         },
         (err) => { console.log(err); },
       ); */
    } else if (title === 'Profile') {
      // Do something on Profile
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /*   changeTheme(themeName: string) {
      this.themeService.changeTheme(themeName);
    } */
  changeOrg(orgId: string) {
    console.log(orgId);
    this.pubSubService.setOrgId(orgId);
    localStorage.setItem('selectedOrgId', orgId);
  }
  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();
    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
  ReturnToPortal() {
    this.authService1.signout();
  }
}
