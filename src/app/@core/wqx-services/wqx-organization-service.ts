import { Injectable } from '@angular/core';
import { of as observableOf,  Observable, of } from 'rxjs';
import { PeriodsService } from '../mock/periods.service';
import { WqxOrganization,
  WqxOrganizationData,
  TOeUsers,
  EPAOrganization,
  UserOrgDisplay,
  WqxAllOrgs,
  ConnectTestResult,
  WqxImportTranslate, 
  WqxRefData} from '../wqx-data/wqx-organization';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { WebApi } from '../utils/web-api';


@Injectable()
export class WQXOrganizationService extends WqxOrganizationData {

   constructor(private http: HttpClient) {
    super();
  }
  ConnectTestResult(orgId: string, typ: string): Observable<ConnectTestResult> {
    return this.http.get<ConnectTestResult>(WebApi.TWQXOrganizationApi.connectTest(orgId, typ));
  }
  GetWQX_USER_ORGS_ByUserIDX(userIDX: number, excludePendingInd: boolean): Observable<WqxOrganization[]> {
    return this.http.get<WqxOrganization[]>(WebApi.TWQXOrganizationApi.getUserOrgsByUserIDX(userIDX, excludePendingInd));
  }
  GetWQX_USER_ORGS_AdminsByOrg(OrgID: string){

  }
  GetWQX_ORGANIZATION_ByID(orgID: string){
    return this.http.get<WqxOrganization>(WebApi.TWQXOrganizationApi.GetWQXOrganizationById(orgID));
  }
  ApproveRejectTWqxUserOrgs(orgID: string, userIDX: number, ApproveRejectCode: string) {
    const httpOptions = {};
    return this.http.post<number>(WebApi.TWQXOrganizationApi.approveRejectTWqxUserOrgs(orgID, userIDX, ApproveRejectCode), '', httpOptions);
  }
  getVWQXAllOrgs(): Observable<WqxAllOrgs[]> {
    return this.http.get<WqxAllOrgs[]>(WebApi.TWQXOrganizationApi.getVWQXAllOrgs());
  }
  getAdminTaskData(userName: string, OrgID: string): Observable<UserOrgDisplay[]>{
    return this.http.get<UserOrgDisplay[]>(WebApi.TWQXOrganizationApi.getAdminTaskData(userName, OrgID));
  }
  getWQXOrganizationById(orgID: string): Observable<WqxOrganization> {
    return this.http.get<WqxOrganization>(WebApi.TWQXOrganizationApi.GetWQXOrganizationById(orgID));
  }
  getTEPAOrgsByOrgId(userIDX: number): Observable<EPAOrganization> {
    return this.http.get<EPAOrganization>(WebApi.TWQXOrganizationApi.getTEPAOrgByOrgId(userIDX));
  }
  InsertOrUpdateTWQXOrganization(oRG_ID: string, oRG_NAME: string, oRG_DESC: string, tRIBAL_CODE: string, eLECTRONIC_ADDRESS: string,
    eLECTRONICADDRESSTYPE: string, tELEPHONE_NUM: string, tELEPHONE_NUM_TYPE: string, TELEPHONE_EXT: string, cDX_SUBMITTER_ID: string,
    cDX_SUBMITTER_PWD: string, cDX_SUBMIT_IND: boolean, dEFAULT_TIMEZONE: string, cREATE_USER: string, mAIL_ADDRESS: string,
    mAIL_ADD_CITY: string, mAIL_ADD_STATE: string, mAIL_ADD_ZIP: string) {
      const httpOptions = {};
      return this.http.post(WebApi.TWQXOrganizationApi.InsertOrUpdateTWQXOrganization(oRG_ID, oRG_NAME, oRG_DESC, tRIBAL_CODE, eLECTRONIC_ADDRESS,
        eLECTRONICADDRESSTYPE, tELEPHONE_NUM, tELEPHONE_NUM_TYPE, TELEPHONE_EXT, cDX_SUBMITTER_ID,
        cDX_SUBMITTER_PWD, cDX_SUBMIT_IND, dEFAULT_TIMEZONE, cREATE_USER, mAIL_ADDRESS,
        mAIL_ADD_CITY, mAIL_ADD_STATE, mAIL_ADD_ZIP), '', httpOptions);
    }
    getWQXUserOrgsAdminsByOrg(orgID: string): Observable<TOeUsers> {
      return this.http.get<TOeUsers>(WebApi.TWQXOrganizationApi.GetWQXUserOrgsAdminsByOrg(orgID));
    }
    insertTWQXUserOrgs(orgID: string, userIDX: number, roleCD: string, createUser: string) {
      const httpOptions = {};
      return this.http.post<number>(WebApi.TWQXOrganizationApi.insertTWQXUserOrgs(orgID, userIDX, roleCD, createUser), '', httpOptions);
    }
    GetT_WQX_REF_DATA(table: string, actInd: boolean, usedInd: boolean): Observable<WqxRefData> {
      return this.http.get<WqxRefData>(WebApi.TWQXOrganizationApi.getTWqxRefData(table, actInd, usedInd));
    }
    GetT_OE_USERSInOrganization(orgId: string): Observable<UserOrgDisplay> {
      return this.http.get<UserOrgDisplay>(WebApi.TWQXOrganizationApi.getTOeUsersInOrganization(orgId));
    }
    GetT_OE_USERSNotInOrganization(orgId: string): Observable<TOeUsers> {
      return this.http.get<TOeUsers>(WebApi.TWQXOrganizationApi.getTOeUsersNotInOrganization(orgId));
    }
    deleteTWqxUserOrgs(orgId: string, userIdx: number) {
      const httpOptions = {};
      return this.http.post<number>(WebApi.TWQXOrganizationApi.deleteTWqxUserOrgs(orgId, userIdx), '', httpOptions);
    }
    GetWQX_IMPORT_TRANSLATE_byOrg(orgId: string): Observable<WqxImportTranslate[]> {
      return this.http.get<WqxImportTranslate[]>(WebApi.TWQXOrganizationApi.GetWqxImportTranslatebyOrg(orgId));
    }
}
