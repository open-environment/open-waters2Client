import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WqxActivity, WqxActivityData, ActivityListDisplay, WqxResult, VWqxActivityLatest, CharDisplay } from '../wqx-data/wqx-activity';
import { HttpClient } from '@angular/common/http';
import { WebApi } from '../utils/web-api';
import { WqxRefData } from '../wqx-data/wqx-organization';

@Injectable()
export class WQXActivityService extends WqxActivityData {

  constructor(private http: HttpClient) {
    super();
  }

  GetWQX_Activities(ActInd: boolean, OrgID: string, MonLocIDX: number, startDt: string, endDt: string, ActType: string, WQXPending: boolean, ProjectIDX: number): Observable<WqxActivity[]> {
    return this.http.get<WqxActivity[]>(WebApi.TWQXActivityApi.getAllActivities(ActInd, OrgID, MonLocIDX, startDt, endDt, ActType, WQXPending, ProjectIDX));
  }
  GetT_WQX_RESULTCount(OrgID: string): Observable<number> {
    return this.http.get<number>(WebApi.TWQXActivityApi.getTWQXResulTCount(OrgID));
  }
  getWQXActivityMyOrgCount(userIDX: number): Observable<number> {
    return this.http.get<number>(WebApi.TWQXActivityApi.getWQXActivityMyOrgCount(userIDX));
  }
  getWqxActivityDisplay(actInd: boolean, orgId: string, monLocIdx: number, startDt: string, endDt: string, actType: string, wQXPending: boolean, projectIdx: number, wQXStatus: string): Observable<ActivityListDisplay[]> {
    return this.http.get<ActivityListDisplay[]>(WebApi.TWQXActivityApi.getWqxActivityDisplay(actInd, orgId, monLocIdx, startDt, endDt, actType, wQXPending, projectIdx, wQXStatus));
  }
  DeleteT_WQX_ACTIVITY(activityIdx: number, userIdx: number): Observable<number> {
    return this.http.delete<number>(WebApi.TWQXActivityApi.deleteTWqxActivity(activityIdx, userIdx));
  }
  InsertOrUpdateWQX_ACTIVITY(activityIdx: number, orgId: string, projectIdx: number, monlocIdx: number, activityId: string,
    actType: string, actMedia: string, actSubMedia: string, actStartDate: string, actEndDt: string,
    actTimeZone: string, relativeDepthName: string, actDepthHeightMsr: string, actDepthHeightMsrUnit: string,
    topDepthHeightMsr: string, topDepthHeightMsrUnit: string, botDepthHeightMsr: string, botDepthHeightMsrUnit: string,
    depthRefPoint: string, actComment: string, bioAssemblageSampled: string, bioDurationMsr: string,
    bioDurationMsrUnit: string, bioSampComponent: string, bioSampComponentSeq: number, bioReachLenMsr: string,
    bioReachLenMsrUnit, bioReachWidMsr: string, bioReachWidMsrUnit: string, bioPassCount: number,
    bioNetType: string, bioNetAreaMsr: string, bioNetAreaMsrUnit: string, bioNetMeshsizeMsr: string,
    bioMeshsizeMsrUnit, bioBoatSpeedMsr: string, bioBoatSpeedMsrUnit: string, bioCurrSpeedMsr: string,
    bioCurrSpeedMsrUnit, bioToxicityTestType: string, sampCollMethodIdx: number, sampCollEquip: string, sampCollEquipComment: string,
    sampPrepIdx: number, sampPrepCountType: string, sampPrepContColor: string, sampPrepChemPeserv: string, sampPrepThermPreserv: string,
    sampPrepStorageDesc, wqxSubmitStatus: string, actInd: boolean, wqxInd: boolean, creatUser: string, entryType: string,
    activityIDUserSupplied: string, sampCompName: string, activityLocDescText: string,
    measureValue: string, gearProcUnitSel: string, habitatSelMethod: string, methodName: string,
    thermalPreservativeUsedName: string, hydrologicCondition: string, sampContLabName: string, hydrologicEvent: string,
    horizCollMethod: string, horizCoRefSysDatumName: string, latitudeMsr: string, longitudeMsr: string,
  ) {
    const httpOptions = {};
    let body = {} as WqxActivity;
    body.activityIdx = activityIdx;
    body.orgId = orgId;
    body.projectIdx = projectIdx;
    body.monlocIdx = monlocIdx;
    body.activityId = activityId;
    body.actType = actType;
    body.actMedia = actMedia
    body.actSubmedia = actSubMedia;
    body.actStartDt = actStartDate;
    body.actEndDt = actEndDt;
    body.actTimeZone = actTimeZone;
    body.relativeDepthName = relativeDepthName;
    body.actDepthheightMsr = actDepthHeightMsr;
    body.actDepthheightMsrUnit = actDepthHeightMsrUnit;
    body.topDepthHeightMSR = topDepthHeightMsr;
    body.topDepthHeightMSRUnit = topDepthHeightMsrUnit;
    body.botDepthHeightMSR = botDepthHeightMsr;
    body.botDepthHeightMSRUnit = botDepthHeightMsrUnit;
    body.depthRefPoint = depthRefPoint;
    body.actComment = actComment;
    body.bioAssemblageSampled = bioAssemblageSampled;
    body.bioDurationMsr = bioDurationMsr;
    body.bioDurationMsrUnit = bioDurationMsrUnit;
    body.bioSampComponent = bioSampComponent;
    body.bioSampComponentSeq = bioSampComponentSeq.toString();
    body.bioReachLenMSR = bioReachLenMsr;
    body.bioReachLenMSRUnit = bioReachLenMsrUnit;
    body.bioReachWidMSR = bioReachWidMsr;
    body.bioReachWidMSRUnit = bioReachWidMsrUnit;
    body.bioPassCount = bioPassCount;
    body.bioNetType = bioNetType;
    body.bioNetAreaMSR = bioNetAreaMsr;
    body.bioNetAreaMSRUnit = bioNetAreaMsrUnit;
    body.bioNetMeshSizeMSR = bioNetMeshsizeMsr;
    body.bioNetMeshSizeMSRUnit = bioMeshsizeMsrUnit;
    body.bioBoatSpeedMSR = bioBoatSpeedMsr;
    body.bioBoatSpeedMSRUnit = bioBoatSpeedMsrUnit;
    body.bioCurrentSpeedMSR = bioCurrSpeedMsr;
    body.bioCurrentSpeedMSRUnit = bioCurrSpeedMsrUnit;
    body.bioToxicityTestType = bioToxicityTestType;
    body.sampCollMethodIdx = sampCollMethodIdx;
    body.sampCollMethodIdx = +sampCollEquip;
    body.sampCollEquipComment = sampCollEquipComment;
    body.sampPrefIdx = sampPrepIdx;
    body.sampPrepCountType = sampPrepCountType;
    body.sampPrepCountColor = sampPrepContColor;
    body.sampPrepChemPreserv = sampPrepChemPeserv;
    body.sampPrepThermPreserv = sampPrepThermPreserv;
    body.sampPrepStorageDesc = sampPrepStorageDesc;
    body.wqxSubmitStatus = wqxSubmitStatus;
    body.actInd = actInd;
    body.wqxInd = wqxInd;
    body.createUserId = creatUser;
    body.entryType = entryType;
    body.activityIdentifierUserSupplied = activityIDUserSupplied;
    body.samplingComponentName = sampCompName;
    body.activityLocationDescriptionText = activityLocDescText;
    body.measureValue = measureValue;
    body.gearProcedureUnitCode = gearProcUnitSel;
    body.habitatSelectionMethod = habitatSelMethod;
    body.methodName = methodName;
    body.thermalPreservativeUsedName = thermalPreservativeUsedName;
    body.hydrologicCondition = hydrologicCondition;
    body.sampleContainerLabelName = sampContLabName;
    body.hydrologicEvent = hydrologicEvent;
    body.horizCollMethod = horizCollMethod;
    body.horizCoRefSysDatumName = horizCoRefSysDatumName;
    body.latitudeMsr = latitudeMsr;
    body.longitudeMsr = longitudeMsr;
    return this.http.post<number>(WebApi.TWQXActivityApi.insertOrUpdateWqxActivity(), body, httpOptions);
    /* return this.http.post<number>(WebApi.TWQXRefDataApi.insertOrUpdateWqxActivity(activityIdx, orgId, projectIdx, monlocIdx, activityId,
      actType, actMedia, actSubMedia, actStartDate, actEndDt,
      actTimeZone, relativeDepthName, actDepthHeightMsr, actDepthHeightMsrUnit,
      topDepthHeightMsr, topDepthHeightMsrUnit, botDepthHeightMsr, botDepthHeightMsrUnit,
      depthRefPoint, actComment, bioAssemblageSampled, bioDurationMsr,
      bioDurationMsrUnit, bioSampComponent, bioSampComponentSeq, bioReachLenMsr,
      bioReachLenMsrUnit, bioReachWidMsr, bioReachWidMsrUnit, bioPassCount,
      bioNetType, bioNetAreaMsr, bioNetAreaMsrUnit, bioNetMeshsizeMsr,
      bioMeshsizeMsrUnit, bioBoatSpeedMsr, bioBoatSpeedMsrUnit, bioCurrSpeedMsr,
      bioCurrSpeedMsrUnit, bioToxicityTestType, sampCollMethodIdx, sampCollEquip, sampCollEquipComment,
      sampPrepIdx, sampPrepCountType, sampPrepContColor, sampPrepChemPeserv, sampPrepThermPreserv,
      sampPrepStorageDesc, wqxSubmitStatus, actInd, wqxInd, creatUser, entryType,
      activityIDUserSupplied, sampCompName, activityLocDescText,
      measureValue, gearProcUnitSel, habitatSelMethod, methodName,
      thermalPreservativeUsedName, hydrologicCondition, sampContLabName, hydrologicEvent,
      horizCollMethod, horizCoRefSysDatumName, latitudeMsr, longitudeMsr,
    ), '', httpOptions); */
  }
  GetT_WQX_REF_DATA_ActivityTypeUsed(orgId: string): Observable<WqxRefData[]> {
    return this.http.get<WqxRefData[]>(WebApi.TWQXActivityApi.getTWqxRefDataActivityTypeUsed(orgId));
  }
  GetWQX_ACTIVITY_ByID(activityIdx: number): Observable<WqxActivity> {
    return this.http.get<WqxActivity>(WebApi.TWQXActivityApi.getWqxActivityById(activityIdx));
  }
  GetT_WQX_RESULT(activityIdx: number): Observable<WqxResult[]> {
    return this.http.get<WqxResult[]>(WebApi.TWQXActivityApi.getTWqxResult(activityIdx));
  }
  UpdateWQX_ACTIVITY_WQXStatus(activityIdx: number, wqxSubmitStatus, actInd: boolean, wqxInd: boolean, createUser: string): Observable<number> {
    const httpOptions = {};
    return this.http.put<number>(WebApi.TWQXRefDataApi.updateWqxActivityWqxStatus(activityIdx, wqxSubmitStatus, actInd, wqxInd, createUser), '', httpOptions);
  }
  DeleteTWqxImportTempSample(userIdx: number): Observable<number> {
    return this.http.delete<number>(WebApi.TWQXActivityApi.deleteTWqxImportTempSample(userIdx));
  }
  GetVWqxActivityLatest(orgId: string): Observable<VWqxActivityLatest[]> {
    return this.http.get<VWqxActivityLatest[]>(WebApi.TWQXActivityApi.getVWqxActivityLatest(orgId));
  }
  GetTWqxResultSampledCharacteristics(orgId: string): Observable<CharDisplay[]> {
    return this.http.get<CharDisplay[]>(WebApi.TWQXActivityApi.getTWqxResultSampledCharacteristics(orgId));
  }
}
