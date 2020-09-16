import { Observable } from 'rxjs';

export interface User {
  userIdx?: number;
  name: string;
  picture: string;
  UserIDX: string;
  OrgID: string;
  isAdmin: string;
  /* MLOC_HUC_EIGHT: boolean;
  MLOC_HUC_TWELVE: boolean;
  MLOC_TRIBAL_LAND: boolean;
  MLOC_SOURCE_MAP_SCALE: boolean;
  MLOC_HORIZ_COLL_METHOD: boolean;
  MLOC_HORIZ_REF_DATUM: boolean;
  MLOC_VERT_MEASURE: boolean;
  MLOC_COUNTRY_CODE: boolean;
  MLOC_STATE_CODE: boolean;
  MLOC_COUNTY_CODE: boolean;
  MLOC_WELL_DATA: boolean;
  MLOC_WELL_TYPE: boolean;
  MLOC_AQUIFER_NAME: boolean;
  MLOC_FORMATION_TYPE: boolean;
  MLOC_WELLHOLE_DEPTH: boolean;
  PROJ_SAMP_DESIGN_TYPE_CD: boolean;
  PROJ_QAPP_APPROVAL: boolean;
  SAMP_ACT_END_DT: boolean;
  SAMP_COLL_METHOD: boolean;
  SAMP_COLL_EQUIP: boolean;
  SAMP_PREP: boolean;
  SAMP_DEPTH: boolean; */
}

export interface Contacts {
  user: User;
  type: string;
}

export interface RecentUsers extends Contacts {
  time: number;
}

export abstract class UserData {
  abstract getUsers(): Observable<User[]>;
  abstract getContacts(): Observable<Contacts[]>;
  abstract getRecentUsers(): Observable<RecentUsers[]>;
}
