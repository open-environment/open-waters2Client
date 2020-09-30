import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { UserManager, UserManagerSettings, User } from 'oidc-client';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  // Observable navItem source
  private _authNavStatusSource = new BehaviorSubject<boolean>(false);
  // Observable navItem stream
  authNavStatus$ = this._authNavStatusSource.asObservable();

  private manager = new UserManager(getClientSettings());
  private user: User | null;

  constructor(private http: HttpClient) {
    // super();

    this.manager.getUser().then(user => {
      this.user = user;
      this._authNavStatusSource.next(this.isAuthenticated());
    });
  }

  login() {
    return this.manager.signinRedirect();
  }

  async completeAuthentication() {
    return this.manager.signinRedirectCallback().then(res => {
      this.user = res;
      this._authNavStatusSource.next(this.isAuthenticated());
      return this.user;
    });
  }

  register(userRegistration: any) {
    return this.http.post(environment.api.authUrl + '/account', userRegistration);
  }

  isAuthenticated(): boolean {
    return this.user != null && !this.user.expired;
  }

  getUser(): User {
    if (this.isAuthenticated() === false) return null;
    return this.user;
  }
  setUserData(userIdx: number, userName: string, defaultOrgId: string, isAdmin: boolean) {
    this.user.userIdx = userIdx;
    this.user.name = userName;
    this.user.OrgID = defaultOrgId;
    this.user.isAdmin = isAdmin === true ? 'true' : 'false';
    console.log('setUserData');
    console.log(this.user);
  }
  get authorizationHeaderValue(): string {
    return `${this.user.token_type} ${this.user.access_token}`;
  }

  get name(): string {
    return this.user != null ? this.user.profile.name : '';
  }

  async signout() {
    await this.manager.signoutRedirect();
  }
}

export function getClientSettings(): UserManagerSettings {
  return {
    authority: environment.api.authUrl,
    client_id: environment.api.client_id,
    redirect_uri: environment.api.redirect_uri,
    post_logout_redirect_uri: environment.api.post_logout_redirect_uri,
    response_type: 'id_token token',
    scope: 'openid profile email api.read',
    filterProtocolClaims: true,
    loadUserInfo: true,
    automaticSilentRenew: true,
    silent_redirect_uri: environment.api.silent_redirect_uri,
  };
}
