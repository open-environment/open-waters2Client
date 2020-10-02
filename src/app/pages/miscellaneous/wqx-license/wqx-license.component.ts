import { Component, NgModule, OnInit } from '@angular/core';
import { NbMenuService, NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'ngx-wqx-license',
  templateUrl: './wqx-license.component.html',
  styleUrls: ['./wqx-license.component.scss'],
})
export class WqxLicenseComponent implements OnInit {

  constructor(private sideBar: NbSidebarService) {
    // this.sideBar.compact('menu-sidebar');
  }

  ngOnInit() {
  }

}
