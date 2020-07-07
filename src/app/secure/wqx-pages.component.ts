import { Component } from '@angular/core';

import { WQX_MENU_ITEMS } from './wqx-pages-menu';

@Component({
  selector: 'ngx-wqx-pages',
  styleUrls: ['wqx-pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class WqxPagesComponent {

  menu = WQX_MENU_ITEMS;
}
