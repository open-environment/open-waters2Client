import { Injectable } from '@angular/core';
import { of as observableOf,  Observable, of } from 'rxjs';
import { PeriodsService } from '../mock/periods.service';
import { WqxProject, WqxProjectData } from '../wqx-data/wqx-project';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { WebApi } from '../utils/web-api';

@Injectable()
export class WQXProjectService extends WqxProjectData {

   constructor(private http: HttpClient) {
    super();
  }

  GetWQX_PROJECTS(): Observable<WqxProject[]> {
    return this.http.get<WqxProject[]>(WebApi.TWQXProjectApi.getAllProjects());
  }
  GetWQXProjectMyOrgCount(userIDX: number): Observable<number> {
    return this.http.get<number>(WebApi.TWQXProjectApi.getWQXProjectMyOrgCount(userIDX));
  }
  GetWQXMonlocMyOrgCount(userIDX: number): Observable<number> {
    return this.http.get<number>(WebApi.TWQXProjectApi.getWQXMonLocMyOrgCount(userIDX));
  }
  GetWQX_PROJECT(actInd: boolean, orgId: string, wqxPending: boolean): Observable<WqxProject[]> {
    return this.http.get<WqxProject[]>(WebApi.TWQXProjectApi.getWqxProject(actInd, orgId, wqxPending));
  }
}
