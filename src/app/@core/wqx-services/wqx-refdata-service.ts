import { Injectable } from '@angular/core';
import { of as observableOf,  Observable, of } from 'rxjs';
import { PeriodsService } from '../mock/periods.service';
import { WqxActivity, WqxActivityData } from '../wqx-data/wqx-activity';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { WebApi } from '../utils/web-api';
import { WqxRefDataData, WqxRefDefaultTimeZone, WqxRefCharacteristic, AnalMethodDisplay, WqxRefTaxaOrg, WqxRefCharOrg, WqxRefCounty } from '../wqx-data/wqx-refdata';
import { WqxRefData } from '../wqx-data/wqx-organization';

@Injectable()
export class WQXRefDataService extends WqxRefDataData {

   constructor(private http: HttpClient) {
    super();
  }

  GetT_WQX_REF_DEFAULT_TIME_ZONE(): Observable<WqxRefDefaultTimeZone[]> {
    return this.http.get<WqxRefDefaultTimeZone[]>(WebApi.TWQXRefDataApi.getTWqxRefDefaultTimeZone());
  }
  InsertOrUpdateT_WQX_ORGANIZATION(orgId: string, orgName: string, orgDesc: string, tribalCode: string, electronicAddress: string,
    electtronicAddressType: string, telephoneNum: string, telephoneNumType: string, telephoneExt: string, cdxSubmitterId: string,
    cdxSubmitterPWD: string, cdxSubmitterInd: string, defaultTimeZone: string, createUser: string, mailAddress: string,
    mailAddCity: string, mailAddState: string, mailAddZip: string): Observable<number> {
    const httpOptions = {};
    return this.http.post<number>(WebApi.TWQXRefDataApi.InsertOrUpdateTWQXOrganization(orgId, orgName, orgDesc, tribalCode, electronicAddress,
      electtronicAddressType, telephoneNum, telephoneNumType, telephoneExt, cdxSubmitterId,
      cdxSubmitterPWD, cdxSubmitterInd, defaultTimeZone, createUser, mailAddress,
      mailAddCity, mailAddState, mailAddZip), '', httpOptions);
  }
  GetT_WQX_REF_CHARACTERISTIC(actInd: boolean, onlyUsedInd: boolean): Observable<WqxRefCharacteristic[]> {
    return this.http.get<WqxRefCharacteristic[]>(WebApi.TWQXRefDataApi.GetTWqxRefCharacteristic(actInd, onlyUsedInd));
  }
  GetT_WQX_REF_ANAL_METHOD(actInd: boolean): Observable<AnalMethodDisplay[]> {
    return this.http.get<AnalMethodDisplay[]>(WebApi.TWQXRefDataApi.GetTWqxRefAnalMethod(actInd));
  }
  GetT_WQX_REF_DATA(table: string, actInd: boolean, usedInd: boolean): Observable<WqxRefData[]> {
    return this.http.get<WqxRefData[]>(WebApi.TWQXRefDataApi.GetTWqxRefData(table, actInd, usedInd));
  }
  InsertOrUpdateT_WQX_REF_CHAR_ORG(charName: string, orgName: string, createUserId: string,
    defaultDetectLimit: string, defaultUnit: string, defaultAnalMethodIdx: number,
    defaultSampFraction: string, defaultResultStatus: string, defaultResultTypeValue: string,
    defaultLowerQuantLimit: string, defaultUpperQuantLimit: string): Observable<number> {
      const httpOptions = {};
      return this.http.post<number>(WebApi.TWQXRefDataApi.InsertOrUpdateTWqxRefCharOrg(charName, orgName, createUserId,
        defaultDetectLimit, defaultUnit, defaultAnalMethodIdx, defaultSampFraction, defaultResultStatus, defaultResultTypeValue,
        defaultLowerQuantLimit, defaultUpperQuantLimit), '', httpOptions);
  }
  InsertOrUpdateT_WQX_REF_TAXA_ORG(bioSubjectTaxanomy: string, orgName: string, createUserId: string): Observable<number> {
    const httpOptions = {};
      return this.http.post<number>(WebApi.TWQXRefDataApi.insertOrUpdateTWqxRefTaxaOrg(bioSubjectTaxanomy, orgName, createUserId), '', httpOptions);
  }
  GetT_WQX_REF_TAXA_ORG(orgName: string): Observable<WqxRefTaxaOrg[]> {
    return this.http.get<WqxRefTaxaOrg[]>(WebApi.TWQXRefDataApi.GetTWqxRefTaxaOrg(orgName));
  }
  GetAllColumnBasic(importType: string): Observable<string[]> {
    return this.http.get<string[]>(WebApi.TWQXRefDataApi.getAllColumnBasic(importType));
  }
  InsertOrUpdateWQX_IMPORT_TRANSLATE(translateIdx: number, orgId: string, colName: string, dataFrom: string, dataTo:  string,  createUser: string): Observable<number> {
    const httpOptions = {};
    return this.http.post<number>(WebApi.TWQXRefDataApi.insertOrUpdateWqxImportTranslate(translateIdx === null ? 0 : translateIdx, orgId, colName, dataFrom, dataTo,  createUser), '', httpOptions);
  }
  GetT_WQX_REF_CHAR_ORG(orgName: string): Observable<WqxRefCharOrg[]> {
    return this.http.get<WqxRefCharOrg[]>(WebApi.TWQXRefDataApi.GetTWqxRefCharOrg(orgName));
  }
  GetT_WQX_REF_COUNTY(stateCode: string): Observable<WqxRefCounty[]> {
    return this.http.get<WqxRefCounty[]>(WebApi.TWQXRefDataApi.GetTWqxRefCounty(stateCode));
  }
}
