import { Injectable } from '@angular/core';
import { WqxMgmtData, VWqxTransactionLog, VWqxPendingRecords, TOeAppTasks, CDXCredentials, VWqxTransactionLogModel } from '../wqx-data/wqx-mgmg';
import { Observable } from 'rxjs';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { WebApi } from '../utils/web-api';

@Injectable({
  providedIn: 'root',
})
export class WqxMgmtService extends WqxMgmtData {



  constructor(private http: HttpClient) {
    super();
  }

  GetV_WQX_TRANSACTION_LOG(tableCd: string,
    startDt: string, endDt: string, orgId: string): Observable<VWqxTransactionLog[]> {
    return this.http.get<VWqxTransactionLog[]>(
      WebApi.MgmtApi.getVWqxTransactionLog(tableCd, startDt, endDt, orgId));
  }
  GetWQX_TRANSACTION_LOG(tableCd: string, tableIdx: number): Observable<VWqxTransactionLog[]> {
    return this.http.get<VWqxTransactionLog[]>(
      WebApi.MgmtApi.getWqxTransactionLog(tableCd, tableIdx));
  }
  GetV_WQX_PENDING_RECORDS(orgId: string,
    startDt: string, endDt: string): Observable<VWqxPendingRecords[]> {
    return this.http.get<VWqxPendingRecords[]>(
      WebApi.MgmtApi.getVWqxPendingRecords(orgId, startDt, endDt));
  }

  GetT_OE_APP_TASKS_ByName(taskName: string): Observable<TOeAppTasks> {
    return this.http.get<TOeAppTasks>(
      WebApi.MgmtApi.getTOeAppTasksByName(taskName));
  }
  UpdateT_OE_APP_TASKS(data: TOeAppTasks): Observable<number> {
    const httpOptions = {};
    const body = {
      taskIdx: data.taskIdx,
      taskName: data.taskName,
      taskDesc: data.taskDesc,
      taskStatus: data.taskStatus,
      taskFreqMs: data.taskFreqMs,
      modifyUserId: data.modifyUserId,
      modifyDt: data.modifyDt,
    };
    return this.http.put<number>(WebApi.MgmtApi.updateTOeAppTasks(), body, httpOptions);
  }
  GetWQX_TRANSACTION_LOG_ByLogID(logId: number): Observable<VWqxTransactionLogModel> {
    return this.http.get<VWqxTransactionLogModel>(
      WebApi.MgmtApi.getWqxTransactionLogByLogId(logId));
  }
  WQX_Master(orgId: string): Observable<number> {
    return this.http.get<number>(WebApi.MgmtApi.wqxMaster(orgId));
  }
  getCdxSubmitCredentials2(orgId: string): Observable<CDXCredentials> {
    return this.http.get<CDXCredentials>(WebApi.MgmtApi.getCdxSubmitCredentials2(orgId));
  }
  WQX_Submit_OneByOneAsync(typeText: string, recordIdx: number, userId: string, credential: string, nodeUrl: string, orgId: string, insUpdIndicator: boolean): Observable<number> {
    return this.http.get<number>(WebApi.MgmtApi.wqxSubmitOneByOne(typeText, recordIdx, userId, credential, nodeUrl, orgId, insUpdIndicator));
  }
}
