import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../@core/auth/auth.service';
import { User } from '../../../@core/data/users';
import { TOeAppSettings } from '../../../@core/wqx-data/wqx-admin';
import { WqxAdminService } from '../../../@core/wqx-services/wqx-admin.service';

@Component({
  selector: 'ngx-app-settings',
  templateUrl: './app-settings.component.html',
  styleUrls: ['./app-settings.component.scss'],
})
export class AppSettingsComponent implements OnInit, OnDestroy {

  user: User;
  appSettings: TOeAppSettings[];
  cols: any[];


  adminServiceSubscription: Subscription[] = [];
  constructor(private authService: AuthService,
    private router: Router,
    private adminService: WqxAdminService) {
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
      if (u.isAdmin === 'false') {
        const navigationExtras: NavigationExtras = { state: { data: 'You need authorization to access this resource.' } };
        this.router.navigate(['/pages/miscellaneous/unauthorized'], navigationExtras);
      } else {
        this.adminService.GetAllTOeAppSettings().subscribe(
          (data) => {
            this.appSettings = data;
          },
          (err) => {
            console.log(err);
          },
        );
      }

    }

  }
  ngOnDestroy(): void {
    this.adminServiceSubscription.forEach(element => {
      element.unsubscribe();
    });
  }

  ngOnInit() {
    this.cols = [
      { field: 'settingIdx', header: 'ID' },
      { field: 'settingName', header: 'Setting Name' },
      { field: 'settingDesc', header: 'Description' },
      { field: 'settingValue', header: 'Setting Value' },
    ];
  }

  onRowEditSave(appSetting: TOeAppSettings) {
    this.adminService.UpdateTOeAppSetting(appSetting).subscribe(
      (result: any) => { },
      (err) => {
        console.log(err);
      },
    );
  }
  onRowEditInit(result: TOeAppSettings) {
    // Event Stub
  }
  onRowDelete(result: TOeAppSettings) {
    // Event Stub
  }
  onRowEditCancel(result: TOeAppSettings, index: number) {
    // Event Stub
  }
}
