import { NgModule } from '@angular/core';
import { WqxAssesmentRptsComponent } from './wqx-assesment-rpts/wqx-assesment-rpts.component';
import { WqxChartingComponent } from './wqx-charting/wqx-charting.component';
import { WqxMapsComponent } from './wqx-maps/wqx-maps.component';
import { RouterModule } from '@angular/router';
import { DataAnalysisRoutingModule } from './data-analysis-routing.module';
import { DataAnalysisComponent } from './data-anaysis.component';

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
    ],
})
export class DataAnalysisModule {

}
