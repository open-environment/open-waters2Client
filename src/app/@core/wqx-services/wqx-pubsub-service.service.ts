import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';

@Injectable({
  providedIn: 'root',
})
export class WqxPubsubServiceService {
  loadData = new ReplaySubject<any>();
  fieldData = new ReplaySubject<any>();
  charData = new ReplaySubject<any>();
  monlocChkData = new ReplaySubject<any>();
  projectChkData = new ReplaySubject<any>();
  activityChkData = new ReplaySubject<any>();

  constructor() { }

  setData(data: any) {
    this.loadData.next(data);
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
