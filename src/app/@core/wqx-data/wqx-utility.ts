import { Observable } from 'rxjs';
import { UserOrgDisplay } from './wqx-organization';

export interface ExtLoginUser {
    userexist: boolean;
    username: string;
    password: string;
    useridx: number;
    userid: string;
    errmsg: string;
}
export interface OrgUserDisplayType {
    orgUserIdx: number;
    orgId: string;
    userId: string;
    accessLevel: string;
    statusInd: string;
    orgName: string;
    userName: string;
}
export interface JwtLoginModel {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    rememberMe: boolean;
    isLoggedIn: boolean;
    errMsg: string;
    roles: string[];
    isLockedOut: boolean;
    openWaterUserIdx: number;
    orgUsers: OrgUserDisplayType[];
}
export abstract class WqxUtilityData {
    abstract CheckUserAuthentication(payload: string): Observable<ExtLoginUser>;
    abstract CreateAndGetNewUserData(userid: string): Observable<ExtLoginUser>;
}
