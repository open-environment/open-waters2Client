import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { WqxPagesComponent } from './wqx-pages.component';
import { NotFoundComponent } from '../pages/miscellaneous/not-found/not-found.component';

const routes: Routes = [{
  path: '',
  component: WqxPagesComponent,
  children: [
     {
      path: 'main',
      loadChildren: () => import('./main/wqx-tables.module')
        .then(m => m.WqxTablesModule),
    },
    {
      path: 'water-quality',
      loadChildren: () => import('./water-quality/wqx-water-quality.module')
        .then(m => m.WqxWaterQualityModule),
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
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
