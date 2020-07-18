import { NgModule } from '@angular/core';
import {
  NbButtonModule,
  NbCardModule,
  NbProgressBarModule,
  NbTabsetModule,
  NbUserModule,
  NbIconModule,
  NbSelectModule,
  NbListModule,
  NbStepperModule,
} from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { ThemeModule } from '../../@theme/theme.module';
import { ECommerceComponent } from './e-commerce.component';
import { ChartModule } from 'angular2-chartjs';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { WQXOrganizationService } from '../../@core/wqx-services/wqx-organization-service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxAuthJWTInterceptor } from '../../NgxAuthJWTInterceptor';

@NgModule({
  imports: [
    ThemeModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbIconModule,
    NbTabsetModule,
    NbSelectModule,
    NbListModule,
    ChartModule,
    NbProgressBarModule,
    NgxEchartsModule,
    NgxChartsModule,
    LeafletModule,
    NbStepperModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ECommerceComponent,
  ],
  providers: [
    WQXOrganizationService,
    { provide: HTTP_INTERCEPTORS, useClass: NgxAuthJWTInterceptor, multi: true },
  ],
})
export class ECommerceModule { }
