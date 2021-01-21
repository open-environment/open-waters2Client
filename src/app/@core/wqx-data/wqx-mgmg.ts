import { Observable } from 'rxjs';

export interface VWqxTransactionLogModel {
    wqxTransactionLog: VWqxTransactionLog;
    responseFileXML: string;
}
export interface VWqxTransactionLog {
    logId: number;
    tableCd: string;
    tableIdx: number;
    submitDt: string;
    submitType: string;
    responseFile: Uint16Array;
    responseTxt: string;
    cdxSubmitTransId: string;
    cdxSubmitStatus: string;
    orgId: string;
    record: string;
    responseFileText: string;
}

export interface VWqxPendingRecords {
    recIdx: number;
    tableCd: string;
    recId: string;
    orgId: string;
    userId: string;
    updateDt: string;
}
export interface TOeAppTasks {
    taskIdx: number;
    taskName: string;
    taskDesc: string;
    taskStatus: string;
    taskFreqMs: number;
    modifyUserId: string;
    modifyDt: string;
}

export interface CDXCredentials {
    userID: string;
    credential: string;
    nodeURL: string;
}
export abstract class WqxMgmtData {
    abstract GetV_WQX_TRANSACTION_LOG(tableCd: string,
        startDt: string, endDt: string, orgId: string):
        Observable<VWqxTransactionLog[]>;
    abstract GetV_WQX_PENDING_RECORDS(orgId: string,
        startDt: string, endDt: string):
        Observable<VWqxPendingRecords[]>;
    abstract GetT_OE_APP_TASKS_ByName(taskName: string): Observable<TOeAppTasks>;
}
