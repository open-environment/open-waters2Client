import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AdmDataSynchComponent } from './adm-data-synch/adm-data-synch.component';
import { AppSettingsComponent } from './app-settings/app-settings.component';
import { RoleEditComponent } from './role-edit/role-edit.component';
import { RoleListComponent } from './role-list/role-list.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserListComponent } from './user-list/user-list.component';
import { AdminComponent } from './admin.component';
import { RouterModule } from '@angular/router';
import { AdminRoutingModule } from './admin-routing.module';
import { NbAlertModule, NbButtonModule, NbCardModule, NbIconModule } from '@nebular/theme';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        FormsModule,
        RouterModule,
        AdminRoutingModule,
        NbCardModule,
        NbAlertModule,
        TableModule,
        CommonModule,
        NbIconModule,
        NbButtonModule,
    ],
    declarations: [
        AdmDataSynchComponent,
        AppSettingsComponent,
        RoleEditComponent,
        RoleListComponent,
        UserEditComponent,
        UserListComponent,
        AdminComponent,
    ],

    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminModule {

}
