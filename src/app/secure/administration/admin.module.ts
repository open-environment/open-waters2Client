import { NgModule } from '@angular/core';
import { AdmDataSynchComponent } from './adm-data-synch/adm-data-synch.component';
import { AppSettingsComponent } from './app-settings/app-settings.component';
import { RoleEditComponent } from './role-edit/role-edit.component';
import { RoleListComponent } from './role-list/role-list.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserListComponent } from './user-list/user-list.component';
import { AdminComponent } from './admin.component';
import { RouterModule } from '@angular/router';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
    declarations: [
        AdmDataSynchComponent,
        AppSettingsComponent,
        RoleEditComponent,
        RoleListComponent,
        UserEditComponent,
        UserListComponent,
        AdminComponent,
    ],
    imports: [
        RouterModule,
        AdminRoutingModule,
    ]
})
export class AdminModule {

}
