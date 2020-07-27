import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WqxMainComponent } from './wqx-main.component';
import { WqxOrgNewComponent } from './wqx-org-new/wqx-org-new.component';
import { WqxOrgNewCSComponent } from './wqx-org-new-confirm-selection/wqx-org-new-cs.component';

const routes: Routes = [{
  path: '',
  component: WqxMainComponent,
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
export class WqxMainRoutingModule { }

export const wqxRoutedComponents = [
  WqxMainComponent,
  WqxOrgNewComponent,
  WqxOrgNewCSComponent,
];
