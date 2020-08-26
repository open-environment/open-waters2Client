import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WqxUtilityService } from '../../@core/wqx-services/wqx-utility.service';
import { ExtLoginUser, JwtLoginModel } from '../../@core/wqx-data/wqx-utility';
import { NbAuthService } from '@nebular/auth';
import { NbMenuService } from '@nebular/theme';

@Component({
  selector: 'ngx-extlogin',
  templateUrl: './extlogin.component.html',
  styleUrls: ['./extlogin.component.scss']
})
export class ExtloginComponent implements OnInit {

  data: string;
  payload: string;
  constructor(private activatedRoute: ActivatedRoute,
    private utilityService: WqxUtilityService,
    private authService: NbAuthService,
    private menuService: NbMenuService,
    private router: Router) { }

  ngOnInit() {
    console.log('External login called...');
    this.activatedRoute.queryParams.subscribe(params => {
      this.payload = params['pl'];
      // console.log('payload:' + this.payload);
      if (this.payload !== null && this.payload !== undefined) {
        console.log('CheckUserAuthentication: calling');
        this.utilityService.CheckUserAuthentication(this.payload).subscribe(
          (result: ExtLoginUser) => {
            console.log('CheckUserAuthentication: called valid');
            console.log(result);
            // console.log(result.username);
            this.data = 'data:' + result.username;
            console.log(result.userexist);
            if (result.userexist === true) {
              console.log('CheckUserAuthentication: user exist');
              this.tryLogin(result);
            } else {
              // Get new user information
              console.log('CreateAndGetNewUserData: calling');
              this.utilityService.CreateAndGetNewUserData(result.userid).subscribe(
                (newUser: ExtLoginUser) => {
                  console.log('CreateAndGetNewUserData: called valid');
                  console.log(newUser);
                  if (newUser.userexist === true) {
                    console.log('CreateAndGetNewUserData: user exist');
                    this.tryLogin(newUser);
                  } else {
                    console.log('CreateAndGetNewUserData: user not exist');
                    console.log('User sync failed...');
                  }
                },
                (err) => {
                  console.log('CreateAndGetNewUserData: called failed');
                  console.log(err);
                },
              );
            }
          },
          (err) => {
            console.log('CheckUserAuthentication: called error');
            this.data = 'err: ' + err;
          },
        );
      }
    });
  }


  private tryLogin(result: ExtLoginUser) {
    console.log('tryLogin called...');
    console.log(result);
    console.log('authenticate: calling...');
    this.authService.authenticate('email', { email: result.username, password: result.password }).subscribe(
      (authresult) => {
        console.log('authenticate: valid');
        console.log('authresult');
        const _token = authresult.getToken();
        const _tokenStr = _token.getValue();
        // console.log(_token);
        // console.log(_tokenStr);
        console.log('refreshToken: calling...');
        this.authService.refreshToken('email', { token: _tokenStr }).subscribe(
          (refreshResult) => {
            console.log('refreshToken: valid...navigate home');
            // console.log('refreshResult');
            this.router.navigateByUrl('/login');
          },
          (refreshErr) => {
            console.log('refreshToken: error');
            console.log('refreshErr');
          });
      },
      (autherr) => {
        console.log('authenticate: error');
        console.log(autherr);
      });
  }
}
