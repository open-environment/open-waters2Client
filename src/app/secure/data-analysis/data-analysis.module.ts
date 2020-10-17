import { NgModule } from '@angular/core';
import { WqxAssesmentRptsComponent } from './wqx-assesment-rpts/wqx-assesment-rpts.component';
import { WqxChartingComponent } from './wqx-charting/wqx-charting.component';
import { WqxMapsComponent } from './wqx-maps/wqx-maps.component';
import { RouterModule } from '@angular/router';
import { DataAnalysisRoutingModule } from './data-analysis-routing.module';
import { DataAnalysisComponent } from './data-anaysis.component';
import { NbCardModule } from '@nebular/theme';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
    ],
})
export class DataAnalysisModule {

}
