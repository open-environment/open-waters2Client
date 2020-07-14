import { NgModule } from '@angular/core';
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule, NbCheckboxModule, NbSelectModule, NbRadioModule, NbListModule, NbAlertModule, NbTabsetModule, NbToastrModule, NbWindowModule, NbButtonModule, NbDatepickerModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { WqxTablesRoutingModule } from './wqx-water-quality-routing.module';
import { wqxRoutedComponents } from './wqx-water-quality-routing.module';

import { WqxOrgComponent } from './wqx-org/wqx-org.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WqxOrgEditComponent } from './wqx-org-edit/wqx-org-edit.component';
import { WqxOrgDataComponent } from './wqx-org-data/wqx-org-data.component';
import { WqxMonlocComponent } from './wqx-monloc/wqx-monloc.component';
import { WqxProjectComponent } from './wqx-project/wqx-project.component';
import { WqxActivityComponent } from './wqx-activity/wqx-activity.component';
import { WqxImportComponent } from './wqx-import/wqx-import.component';
import { WqxImportFromEpaComponent } from './wqx-import-from-epa/wqx-import-from-epa.component';
import { WqxMgmtComponent } from './wqx-mgmt/wqx-mgmt.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxAuthJWTInterceptor } from '../../NgxAuthJWTInterceptor';
import { WQXRefDataService } from '../../@core/wqx-services/wqx-refdata-service';
import { AddCharWindowComponent } from './wqx-org-data/add-char-window/add-char-window.component';
import { AddTranslationWindowComponent } from './wqx-org-data/add-translation-window/add-translation-window.component';
import { MonlocConfigWindowComponent } from './wqx-monloc/monloc-config-window/monloc-config-window.component';
import { WqxMonlocEditComponent } from './wqx-monloc/wqx-monloc-edit/wqx-monloc-edit.component';
import { ProjectConfigWindowComponent } from './wqx-project/project-config-window/project-config-window.component';
import { WqxProjectEditComponent } from './wqx-project/wqx-project-edit/wqx-project-edit.component';
import { ActivityConfigWindowComponent } from './wqx-activity/activity-config-window/activity-config-window.component';
import { WqxActivityEditComponent } from './wqx-activity/wqx-activity-edit/wqx-activity-edit.component';



@NgModule({
  imports: [
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    WqxTablesRoutingModule,
    Ng2SmartTableModule,
    FormsModule,
    ReactiveFormsModule,
    NbSelectModule,
    NbRadioModule,
    NbCheckboxModule,
    NbListModule,
    NbAlertModule,
    NbTabsetModule,
    NbToastrModule,
    NbWindowModule.forRoot(),
    NbButtonModule,
    NbDatepickerModule.forRoot(),
  ],
  declarations: [
    ...wqxRoutedComponents,
    WqxOrgComponent,
    WqxOrgEditComponent,
    WqxOrgDataComponent,
    WqxMonlocComponent,
    WqxProjectComponent,
    WqxActivityComponent,
    WqxImportComponent,
    WqxImportFromEpaComponent,
    WqxMgmtComponent,
    AddCharWindowComponent,
    AddTranslationWindowComponent,
    MonlocConfigWindowComponent,
    WqxMonlocEditComponent,
    ProjectConfigWindowComponent,
    WqxProjectEditComponent,
    ActivityConfigWindowComponent,
    WqxActivityEditComponent,
  ],
  providers: [
    WQXRefDataService,
    { provide: HTTP_INTERCEPTORS, useClass: NgxAuthJWTInterceptor, multi: true },
  ],
  entryComponents: [
    MonlocConfigWindowComponent,
    AddCharWindowComponent,
    AddTranslationWindowComponent,
    ProjectConfigWindowComponent,
    ActivityConfigWindowComponent,
  ],
})
export class WqxWaterQualityModule { }
