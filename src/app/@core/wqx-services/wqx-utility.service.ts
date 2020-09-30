import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WebApi } from '../utils/web-api';
import { WqxUtilityData, ExtLoginUser, JwtLoginModel } from '../wqx-data/wqx-utility';
import { User } from 'oidc-client';


@Injectable({
  providedIn: 'root',
})
export class WqxUtilityService extends WqxUtilityData {

  constructor(private http: HttpClient) {
    super();
  }

  CheckUserAuthentication(payload: string): Observable<ExtLoginUser> {
    return this.http.get<ExtLoginUser>(WebApi.UtilityApi.checkUserAuthentication(payload));
  }
  CheckUserExist(payload: User): Observable<ExtLoginUser> {
    const httpOptions = {};

    const isOWArray = Array.isArray(payload.profile.open_waters);
    let ow: Array<string> = [];
    if (isOWArray === true) {
      ow = payload.profile.open_waters;
    } else {
      ow[0] = payload.profile.open_waters;
    }
    const body = {
      userid: payload.profile.sub,
      email: payload.profile.email,
      open_waters: ow,
    };
    return this.http.post<ExtLoginUser>(WebApi.UtilityApi.checkUserExist(), body, httpOptions);
  }
  CreateAndGetNewUserData(userid: string): Observable<ExtLoginUser> {
    return this.http.get<ExtLoginUser>(WebApi.UtilityApi.createAndGetNewUserData(userid));
  }
}
