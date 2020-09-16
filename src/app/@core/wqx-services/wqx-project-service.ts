import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WqxProject, WqxProjectData } from '../wqx-data/wqx-project';
import { HttpClient } from '@angular/common/http';
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
  GetWQX_PROJECT_ByID(projectIdx: number): Observable<WqxProject> {
    return this.http.get<WqxProject>(WebApi.TWQXProjectApi.getWQXProjectByID(projectIdx));
  }
  InsertOrUpdateWQX_PROJECT(projectIdx: number, orgId: string, projectId: string,
    projectName: string, projectDesc: string, sampDesignTypeCd: string, qAppApprovalInd: boolean,
    qAppApprovalAgency: string, wQxSubmitStatus: string, wQxSubmitDt: string, actInd: boolean, wqxInd: boolean, createUser: string) {
    const httpOptions = {};
    return this.http.post<number>(WebApi.TWQXProjectApi.InsertOrUpdateWQXProject(projectIdx, orgId, projectId,
      projectName, projectDesc, sampDesignTypeCd, qAppApprovalInd,
      qAppApprovalAgency, wQxSubmitStatus, wQxSubmitDt, actInd, wqxInd, createUser), '', httpOptions);
  }
  DeleteT_WQX_PROJECT(projectIdx: number, userId: string): Observable<number> {
    return this.http.delete<number>(WebApi.TWQXProjectApi.deleteTWQXProject(projectIdx, userId));
  }
}
