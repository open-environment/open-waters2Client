import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AuthService } from '../@core/auth/auth.service';
import { WqxUtilityService } from '../@core/wqx-services/wqx-utility.service';

@Component({
  selector: 'ngx-app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.scss'],
})
export class AuthCallbackComponent implements OnInit {

  error: boolean;

  constructor(private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private utilityService: WqxUtilityService) { }

  async ngOnInit() {

    // check for error
    if (this.route.snapshot.fragment.indexOf('error') >= 0) {
      this.error = true;
      return;
    }

    const user = await this.authService.completeAuthentication();
    console.log('===============**********=============');
    console.log(user);
    if (this.authService.isAuthenticated) {
      console.log('authenticated');
      console.log(user.profile.open_waters);
      const defaultOrgId: string = this.GetDefaultOrgId(user.profile.open_waters);
      localStorage.setItem('selectedOrgId', defaultOrgId);
      const isAdmin: boolean = this.GetIsAdmin(user.profile.open_waters);
      this.utilityService.CheckUserExist(user).subscribe(
        (result) => {
          console.log('CheckUserExist');
          console.log(result);
          if (result.userexist === true) {
            this.authService.setUserData(result.useridx, result.username, defaultOrgId, isAdmin);
            this.router.navigate(['/home']);
          } else {
            const navigationExtras: NavigationExtras = { state: { data: 'You need authorization to access this resource.' } };
            this.router.navigate(['/pages/miscellaneous/unauthorized'], navigationExtras);
          }

        },
        (err) => {
          console.log('CheckUserExist');
          console.log(err);
        },
      );
    }

  }
  GetDefaultOrgId(ow: any): string {
    let actResult: string = '';
    const isOWArray = Array.isArray(ow);
    let owa: Array<string> = [];
    if (isOWArray === true) {
      owa = ow;
    } else {
      owa[0] = ow;
    }
    if (owa.length > 0) {
      const splitted = owa[0].split(';');
      actResult = splitted[0];
    }
    console.log('DefaultOrgId:');
    console.log(actResult);
    return actResult;
  }
  GetIsAdmin(ow: any): boolean {
    let actResult: boolean = false;
    const isOWArray = Array.isArray(ow);
    let owa: Array<string> = [];
    if (isOWArray === true) {
      owa = ow;
    } else {
      owa[0] = ow;
    }
    if (owa.length > 0) {
      owa.forEach(element => {
        if (element.split(';')[1] === 'True') {
          actResult = true;
        }
      });
    }
    console.log('IsAdmin:');
    console.log(actResult);
    return actResult;
  }
}
