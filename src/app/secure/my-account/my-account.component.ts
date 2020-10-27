import { Component, NgModule, OnInit } from '@angular/core';
import { NbCardModule, NbToastrService } from '@nebular/theme';
import { AuthService } from '../../@core/auth/auth.service';
import { User } from '../../@core/data/users';
import { MyAccountModel, TOeUsers } from '../../@core/wqx-data/wqx-organization';
import { WQXOrganizationService } from '../../@core/wqx-services/wqx-organization-service';

@Component({
  selector: 'ngx-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss'],
})
export class MyAccountComponent implements OnInit {

  user: User;
  currentOrgId: string;

  txtUserName: string = '';
  txtFName: string = '';
  txtLName: string = '';
  txtEmail: string = '';
  txtPhone: string = '';
  roles: any[] = [];
  orgs: any[] = [];
  constructor(private authService1: AuthService,
    private organizationService: WQXOrganizationService,
    private toasterService: NbToastrService) {
    if (this.authService1.isAuthenticated() === true) {
      const u = this.authService1.getUser();
      // this.currentUser = token.getPayload();
      // TODO: need to fix this
      if (this.user === undefined || this.user === null)
        this.user = {
          userIdx: 0,
          name: '',
          picture: '',
          UserIDX: '',
          OrgID: '',
          isAdmin: '',
        };
      this.user.userIdx = u.userIdx;
      this.user.name = u.name;
      this.user.OrgID = u.OrgID;
      this.user.isAdmin = u.isAdmin;
      this.currentOrgId = this.user.OrgID;
      this.organizationService.GetMyAccountByUserIdx(this.user.userIdx).subscribe(
        (result: any) => {
          console.log('GetMyAccountByUserIdx: valid');
          console.log(result);
          this.txtUserName = result.user.userId;
          console.log(this.txtUserName);
          this.txtFName = result.user.fname;
          this.txtLName = result.user.lname;
          this.txtEmail = result.user.email;
          this.txtPhone = result.user.phone;
          if (result.roles) {
            result.roles.forEach(element => {
              this.roles.push(element);
            });
          }
          if (result.organizations) {
            result.organizations.forEach(element => {
              this.orgs.push(element);
            });
          }

        },
        (err) => {
          console.log('GetMyAccountByUserIdx: failed');
          console.log(err);
        },
      );
    }
  }

  ngOnInit() {
  }

  onSubmit(f) {
    this.organizationService.UpdateMyAccountUser(
      this.user.userIdx,
      encodeURIComponent(this.txtFName),
      encodeURIComponent(this.txtLName),
      encodeURIComponent(this.txtEmail),
      encodeURIComponent(this.txtPhone),
      encodeURIComponent(this.txtUserName),
    ).subscribe(
      (result) => {
        console.log('UpdateMyAccountUser: valid');
        console.log(result);
        if (result > 0) {
          this.toasterService.success('User updated successfully.');
        } else {
          this.toasterService.danger('Error updating user.');
        }
      },
      (err) => {
        console.log('UpdateMyAccountUser: failed');
        console.log(err);
        this.toasterService.danger('Error updating user.');
      },
    );
  }
}
