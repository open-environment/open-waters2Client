import { NgModule, Component } from '@angular/core';
import { RefDataComponent } from './ref-data.component';
import { RouterModule } from '@angular/router';
import { routes } from '@nebular/auth';

@NgModule({
    declarations: [
        RefDataComponent,
    ],
    imports: [
        RouterModule.forChild([{
            path: '',
            component: RefDataComponent,
        }],
        ),
    ],
})
export class WqxRefDataModule {
}
