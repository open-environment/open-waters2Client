import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';

import { AccountRoutingModule } from './account.routing-module';
import { AuthService } from '../@core/auth/auth.service';

@NgModule({
  declarations: [LoginComponent],
  providers: [AuthService],
  imports: [
    CommonModule,
    AccountRoutingModule,
  ]
})
export class AccountModule { }
