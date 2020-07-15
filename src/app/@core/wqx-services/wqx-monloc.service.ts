import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { WebApi } from '../utils/web-api';
import { WqxMonlocData, WqxMonloc } from '../wqx-data/wqx-monloc';

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
}
