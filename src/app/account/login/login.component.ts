import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../@core/auth/auth.service';

@Component({
  selector: 'ngx-app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  title = 'Login';

  login() {
    this.authService.login();
  }

  ngOnInit() {
    this.login();
  }
}


