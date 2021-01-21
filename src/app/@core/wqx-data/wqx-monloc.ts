import { Observable } from 'rxjs';

export interface WqxMonloc4Excel {
  ID: string;
  Name: string;
  Type: string;
  Description: string;
  EightDigitHUC: string;
  TwelveDigitHUC: string;
  TribalLand: string;
  Latitude: string;
  Longitude: string;
  SourceMapScale: string;
  HorizCollectionMethod: string;
  HorizDatum: string;
  VertialMeasure: string;
  Unit: string;
  VerticalCollectionMethod: string;
  VerticalDatum: string;
  County: string;
  State: string;
  Country: string;
  WellType: string;
  Aquifer: string;
  Formation: string;
  WellholeDepth: string;
  DepthUnit: string;
  SendToEPA: string;
}
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
  drainageArea: string;
  contributingDrainageArea: string;
  vertMeasureUnit: string;
  drainageAreaUnit: string;
  contributingDrainageAreaUnit: string;
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

  horizontalCollectionMethodName: string;
  horizontalCoordinateReferenceSystemDatumName: string;
  aquiferTypeName: string;
  nationalAquiferCode: string;
  localAquiferCode: string;
  localAquiferCodeCtx: string;
  localAquiferDesc: string;
  constructionDate: string;
  wellDepthMeasure: string
  wellDepthMeasureUnit: string

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
export interface MapMarkerModel {
  lat: string;
  lng: string;
  infoTitle: string;
  infoBody: string;
}
export abstract class WqxMonlocData {
  abstract GetWQX_MONLOC(ActInd: boolean, OrgID: string, WQXPending: boolean): Observable<WqxMonloc[]>;
}
