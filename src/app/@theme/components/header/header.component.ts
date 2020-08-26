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
    private router: Router,
    private organizationService: WQXOrganizationService,
    private pubSubService: WqxPubsubServiceService) {

    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {
          this.user = token.getPayload();
          console.log(+this.user.userIdx);
          this.organizationService.GetWQX_USER_ORGS_ByUserIDX(+this.user.userIdx, true).subscribe(
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
        }
      });
  }

  ngOnInit() {
    this.menuService.onItemClick().subscribe((event) => {
      this.onItemSelection(event.item.title);
    });
    this.pubSubService.loadOrgId.subscribe((data: string) => {
      console.log('pubsub seervice called for orgid with data:' + data);
      if (data !== null && data !== undefined && data !== '') {
        console.log('selected option set...');
        this.selectedOrgId = data;
      }
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
      this.authService.logout('email').subscribe(
        (result: NbAuthResult) => {
          this.router.navigateByUrl('/auth/login');
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
  changeOrg(orgId: string) {
    console.log(orgId);
    this.pubSubService.setData(orgId);
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
