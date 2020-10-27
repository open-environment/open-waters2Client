import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { ExtloginComponent } from './extlogin/extlogin.component';
import { AuthGuard } from '../auth-guard.service';
import { WqxLicenseComponent } from './miscellaneous/wqx-license/wqx-license.component';
import { WqxTermsComponent } from './miscellaneous/wqx-terms/wqx-terms.component';
import { HelpComponent } from './help/help.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'extlogin',
      component: ExtloginComponent,
    },
    {
      path: 'dashboard',
      component: ECommerceComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'license',
      component: WqxLicenseComponent,
    },
    {
      path: 'terms',
      component: WqxTermsComponent,
    },
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
    },
    {
      path: 'help',
      component: HelpComponent,
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
      canActivate: [AuthGuard],
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
export class PagesRoutingModule {
}
