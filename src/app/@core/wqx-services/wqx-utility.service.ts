import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WebApi } from '../utils/web-api';
import { WqxUtilityData, ExtLoginUser, JwtLoginModel } from '../wqx-data/wqx-utility';


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
  CreateAndGetNewUserData(userid: string): Observable<ExtLoginUser> {
    return this.http.get<ExtLoginUser>(WebApi.UtilityApi.createAndGetNewUserData(userid));
  }
}
