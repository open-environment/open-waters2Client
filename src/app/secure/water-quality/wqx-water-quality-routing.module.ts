import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WqxWaterQualityComponent } from './WqxWaterQuality.component';
import { WqxOrgComponent } from './wqx-org/wqx-org.component';
import { WqxOrgEditComponent } from './wqx-org-edit/wqx-org-edit.component';
import { WqxOrgDataComponent } from './wqx-org-data/wqx-org-data.component';
import { WqxMonlocComponent } from './wqx-monloc/wqx-monloc.component';
import { WqxProjectComponent } from './wqx-project/wqx-project.component';
import { WqxActivityComponent } from './wqx-activity/wqx-activity.component';
import { WqxImportComponent } from './wqx-import/wqx-import.component';
import { WqxImportFromEpaComponent } from './wqx-import-from-epa/wqx-import-from-epa.component';
import { WqxMgmtComponent } from './wqx-mgmt/wqx-mgmt.component';
import { WqxMonlocEditComponent } from './wqx-monloc/wqx-monloc-edit/wqx-monloc-edit.component';

const routes: Routes = [{
  path: '',
  component: WqxWaterQualityComponent,
  children: [
    {
      path: 'wqx-org',
      component: WqxOrgComponent,
    },
    {
      path: 'wqx-org-edit',
      component: WqxOrgEditComponent,
    },
    {
      path: 'wqx-org-data',
      component: WqxOrgDataComponent,
    },
    {
      path: 'wqx-monloc',
      component: WqxMonlocComponent,
    },
    {
      path: 'wqx-monloc-edit',
      component: WqxMonlocEditComponent,
    },
    {
      path: 'wqx-project',
      component: WqxProjectComponent,
    },
    {
      path: 'wqx-activity',
      component: WqxActivityComponent,
    },
    {
      path: 'wqx-import',
      component: WqxImportComponent,
    },
    {
      path: 'wqx-import-from-epa',
      component: WqxImportFromEpaComponent,
    },
    {
      path: 'wqx-mgmt',
      component: WqxMgmtComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WqxTablesRoutingModule { }

export const wqxRoutedComponents = [
  WqxWaterQualityComponent,
  WqxOrgComponent,
];
