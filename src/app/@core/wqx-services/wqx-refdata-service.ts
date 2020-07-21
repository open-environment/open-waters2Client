import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { WebApi } from '../utils/web-api';
import { WqxRefDataData, WqxRefDefaultTimeZone, WqxRefCharacteristic, AnalMethodDisplay, WqxRefTaxaOrg, WqxRefCharOrg, WqxRefCounty, WqxRefSampColMethod, WqxRefCharLimits } from '../wqx-data/wqx-refdata';
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
  InsertOrUpdateWQX_IMPORT_TRANSLATE(translateIdx: number, orgId: string, colName: string, dataFrom: string, dataTo: string, createUser: string): Observable<number> {
    const httpOptions = {};
    return this.http.post<number>(WebApi.TWQXRefDataApi.insertOrUpdateWqxImportTranslate(translateIdx === null ? 0 : translateIdx, orgId, colName, dataFrom, dataTo, createUser), '', httpOptions);
  }
  GetT_WQX_REF_CHAR_ORG(orgName: string): Observable<WqxRefCharOrg[]> {
    return this.http.get<WqxRefCharOrg[]>(WebApi.TWQXRefDataApi.GetTWqxRefCharOrg(orgName));
  }
  GetT_WQX_REF_COUNTY(stateCode: string): Observable<WqxRefCounty[]> {
    return this.http.get<WqxRefCounty[]>(WebApi.TWQXRefDataApi.GetTWqxRefCounty(stateCode));
  }
  DeleteT_WQX_REF_TAXA_ORG(orgName: string, charName: string): Observable<number> {
    return this.http.delete<number>(WebApi.TWQXRefDataApi.deleteTWqxRefTaxaOrg(orgName, charName));
  }
  DeleteT_WQX_IMPORT_TRANSLATE(translateId: number): Observable<number> {
    return this.http.delete<number>(WebApi.TWQXRefDataApi.deleteTWqxImportTranslate(translateId));
  }
  DeleteT_WQX_REF_CHAR_ORG(orgName: string, charName: string): Observable<number> {
    return this.http.delete<number>(WebApi.TWQXRefDataApi.deleteTWqxRefTaxaOrg(orgName, charName));
  }
  GetT_WQX_REF_DATA_Count(): Observable<number> {
    return this.http.get<number>(WebApi.TWQXRefDataApi.getTWqxRefDataCount());
  }
  GetT_WQX_REF_CHAR_ORG_Count(orgName: string): Observable<number> {
    return this.http.get<number>(WebApi.TWQXRefDataApi.GetTWqxRefCharOrgCount(orgName));
  }
  GetT_WQX_REF_SAMP_COL_METHOD_ByContext(context: string): Observable<WqxRefSampColMethod[]> {
    return this.http.get<WqxRefSampColMethod[]>(WebApi.TWQXRefDataApi.GetTWqxRefSampColMethodByContext(context));
  }
  GetT_WQX_REF_CHARACTERISTIC_ByOrg(orgId: string, rbpInd: boolean): Observable<WqxRefCharacteristic[]> {
    return this.http.get<WqxRefCharacteristic[]>(WebApi.TWQXRefDataApi.getTWqxRefCharacteristicByOrg(orgId, rbpInd));
  }
  InsertOrUpdateT_WQX_RESULT(resultIdx: number, activityIdx: number, resultDetectCondition: string,
    charName: string, resultSampFraction: string, resultMsr: string, resultMsrUnit: string,
    resultStatus: string, resultValueType: string, resultComment: string,
    bioIntentName: string, bioIndividualId: string, bioTaxonomy: string, bioSampleTissueAnatomy: string,
    analyticMethodIdx: number, labIdx: number, labanalysisStartDt: string, detectionLimit: string, pql: string,
    lowerQuantLimit: string, upperQuantLimit: string, labSampPrepIdx: number, labSampPrepStartDt: string, dilutionFactor: string,
    freqClassCode: string, freqClassUnit: string, createUser: string) {
    console.log(WebApi.TWQXRefDataApi.insertOrUpdateTWqxResult(resultIdx, activityIdx, resultDetectCondition,
      charName, resultSampFraction, resultMsr, resultMsrUnit, resultStatus, resultValueType, resultComment,
      bioIntentName, bioIndividualId, bioTaxonomy, bioSampleTissueAnatomy, analyticMethodIdx, labIdx, labanalysisStartDt, detectionLimit, pql,
      lowerQuantLimit, upperQuantLimit, labSampPrepIdx, labSampPrepStartDt, dilutionFactor,
      freqClassCode, freqClassUnit, createUser));
    const httpOptions = {};
    return this.http.post<number>(WebApi.TWQXRefDataApi.insertOrUpdateTWqxResult(resultIdx, activityIdx, resultDetectCondition,
      charName, resultSampFraction, resultMsr, resultMsrUnit, resultStatus, resultValueType, resultComment,
      bioIntentName, bioIndividualId, bioTaxonomy, bioSampleTissueAnatomy, analyticMethodIdx, labIdx, labanalysisStartDt, detectionLimit, pql,
      lowerQuantLimit, upperQuantLimit, labSampPrepIdx, labSampPrepStartDt, dilutionFactor,
      freqClassCode, freqClassUnit, createUser), '', httpOptions);
  }
  GetT_WQX_REF_TAXA_ByOrg(orgId: string): Observable<WqxRefData[]> {
    return this.http.get<WqxRefData[]>(WebApi.TWQXRefDataApi.getTWqxRefTaxaByOrg(orgId));
  }
  GetT_WQX_REF_CHAR_LIMITS_ByNameUnit(charName: string, unitName: string): Observable<WqxRefCharLimits> {
    return this.http.get<WqxRefCharLimits>(WebApi.TWQXRefDataApi.getTWqxRefCharLimitsByNameUnit(charName, unitName));
  }
  DeleteT_WQX_RESULT(resultIdx: number): Observable<number> {
    return this.http.delete<number>(WebApi.TWQXRefDataApi.deleteTWqxResult(resultIdx));
  }
}
