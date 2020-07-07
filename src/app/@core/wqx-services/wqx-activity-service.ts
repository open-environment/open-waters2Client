import { Injectable } from '@angular/core';
import { of as observableOf,  Observable, of } from 'rxjs';
import { PeriodsService } from '../mock/periods.service';
import { WqxActivity, WqxActivityData } from '../wqx-data/wqx-activity';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { WebApi } from '../utils/web-api';

@Injectable()
export class WQXActivityService extends WqxActivityData {

   constructor(private http: HttpClient) {
    super();
  }

  GetWQX_Activities(ActInd: boolean, OrgID: string, MonLocIDX: number, startDt: string, endDt: string, ActType: string, WQXPending: boolean, ProjectIDX: number): Observable<WqxActivity[]> {
    return this.http.get<WqxActivity[]>(WebApi.TWQXActivityApi.getAllActivities(ActInd, OrgID, MonLocIDX, startDt, endDt, ActType, WQXPending, ProjectIDX));
  }
  GetT_WQX_RESULTCount(OrgID: string): Observable<number> {
    return this.http.get<number>(WebApi.TWQXActivityApi.getTWQXResulTCount(OrgID));
  }
  getWQXActivityMyOrgCount(userIDX: number): Observable<number> {
    return this.http.get<number>(WebApi.TWQXActivityApi.getWQXActivityMyOrgCount(userIDX));
  }
}
