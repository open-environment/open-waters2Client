import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NbCardModule, NbTreeGridModule, NbIconModule, NbInputModule, NbSelectModule, NbRadioModule, NbCheckboxModule, NbListModule, NbAlertModule, NbTabsetModule, NbToastrModule, NbWindowModule, NbButtonModule, NbDatepickerModule, NbStepperModule, NbStepperComponent, NbTooltipModule, NbSpinnerModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
// import { WqxMainRoutingModule, wqxRoutedComponents } from '../main/wqx-main-routing.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DropdownModule, CalendarModule } from 'primeng/primeng';
import { WqxOrgComponent } from './wqx-org/wqx-org.component';
import { WqxOrgEditComponent } from './wqx-org-edit/wqx-org-edit.component';
import { WqxOrgDataComponent } from './wqx-org-data/wqx-org-data.component';
import { WqxMonlocComponent } from './wqx-monloc/wqx-monloc.component';
import { WqxProjectComponent } from './wqx-project/wqx-project.component';
import { WqxActivityComponent } from './wqx-activity/wqx-activity.component';
import { WqxImportComponent } from './wqx-import/wqx-import.component';
import { WqxImportFromEpaComponent } from './wqx-import-from-epa/wqx-import-from-epa.component';
import { WqxMgmtComponent } from './wqx-mgmt/wqx-mgmt.component';
import { AddCharWindowComponent } from './wqx-org-data/add-char-window/add-char-window.component';
import { AddTranslationWindowComponent } from './wqx-org-data/add-translation-window/add-translation-window.component';
import { MonlocConfigWindowComponent } from './wqx-monloc/monloc-config-window/monloc-config-window.component';
import { WqxMonlocEditComponent } from './wqx-monloc/wqx-monloc-edit/wqx-monloc-edit.component';
import { ProjectConfigWindowComponent } from './wqx-project/project-config-window/project-config-window.component';
import { WqxProjectEditComponent } from './wqx-project/wqx-project-edit/wqx-project-edit.component';
import { ActivityConfigWindowComponent } from './wqx-activity/activity-config-window/activity-config-window.component';
import { WqxActivityEditComponent } from './wqx-activity/wqx-activity-edit/wqx-activity-edit.component';
import { AddRowDirective } from '../add-row.directive';
import { WQXRefDataService } from '../../@core/wqx-services/wqx-refdata-service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxAuthJWTInterceptor } from '../../NgxAuthJWTInterceptor';
import { wqxWQRoutedComponents, WqxTablesRoutingModule } from './wqx-water-quality-routing.module';
import { WqxImportMonlocComponent } from './wqx-import-monloc/wqx-import-monloc.component';
import { WqxImportSampleComponent } from './wqx-import-sample/wqx-import-sample.component';
import { WqxImportLogicTemplateComponent } from './wqx-import-logic-template/wqx-import-logic-template.component';
import { ImportTemplateConfigComponent } from './wqx-import-logic-template/import-template-config/import-template-config.component';
import { ImportMappedColumnWindowComponent } from './wqx-import-logic-template/import-mapped-column-window/import-mapped-column-window.component';
import { ImportHardcodedValuesWindowComponent } from './wqx-import-logic-template/import-hardcoded-values-window/import-hardcoded-values-window.component';
import { DigitOnlyDirective } from '../../@core/utils/digit-only.directive';
import { AgmCoreModule } from '@agm/core';
import { WqxMapWindowComponent } from './wqx-monloc/wqx-map-window/wqx-map-window.component';
import { WqxHistComponent } from './wqx-hist/wqx-hist.component';
import { WqxImportProjectComponent } from './wqx-import-project/wqx-import-project.component';
import { WqxImportMetricComponent } from './wqx-import-metric/wqx-import-metric.component';

@NgModule({
  imports: [
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    // WqxMainRoutingModule,
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
    TableModule,
    DropdownModule,
    CalendarModule,
    NbStepperModule,
    NbTooltipModule,
    NbSpinnerModule,
    AgmCoreModule.forRoot({
      //apiKey: 'AIzaSyCEohIbvKCfnAfGgT0omUpaifCQdBLLAz0',
      apiKey: 'AIzaSyDfIwM8J3FoXCAcBSwBzyB18xxGWsUg9ik',
    }),
  ],
  declarations: [
    ...wqxWQRoutedComponents,
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
    WqxMapWindowComponent,
    WqxMonlocEditComponent,
    ProjectConfigWindowComponent,
    WqxProjectEditComponent,
    ActivityConfigWindowComponent,
    WqxActivityEditComponent,
    AddRowDirective,
    WqxImportMonlocComponent,
    WqxImportSampleComponent,
    WqxImportLogicTemplateComponent,
    ImportTemplateConfigComponent,
    ImportMappedColumnWindowComponent,
    ImportHardcodedValuesWindowComponent,
    DigitOnlyDirective,
    WqxMapWindowComponent,
    WqxHistComponent,
    WqxImportProjectComponent,
    WqxImportMetricComponent, // Directive
  ],
  providers: [
    WQXRefDataService,
    NbStepperComponent,
    { provide: HTTP_INTERCEPTORS, useClass: NgxAuthJWTInterceptor, multi: true },
  ],
  entryComponents: [
    MonlocConfigWindowComponent,
    WqxMapWindowComponent,
    AddCharWindowComponent,
    AddTranslationWindowComponent,
    ProjectConfigWindowComponent,
    ActivityConfigWindowComponent,
    ImportTemplateConfigComponent,
    ImportMappedColumnWindowComponent,
    ImportHardcodedValuesWindowComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WqxWaterQualityModule { }
