import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { UserData, User } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NbAuthJWTToken, NbAuthService, NbTokenService, NbAuthResult } from '@nebular/auth';
import { RouterModule, Routes, Route, Router } from '@angular/router';
import { WQXOrganizationService } from '../../../@core/wqx-services/wqx-organization-service';
import { WqxOrganization, WqxOrganizationData } from '../../../@core/wqx-data/wqx-organization';
import { WqxPubsubServiceService } from '../../../@core/wqx-services/wqx-pubsub-service.service';

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

  // currentTheme = 'default';

  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];
  _authService: any;
  _router: any;
  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    // private themeService: NbThemeService,
    private userService: UserData,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private authService: NbAuthService,
    private tokenService: NbTokenService,
    private router: Router,
    private organizationService: WQXOrganizationService,
    private pubSubService: WqxPubsubServiceService) {
    this._router = router;
    this._authService = this.authService;
    this._authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {
          this.user = token.getPayload();
        }
      });
  }

  ngOnInit() {
    if (this.user.UserIDX !== null) {
      this.organizationService.GetWQX_USER_ORGS_ByUserIDX(+this.user.UserIDX, true).subscribe(
        (data) => {
          data.forEach(element => {
            const newOrg = {} as WqxOrganization;
            newOrg.orgId = element.orgId;
            newOrg.orgFormalName = element.orgFormalName;
            this.orgs.push(newOrg);
          });
        },
        (err) => {
          console.log(err);
        },
      );
    } else {
      console.log('user not initialized!');
    }

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
      this._authService.logout('email').subscribe(
        (result: NbAuthResult) => {
          console.log(result);
          this._router.navigateByUrl('/auth/login');
        },
        (err) => { console.log(err); },
      );
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
  changeOrg(orgName: string) {
    console.log(orgName);
    this.pubSubService.setData(orgName);
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

}
