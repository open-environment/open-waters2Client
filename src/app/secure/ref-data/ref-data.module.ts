import { NgModule, Component } from '@angular/core';
import { RefDataComponent } from './ref-data.component';
import { RouterModule } from '@angular/router';
import { routes } from '@nebular/auth';
import { NbButtonModule, NbCardModule, NbCheckboxModule, NbIconModule, NbInputModule, NbSelectModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { RefDataEntryComponent } from './ref-data-entry/ref-data-entry.component';

@NgModule({
    declarations: [
        RefDataComponent,
        RefDataEntryComponent,
    ],
    imports: [
        RouterModule.forChild([{
            path: '',
            component: RefDataComponent,
        }],
        ),
        FormsModule,
        CommonModule,
        TableModule,
        NbCardModule,
        NbSelectModule,
        NbIconModule,
        NbButtonModule,
        NbInputModule,
        NbCheckboxModule,
    ],
    entryComponents: [
        RefDataEntryComponent,
    ],
})
export class WqxRefDataModule {
}
