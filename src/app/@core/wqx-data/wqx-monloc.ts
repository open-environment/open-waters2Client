import { Observable } from 'rxjs';

export interface WqxMonloc {
  monlocIdx: number;
  orgId: string;
  monlocId: string;
  monlocName: string;
  monlocType: string;
  monlocDesc: string;
  hucEight: string;
  hucTwelve: string;
  tribalLandInd: string;
  tribalLandName: string;
  latitudeMsr: string;
  longitudeMsr: string;
  sourceMapScale: number;
  horizAccuracy: string;
  horizAccuracyUnit: string;
  horizCollMethod: string;
  horizRefDatum: string;
  vertMeasure: string;
  vertMeasureUnit: string;
  vertCollMethod: string;
  vertRefDatum: string;
  countryCode: string;
  stateCode: string;
  countyCode: string;
  wellType: string;
  aquiferName: string;
  formationType: string;
  wellholeDepthMsr: string;
  wellholeDepthMsrUnit: string;
  wqxInd: boolean;
  wqxSubmitStatus: string;
  wqxUpdateDt: string;
  importMonlocId: string;
  actInd: boolean;
  createDt: string;
  createUserId: string;
  updateDt: string;
  updateUserId: string;
}
export interface WqxMonlocConfig {
  name: string;
  value: boolean;
  field: string;
  header: string;
}

export abstract class WqxMonlocData {
  abstract GetWQX_MONLOC(ActInd: boolean, OrgID: string, WQXPending: boolean): Observable<WqxMonloc[]>;
}
