import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NbAlertModule, NbButtonModule, NbCardModule, NbInputModule, NbListModule } from '@nebular/theme';
import { MyAccountRoutingModule } from './my-account-routing.module';
import { MyAccountComponent } from './my-account.component';

@NgModule({
    declarations: [
        MyAccountComponent,
    ],
    imports: [
        MyAccountRoutingModule,
        FormsModule,
        CommonModule,
        NbCardModule,
        NbAlertModule,
        NbListModule,
        NbInputModule,
        NbButtonModule,
    ],
})
export class MyAccountModule {

}
