import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { WebApi } from '../utils/web-api';
import { WqxMonlocData, WqxMonloc, MapMarkerModel } from '../wqx-data/wqx-monloc';
import { ImportStatusModel } from '../wqx-data/wqx-import';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { HTTP_VERSION_NOT_SUPPORTED } from 'http-status-codes';
import { ExecFileOptionsWithStringEncoding } from 'child_process';

@Injectable()
export class WqxMonlocService extends WqxMonlocData {

  constructor(private http: HttpClient) {
    super();
  }

  GetWQX_MONLOC(ActInd: boolean, OrgID: string, WQXPending: boolean): Observable<WqxMonloc[]> {
    return this.http.get<WqxMonloc[]>(WebApi.TWQXMonlocApi.getWQXMonLoc(ActInd, OrgID, WQXPending));
  }
  InsertOrUpdateWQX_MONLOC(monlocIdx: number, orgId: string, monlocId: string, monlocName: string,
    monlocType: string, monlocDesc: string, hucHeight: string, hucTwelve: string, tribalLandInd: string,
    tribalLandName: string, latitudeMsr: string, longitudeMsr: string, sourceMapScale: number,
    horizAccuracy: string, horizAccuracyUnit: string, horizCollMethod: string, horizRefDatum: string,
    vertMeasure: string, vertMeasureUnit: string, vertCollMethod: string, vertRefDatum: string,
    countryCode: string, stateCode: string, countyCode: string, wellType: string, aquiferName: string,
    formationType: string, wellholeDepthMsr: string, wellholeDepthMsrUnit: string, wqxSubmitStatus: string,
    wqxUpdateDate: string, actInd: boolean, wqxInd: boolean, createUser: string): Observable<number> {
    const httpOptions = {};
    return this.http.post<number>(WebApi.TWQXRefDataApi.InsertOrUpdateWQXMonLoc(monlocIdx, orgId, monlocId, monlocName,
      monlocType, monlocDesc, hucHeight, hucTwelve, tribalLandInd, tribalLandName, latitudeMsr, longitudeMsr, sourceMapScale,
      horizAccuracy, horizAccuracyUnit, horizCollMethod, horizRefDatum, vertMeasure, vertMeasureUnit, vertCollMethod, vertRefDatum,
      countryCode, stateCode, countyCode, wellType, aquiferName, formationType, wellholeDepthMsr, wellholeDepthMsrUnit, wqxSubmitStatus,
      wqxUpdateDate, actInd, wqxInd, createUser), '', httpOptions);
  }
  GetWQX_MONLOC_ByID(monlocIdx: number): Observable<WqxMonloc> {
    return this.http.get<WqxMonloc>(WebApi.TWQXMonlocApi.GetWQXMonLocByID(monlocIdx));
  }
  GetWQX_MONLOC_ByOrgID(orgId: string): Observable<WqxMonloc[]> {
    return this.http.get<WqxMonloc[]>(WebApi.TWQXMonlocApi.getWqxMonlocByOrgId(orgId));
  }
  DeleteT_WQX_MONLOC(monlocIdx: number, userIdx: number): Observable<number> {
    return this.http.delete<number>(WebApi.TWQXMonlocApi.deleteWQXMonLoc(monlocIdx, userIdx));
  }
  DeleteTWqxImportTempMonloc(userIdx: number): Observable<number> {
    return this.http.delete<number>(WebApi.TWQXMonlocApi.deleteTWqxImportTempMonloc(userIdx));
  }
  WQXImportMonLocAsync(orgId: string, userIdx: number): Observable<ImportStatusModel> {
    return this.http.get<ImportStatusModel>(WebApi.TWQXMonlocApi.wqxImportMonLoc(orgId, userIdx));
  }
  GetSitesAsync(actInd: boolean, orgId: string, wqxPending: boolean): Observable<MapMarkerModel[]> {
    return this.http.get<MapMarkerModel[]>(WebApi.TWQXMonlocApi.getSitesAsync(actInd, orgId, wqxPending));
  }
  GetChartData(orgId: string, chartType: string, charName: string, charName2: string, begDt: string, endDt: string, monloc: any, decimals: string, wqxInd: string): Observable<any> {
    const httpOptions = { responseType: 'text' as 'json' };
    const body = {
      orgId: orgId,
      chartType: chartType,
      charName: charName,
      charName2: charName2,
      begDt: begDt,
      endDt: endDt,
      monLoc: monloc,
      decimals: decimals,
      wqxInd: wqxInd,
    };
    return this.http.post<any>(WebApi.TWQXMonlocApi.getChartData(), body, httpOptions);
  }
}
