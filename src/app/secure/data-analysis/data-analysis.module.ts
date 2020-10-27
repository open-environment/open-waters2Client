import { NgModule } from '@angular/core';
import { WqxAssesmentRptsComponent } from './wqx-assesment-rpts/wqx-assesment-rpts.component';
import { WqxChartingComponent } from './wqx-charting/wqx-charting.component';
import { WqxMapsComponent } from './wqx-maps/wqx-maps.component';
import { RouterModule } from '@angular/router';
import { DataAnalysisRoutingModule } from './data-analysis-routing.module';
import { DataAnalysisComponent } from './data-anaysis.component';
import { NbButtonModule, NbCardModule, NbCheckboxModule, NbIconModule, NbSelectModule, NbTooltipModule } from '@nebular/theme';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule } from '@agm/core';
import { ChartModule } from 'angular2-chartjs';
import { CalendarModule } from 'primeng/primeng';

@NgModule({
    declarations: [
        WqxAssesmentRptsComponent,
        WqxChartingComponent,
        WqxMapsComponent,
        DataAnalysisComponent,
    ],
    imports: [
        RouterModule,
        DataAnalysisRoutingModule,
        FormsModule,
        CommonModule,
        NbCardModule,
        TableModule,
        NbIconModule,
        NbButtonModule,
        NbTooltipModule,
        NbSelectModule,
        CalendarModule,
        NbCheckboxModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyCEohIbvKCfnAfGgT0omUpaifCQdBLLAz0',
            //apiKey: 'AIzaSyDfIwM8J3FoXCAcBSwBzyB18xxGWsUg9ik',
        }),
        ChartModule,
    ],
})
export class DataAnalysisModule {

}
