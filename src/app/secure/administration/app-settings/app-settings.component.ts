import { Component, OnInit } from '@angular/core';
import { TOeAppSettings } from '../../../@core/wqx-data/wqx-admin';
import { WqxAdminService } from '../../../@core/wqx-services/wqx-admin.service';

@Component({
  selector: 'ngx-app-settings',
  templateUrl: './app-settings.component.html',
  styleUrls: ['./app-settings.component.scss'],
})
export class AppSettingsComponent implements OnInit {

  appSettings: TOeAppSettings[];
  cols: any[];
  constructor(private adminService: WqxAdminService) {
    this.adminService.GetAllTOeAppSettings().subscribe(
      (data) => {
        console.log('GetAllTOeAppSettings: valid');
        console.log(data);
        this.appSettings = data;
      },
      (err) => {
        console.log('GetAllTOeAppSettings: failed');
        console.log(err);
      },
    );
  }

  ngOnInit() {
    this.cols = [
      { field: 'settingIdx', header: 'ID' },
      { field: 'settingName', header: 'Setting Name' },
      { field: 'settingDesc', header: 'Description' },
      { field: 'settingValue', header: 'Setting Value' },
    ];
  }

  onRowEditInit(result: TOeAppSettings) {

  }
  onRowDelete(result: TOeAppSettings) {

  }
  onRowEditSave(result: TOeAppSettings) {

  }

  onRowEditCancel(result: TOeAppSettings, index: number) {

  }
}
