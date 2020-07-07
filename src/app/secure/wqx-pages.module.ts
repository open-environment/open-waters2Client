import { NgModule } from '@angular/core';
import { NbMenuModule, NbCheckboxModule, NbTabsetModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { WqxPagesComponent } from './wqx-pages.component';

import { WqxPagesRoutingModule } from './wqx-pages-routing.module';
import { MiscellaneousModule } from '../pages/miscellaneous/miscellaneous.module';
import { WqxTablesModule } from './main/wqx-tables.module';
import { WQXOrganizationService } from '../@core/wqx-services/wqx-organization-service';
import { NgxAuthJWTInterceptor } from '../NgxAuthJWTInterceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WqxOrgComponent } from './water-quality/wqx-org/wqx-org.component';
import { WqxAssesmentRptsComponent } from './data-analysis/wqx-assesment-rpts/wqx-assesment-rpts.component';
import { WqxMapsComponent } from './data-analysis/wqx-maps/wqx-maps.component';
import { WqxChartingComponent } from './data-analysis/wqx-charting/wqx-charting.component';
import { WQXRefDataService } from '../@core/wqx-services/wqx-refdata-service';
import { AddCharWindowComponent } from './water-quality/wqx-org-data/add-char-window/add-char-window.component';


@NgModule({
  imports: [
    WqxPagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    MiscellaneousModule,
    WqxTablesModule,
    FormsModule,
    ReactiveFormsModule,
    NbCheckboxModule,
    NbTabsetModule,
  ],
  declarations: [
    WqxPagesComponent,
    WqxAssesmentRptsComponent,
    WqxMapsComponent,
    WqxChartingComponent,
    // WqxOrgComponent,
    // WqxTablesComponent,
  ],
  providers:[
    WQXOrganizationService,
    WQXRefDataService,
    { provide: HTTP_INTERCEPTORS, useClass: NgxAuthJWTInterceptor, multi: true},
  ],

})
export class WqxPagesModule {
}
