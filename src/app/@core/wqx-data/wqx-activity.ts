import { Observable } from 'rxjs';

export interface WqxActivity {
  activityIDX: number;
  orgID: string;
  projectIDX: number;
  monlocIDX: number;
  activityID: string;
  actType: string;
  actMedia: string;
  actSubMedia: string;
  actStartDt: string;
  actEndDt: string;
  actTimeZone: string;
  relativeDepthName: string;
  actDepthHeightMSR: string;
  actDepthHeightMSRUnit: string;
  topDepthHeightMSR: string;
  topDepthHeightMSRUnit: string;
  botDepthHeightMSR: string;
  botDepthHeightMSRUnit: string;
  depthRefPoint: string;
  actComment: string;
  bioAssemblageSample: string;
  bioDurationMSR: string;
  bioDurationMSRUnit: string;
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
  sampCallEquip: string;
  sampPrepCountType: string;
  sampPrepCountColor: string;
  sampPrepChemPreserv: string;
  sampPrepThermPreserv: string;
  sampPrepStorageDesc: string;
  wQXInd: boolean;
  wQXSubmitStatus: string;
  wQXUpdateDt: string;
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

export abstract class WqxActivityData {
  abstract GetWQX_Activities(ActInd: boolean, OrgID: string, MonLocIDX: number, startDt: string, endDt: string, ActType: string, WQXPending: boolean, ProjectIDX: number): Observable<WqxActivity[]>;
}
