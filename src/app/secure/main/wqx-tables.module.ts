import { NgModule } from '@angular/core';
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule, NbCheckboxModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { WqxTablesRoutingModule } from './wqx-tables-routing.module';
import { wqxRoutedComponents } from './wqx-tables-routing.module';

import { WqxOrgNewComponent } from './wqx-org-new/wqx-org-new.component';
import { WqxOrgNewCSComponent } from './wqx-org-new-confirm-selection/wqx-org-new-cs.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


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
NbCheckboxModule,
  ],
  declarations: [
    ...wqxRoutedComponents,
    WqxOrgNewComponent,
    WqxOrgNewCSComponent,
  ],
})
export class WqxTablesModule { }
