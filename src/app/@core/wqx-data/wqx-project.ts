import { Observable } from 'rxjs';

export interface WqxProject4Excel {
  ID: string;
  Name: string;
  Description: string;
  SamplingDesignType: string;
  QAPPApproval: string;
  QAPPApprovalAgency: string;
  Active: string;
  SendToEPA: string;
}

export interface WqxProject {
  projectIdx: number;
  OrgId: string;
  projectId: string;
  projectName: string;
  projectDesc: string;
  sampDesignTypeCd: string;
  qappApprovalInd: boolean;
  qappApprovalAgency: string;
  wqxInd: boolean;
  wqxSubmitStatus: string;
  wqxUpdateDt: string;
  actInd: boolean;
  createDt: string;
  createUserid: string;
  updateDt: string;
  updateUserid: string;
}
export interface WqxProjectConfig {
  name: string;
  value: boolean;
  field: string;
  header: string;
}
export abstract class WqxProjectData {
  abstract GetWQX_PROJECTS(): Observable<WqxProject[]>;
}
