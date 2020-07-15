import { Component, OnInit } from '@angular/core';
import { WqxMonloc } from '../../../../@core/wqx-data/wqx-monloc';
import { WqxProject } from '../../../../@core/wqx-data/wqx-project';
import { WqxRefData } from '../../../../@core/wqx-data/wqx-organization';
import { WqxRefSampColMethod } from '../../../../@core/wqx-data/wqx-refdata';

@Component({
  selector: 'ngx-wqx-activity-edit',
  templateUrl: './wqx-activity-edit.component.html',
  styleUrls: ['./wqx-activity-edit.component.scss'],
})
export class WqxActivityEditComponent implements OnInit {

  txtActivityID: string;
  chkActInd: boolean = false;
  monlocs: WqxMonloc[] = [];
  monlocSelected: string;
  projects: WqxProject[] = [];
  projectSelected: string;
  chkWQXInd: boolean = false;
  activityTypes: WqxRefData[] = [];
  activityTypeSelected: string;
  activityMedias: WqxRefData[] = [];
  activityMediaSelected: string;
  activitySubMedias: WqxRefData[] = [];
  activitySubMediaSelected: string;
  sampCalls: WqxRefSampColMethod[] = [];
  sampCollSelected: string;
  txtDepth: string;
  depthUnitSelected: string = '';
  equipSelected: string;
  equips: WqxRefData[] = [];
  txtActComments: string;
  assemblageSelected: string;
  assemblages: WqxRefData[] = [];
  txtSamplingComponent: string;
  txtBioDuration: string;
  bioDurUnitSelected: string;
  txtSampComponentSeq: string;
  entryTypeSelected: string;
  lblModifyDate: string;

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {

  }
}
