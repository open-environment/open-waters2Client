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
import { WqxAssesmentRptsComponent } from './data-analysis/wqx-assesment-rpts/wqx-assesment-rpts.component';
import { WqxMapsComponent } from './data-analysis/wqx-maps/wqx-maps.component';
import { WqxChartingComponent } from './data-analysis/wqx-charting/wqx-charting.component';
import { WQXRefDataService } from '../@core/wqx-services/wqx-refdata-service';
import { RefDataComponent } from './ref-data/ref-data.component';
import { UserListComponent } from './administration/user-list/user-list.component';
import { RoleListComponent } from './administration/role-list/role-list.component';
import { AppSettingsComponent } from './administration/app-settings/app-settings.component';
import { AdmDataSynchComponent } from './administration/adm-data-synch/adm-data-synch.component';
import { UserEditComponent } from './administration/user-edit/user-edit.component';
import { RoleEditComponent } from './administration/role-edit/role-edit.component';





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
    RefDataComponent,
    UserListComponent,
    RoleListComponent,
    AppSettingsComponent,
    AdmDataSynchComponent,
    UserEditComponent,
    RoleEditComponent,
    // WqxOrgComponent,
    // WqxTablesComponent,

  ],
  providers: [
    WQXOrganizationService,
    WQXRefDataService,
    { provide: HTTP_INTERCEPTORS, useClass: NgxAuthJWTInterceptor, multi: true },
  ],

})
export class WqxPagesModule {
}
