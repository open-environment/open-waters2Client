import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApi } from '../utils/web-api';
import { TOeAppSettings, TWqxAdminData } from '../wqx-data/wqx-admin';
@Injectable({
  providedIn: 'root',
})
export class WqxAdminService extends TWqxAdminData {

  constructor(private http: HttpClient) {
    super();
  }

  GetAllTOeAppSettings(): Observable<TOeAppSettings[]> {
    return this.http.get<TOeAppSettings[]>(
      WebApi.TWQXAdminApi.getAppSettings());
  }
  UpdateTOeAppSetting(appSetting: TOeAppSettings): Observable<number> {
    const httpOptions = {};
    return this.http.put<number>(WebApi.TWQXAdminApi.updateAppSetting(), appSetting, httpOptions);
  }
}
