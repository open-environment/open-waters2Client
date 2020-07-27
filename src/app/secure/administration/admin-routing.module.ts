import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { Routes, RouterModule } from '@angular/router';
import { AdmDataSynchComponent } from './adm-data-synch/adm-data-synch.component';
import { AppSettingsComponent } from './app-settings/app-settings.component';
import { RoleEditComponent } from './role-edit/role-edit.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserListComponent } from './user-list/user-list.component';
import { RoleListComponent } from './role-list/role-list.component';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            {
                path: 'users',
                component: UserListComponent,
            },
            {
                path: 'roles',
                component: RoleListComponent,
            },
            {
                path: 'app-settings',
                component: AppSettingsComponent,
            },
            {
                path: 'data-synch',
                component: AdmDataSynchComponent,
            },
        ],
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule {

}




