import { Observable } from 'rxjs';

export interface WqxRefData {
  refDataIdx: number;
  table: string;
  value: string;
  text: string;
  actInd: boolean;
  usedInd: boolean;
  updateDt: string;
}
export interface WqxAllOrgs {
  orgId: string;
  orgFormalname: string;
  src: string;
}
export interface ConnectTestResult {
  lblAuthResult: string;
  lblSubmitResult: string;
  lblCDXSubmitInd: string;
  msg: string;
  typ: string;
}
export interface WqxOrganization {
  orgId: string;
  orgFormalName: string;
  orgDesc: string;
  tribalCode: string;
  electronicaddress: string;
  electronicaddresstype: string;
  telephoneNum: string;
  telephoneNumType: string;
  telephoneExt: string;
  cdxSubmitterId: string;
  cdxSubmitterPwdHash: string;
  cdxSubmitterPwdSalt: string;
  cdxSubmitInd: boolean;
  defaultTimezone: string;
  mailingAddress: string;
  mailingAddress2: string;
  mailingAddCity: string;
  mailingAddState: string;
  mailingAddZip: string;
  createDt: string;
  createUserid: string;
  updateDt: string;
  updateUserid: string;
}
export interface EPAOrganization {
  orgID: string;
  orgFormalName: string;
  updateDate: string;
}
export interface UserOrgDisplay {
  userIDX: number;
  userID: string;
  userName: string;
  orgID: string;
  roleCD: string;
}
export interface MyAccountModel {
  user: TOeUsers;
  roles: string[];
  organizations: string[];
}
export interface TOeUsers {
  UserIdx: number;
  UserId: string;
  PwdHash: string;
  PwdSalt: string;
  Fname: string;
  Lname: string;
  Email: string;
  InitalPwdFlag: boolean;
  EffectiveDt: string;
  LastloginDt: string;
  Phone: string;
  PhoneExt: string;
  DefaultOrgId: string;
  ActInd: boolean;
  CreateUserid: string;
  CreateDt: string;
  ModifyUserid: string;
  ModifyDt: string;
}
export interface WqxImportTranslate {
  translateIdx: string;
  orgId: string;
  colName: string;
  dataFrom: string;
  dataTo: string;
  createDt: string;
  createUserId: string;
}
export abstract class WqxOrganizationData {
  abstract GetWQX_USER_ORGS_ByUserIDX(userIDX: number, excludePendingInd: boolean): Observable<WqxOrganization[]>;
  abstract getVWQXAllOrgs(): Observable<WqxAllOrgs[]>;
}
