import { Observable } from 'rxjs';

export interface WqxProject {
  projectIdx: number;
  OrgId: string;
  projectID: string;
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
}
export abstract class WqxProjectData {
  abstract GetWQX_PROJECTS(): Observable<WqxProject[]>;
}
