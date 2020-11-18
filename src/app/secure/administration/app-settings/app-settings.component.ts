import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TOeAppSettings } from '../../../@core/wqx-data/wqx-admin';
import { WqxAdminService } from '../../../@core/wqx-services/wqx-admin.service';

@Component({
  selector: 'ngx-app-settings',
  templateUrl: './app-settings.component.html',
  styleUrls: ['./app-settings.component.scss'],
})
export class AppSettingsComponent implements OnInit, OnDestroy {

  appSettings: TOeAppSettings[];
  cols: any[];

  adminServiceSubscription: Subscription[] = [];
  constructor(private adminService: WqxAdminService) {
    this.adminService.GetAllTOeAppSettings().subscribe(
      (data) => {
        this.appSettings = data;
      },
      (err) => {
        console.log(err);
      },
    );
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
    console.log(appSetting);
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
