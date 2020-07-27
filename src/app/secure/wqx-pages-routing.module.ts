import { RouterModule, Routes } from '@angular/router';
import { NgModule, Component } from '@angular/core';

import { WqxPagesComponent } from './wqx-pages.component';
import { NotFoundComponent } from '../pages/miscellaneous/not-found/not-found.component';
/* import { RefDataComponent } from './ref-data/ref-data.component';
import { UserListComponent } from './administration/user-list/user-list.component';
import { RSA_PKCS1_OAEP_PADDING } from 'constants';
import { RoleListComponent } from './administration/role-list/role-list.component';
import { AppSettingsComponent } from './administration/app-settings/app-settings.component';
import { AdmDataSynchComponent } from './administration/adm-data-synch/adm-data-synch.component'; */

const routes: Routes = [{
  path: '',
  component: WqxPagesComponent,
  children: [
    /* {
      path: 'main',
      loadChildren: () => import('./main/wqx-main.module')
        .then(m => m.WqxMainModule),
    }, */
    {
      path: 'water-quality',
      loadChildren: () => import('./water-quality/wqx-water-quality.module')
        .then(m => m.WqxWaterQualityModule),
    },
    {
      path: 'ref-data',
      loadChildren: () => import('./ref-data/ref-data.module')
        .then(m => m.WqxRefDataModule),
    },
    {
      path: 'data-analysis',
      loadChildren: () => import('./data-analysis/data-analysis.module')
        .then(m => m.DataAnalysisModule),
    },
    {
      path: 'admin',
      loadChildren: () => import('./administration/admin.module')
        .then(m => m.AdminModule),
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WqxPagesRoutingModule {
}
