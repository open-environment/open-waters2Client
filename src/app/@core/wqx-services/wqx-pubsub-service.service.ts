import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { AsyncSubject, BehaviorSubject } from 'rxjs';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';

@Injectable({
  providedIn: 'root',
})
export class WqxPubsubServiceService {
  // checkout BehaviorSubject, AsyncSubject
  loadData = new ReplaySubject<any>(1);
  loadOrgId = new ReplaySubject<any>(1);
  fieldData = new ReplaySubject<any>(1);
  charData = new ReplaySubject<any>(1);
  monlocChkData = new ReplaySubject<any>(1);
  projectChkData = new ReplaySubject<any>(1);
  activityChkData = new ReplaySubject<any>(1);

  constructor() { }

  setData(data: any) {

    this.loadData.next(data);
  }
  setOrgId(data: string) {
    this.loadOrgId.next(data);
    // this.loadOrgId.complete();
  }
  fieldChanged(data: any) {
    this.fieldData.next(data);
  }
  charChanged(data: any) {
    this.fieldData.next(data);
  }
  setMonLocData(data: any) {
    this.monlocChkData.next(data);
  }
  setProjectData(data: any) {
    this.projectChkData.next(data);
  }
  setActivityData(data: any) {
    this.activityChkData.next(data);
  }
}
