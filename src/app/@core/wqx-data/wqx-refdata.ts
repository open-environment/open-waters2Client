import { Observable } from 'rxjs';

export interface WqxRefDefaultTimeZone {
 timeZoneName: string;
 officialTimeZoneName: string;
 wqxCodeStandard: string;
 WqxCodeDaylight: string;
 actInd: boolean;
 updateDt: string;
 updateUserId: string;
}
export interface WqxRefData {
  refDataIdx: number;
  table: string;
  value: string;
  text: string;
  actInd: boolean;
  usedInd: boolean;
  updateDt: string;
}
export interface WqxRefCharacteristic {
  charName: string;
  defaultDetectLimit: string;
  defaultUnit: string;
  userInd: boolean;
  actInd: boolean;
  updateDt: string;
  sampFracReq: string;
  pickList: string;
}
export interface AnalMethodDisplay{
  analytiC_METHOD_IDX: number;
  analMethodDisplayName: string;
}
export interface WqxRefTaxaOrg {
  bioSubjectTaxonomy: string;
  orgId: string;
  createUserId: string;
  createDt: string;
}
export interface WqxRefCharOrg {
  charName: string;
  orgId: string;
  createUserId: string;
  createDt: string;
  defaultDetectLimit: string;
  defaultUnit: string;
  defaultAnalMethodIdx: number;
  defaultSampFraction: string;
  defaultResultStatus: string;
  defaultResultValueType: string;
  defaulLowerQuantLimit: string;
  defaultUpperQuantLimit: string;
}
export interface WqxRefCounty {
  stateCode: string;
  countyCode: string;
  countyName: string;
  actInd: boolean;
  usedInd: boolean;
  updateDt: string;

}
export abstract class WqxRefDataData {
  abstract GetT_WQX_REF_DEFAULT_TIME_ZONE(): Observable<WqxRefDefaultTimeZone[]>;
}
