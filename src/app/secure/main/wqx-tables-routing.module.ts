import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WqxTablesComponent } from './WqxTables.component';
import { WqxOrgNewComponent } from './wqx-org-new/wqx-org-new.component';
import { WqxOrgNewCSComponent } from './wqx-org-new-confirm-selection/wqx-org-new-cs.component';

const routes: Routes = [{
  path: '',
  component: WqxTablesComponent,
  children: [
    {
      path: 'wqx-org-new',
      component: WqxOrgNewComponent,
    },
    {
      path: 'wqx-org-new-cs',
      component: WqxOrgNewCSComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WqxTablesRoutingModule { }

export const wqxRoutedComponents = [
  WqxTablesComponent,
  WqxOrgNewComponent,
  WqxOrgNewCSComponent,
];
