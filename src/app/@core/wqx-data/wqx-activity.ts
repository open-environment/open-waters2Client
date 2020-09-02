import { Observable } from 'rxjs';

export interface WqxActivity {
  activityIdx: number;
  orgId: string;
  projectIdx: number;
  monlocIdx: number;
  activityId: string;
  actType: string;
  actMedia: string;
  actSubmedia: string;
  actStartDt: string;
  actEndDt: string;
  actTimeZone: string;
  relativeDepthName: string;
  actDepthheightMsr: string;
  actDepthheightMsrUnit: string;
  topDepthHeightMSR: string;
  topDepthHeightMSRUnit: string;
  botDepthHeightMSR: string;
  botDepthHeightMSRUnit: string;
  depthRefPoint: string;
  actComment: string;
  bioAssemblageSampled: string;
  bioDurationMsr: string;
  bioDurationMsrUnit: string;
  bioSampComponent: string;
  bioSampComponentSeq: string;
  bioReachLenMSR: string;
  bioReachLenMSRUnit: string;
  bioReachWidMSR: string;
  bioReachWidMSRUnit: string;
  bioPassCount: number;
  bioNetType: string;
  bioNetAreaMSR: string;
  bioNetAreaMSRUnit: string;
  bioNetMeshSizeMSR: string;
  bioNetMeshSizeMSRUnit: string;
  bioBoatSpeedMSR: string;
  bioBoatSpeedMSRUnit: string;
  bioCurrentSpeedMSR: string;
  bioCurrentSpeedMSRUnit: string;
  bioToxicityTestType: string;
  sampCollEquip: string;
  sampPrepCountType: string;
  sampPrepCountColor: string;
  sampPrepChemPreserv: string;
  sampPrepThermPreserv: string;
  sampPrepStorageDesc: string;
  wqxInd: boolean;
  wqxSubmitStatus: string;
  wqxUpdateDt: string;
  actInd: boolean;
  createDt: string;
  createUserId: string;
  updateDt: string;
  updateUserId: string;
  sampCollMethodIdx: number;
  sampPrefIdx: number;
  tempSampIdx: number;
  entryType: string;
}

export interface ActivityListDisplay {
  activityIdx: number;
  orgId: string;
  projectId: string;
  monlocId: string;
  activityId: string;
  actType: string;
  actMedia: string;
  actSubMedia: string;
  actStartDt: string;
  actEndDt: string;
  actDeptHeightMsr: string;
  actDeptHeightMsrUnit: string;
  topDeptHeightMsr: string;
  botDeptHeightMsr: string;
  depthRefPoint: string;
  actComment: string;
  sampCollMethod: string;
  sampCollEquip: string;
  sampCollEquipComment: string;
  sampPrepMethod: string;
  wqxInd: string;
  wqxSubmitStatus: string;
  actInd: boolean;
}

export interface WqxActivityConfig {
  name: string;
  value: boolean;
  field: string;
  header: string;
}

export interface WqxResult {
  resultIdx: number;
  activityIdx: number;
  dataLoggerLine: string;
  resultDetectCondition: string;
  charName: string;
  methodSpeciationName: string;
  resultSampFraction: string;
  resultMsr: string;
  resultMsrUnit: string;
  resultMsrQual: string;
  resultStatus: string;
  statisticBaseCode: string;
  resultValueType: string;
  weightBasis: string;
  timeBasis: string;
  tempBasis: string;
  particlesizeBasis: string;
  precisionValue: string;
  biasValue: string;
  confidenceIntervalValue: string;
  upperConfidenceLimit: string;
  lowerConfidenceLimit: string;
  resultComment: string;
  depthHeightMsr: string;
  depthHeightMsrUnit: string;
  depthaltituderefpoint: string;
  resultSampPoint: string;
  bioIntentName: string;
  bioIndividualId: string;
  bioSubjectTaxonomy: string;
  bioUnidentifiedSpeciesId: string;
  bioSampleTissueAnatomy: string;
  grpSummCountWeightMsr: string;
  grpSummCountWeightMsrUnit: string;
  taxDtlCellForm: string;
  taxDtlCellShape: string;
  taxDtlHabit: string;
  taxDtlVoltinism: string;
  taxDtlPollTolerance: string;
  taxDtlPollToleranceScale: string;
  taxDtlTrophicLevel: string;
  tTaxDtlFuncFeedingGroup1: string;
  taxDtlFuncFeedingGroup2: string;
  taxDtlFuncFeedingGroup3: string;
  freqClassCode: string;
  freqClassUnit: string;
  freqClassUpper: string;
  freqClassLower: string;
  analyticMethodIdx: number;
  labIdx: number;
  labAnalysisStartDt: Date;
  labAnalysisEndDt: string;
  labAnalysisTimezone: string;
  resultLabCommentCode: string;
  detectionLimitType: string;
  detectionLimit: string;
  labTaxonAccredInd: string;
  labTaxonAccredAuthority: string;
  labReportingLevel: string;
  pql: string;
  lowerQuantLimit: string;
  upperQuantLimit: string;
  detectionLimitUnit: string;
  labSampPrepIdx: number;
  labSampPrepStartDt: string;
  labSampPrepEndDt: string;
  dilutionFactor: string;
}
export abstract class WqxActivityData {
  abstract GetWQX_Activities(ActInd: boolean, OrgID: string, MonLocIDX: number, startDt: string, endDt: string, ActType: string, WQXPending: boolean, ProjectIDX: number): Observable<WqxActivity[]>;
}
