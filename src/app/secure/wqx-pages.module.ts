import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NbMenuModule, NbCheckboxModule, NbTabsetModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { WqxPagesRoutingModule } from './wqx-pages-routing.module';
import { MiscellaneousModule } from '../pages/miscellaneous/miscellaneous.module';
import { WqxPagesComponent } from './wqx-pages.component';
import { WQXOrganizationService } from '../@core/wqx-services/wqx-organization-service';
import { WQXRefDataService } from '../@core/wqx-services/wqx-refdata-service';
import { NgxAuthJWTInterceptor } from '../NgxAuthJWTInterceptor';
import { WqxWaterQualityModule } from './water-quality/wqx-water-quality.module';
import { RouterModule } from '@angular/router';
import { WqxRefDataModule } from './ref-data/ref-data.module';
import { AdminModule } from './administration/admin.module';



@NgModule({
  declarations: [
    WqxPagesComponent,
  ],
  imports: [
    RouterModule,
    WqxPagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    MiscellaneousModule,
    FormsModule,
    ReactiveFormsModule,
    NbCheckboxModule,
    NbTabsetModule,
    WqxWaterQualityModule,
    WqxRefDataModule,
    AdminModule,
  ],
  providers: [
    WQXOrganizationService,
    WQXRefDataService,
    { provide: HTTP_INTERCEPTORS, useClass: NgxAuthJWTInterceptor, multi: true },
  ],

})
export class WqxPagesModule {
}
