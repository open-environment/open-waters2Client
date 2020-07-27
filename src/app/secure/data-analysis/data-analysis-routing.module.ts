import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataAnalysisComponent } from './data-anaysis.component';
import { WqxAssesmentRptsComponent } from './wqx-assesment-rpts/wqx-assesment-rpts.component';
import { WqxChartingComponent } from './wqx-charting/wqx-charting.component';
import { WqxMapsComponent } from './wqx-maps/wqx-maps.component';

const routes: Routes = [
    {
        path: '',
        component: DataAnalysisComponent,
        children: [
            {
                path: 'wqx-assesment-rpts',
                component: WqxAssesmentRptsComponent,
            },
            {
                path: 'wqx-charting',
                component: WqxChartingComponent,
            },
            {
                path: 'wqx-maps',
                component: WqxMapsComponent,
            },
        ],
    }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DataAnalysisRoutingModule {

}
