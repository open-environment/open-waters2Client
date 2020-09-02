import { Component, OnInit } from '@angular/core';
import { WqxActivityConfig } from '../../../../@core/wqx-data/wqx-activity';
import { WqxPubsubServiceService } from '../../../../@core/wqx-services/wqx-pubsub-service.service';
import { NbWindowRef } from '@nebular/theme';

@Component({
  selector: 'ngx-activity-config-window',
  templateUrl: './activity-config-window.component.html',
  styleUrls: ['./activity-config-window.component.scss'],
})
export class ActivityConfigWindowComponent implements OnInit {

  config: WqxActivityConfig[] = [];
  constructor(private pubSubService: WqxPubsubServiceService,
    private windowRef: NbWindowRef) { }

  ngOnInit() {
    this.config = JSON.parse(localStorage.getItem('activityConfig'));
  }

  onConfigSave(): void {
    localStorage.setItem('activityConfig', JSON.stringify(this.config));
    this.pubSubService.setActivityData(this.config);
    this.windowRef.close();
  }
  onConfigCancel(): void {
    console.log('onConfigCancel clicked!');
    this.windowRef.close();
  }
  onSAMP_ACT_END_DT(checked: boolean): void {
    const sampActEndDt: WqxActivityConfig = this.config.find(x => x.name === 'SAMP_ACT_END_DT');
    console.log(this.config.indexOf(sampActEndDt));
    this.config[this.config.indexOf(sampActEndDt)].value = checked;
  }
  onSAMP_COLL_METHOD(checked: boolean): void {
    const sampCollmethod: WqxActivityConfig = this.config.find(x => x.name === 'SAMP_COLL_METHOD');
    this.config[this.config.indexOf(sampCollmethod)].value = checked;
  }
  onSAMP_COLL_EQUIP(checked: boolean): void {
    const sampCollEquip: WqxActivityConfig = this.config.find(x => x.name === 'SAMP_COLL_EQUIP');
    this.config[this.config.indexOf(sampCollEquip)].value = checked;
  }
  onSAMP_PREP(checked: boolean): void {
    const sampPrep: WqxActivityConfig = this.config.find(x => x.name === 'SAMP_PREP');
    this.config[this.config.indexOf(sampPrep)].value = checked;
  }
  onSAMP_DEPTH(checked: boolean): void {
    const sampDepth: WqxActivityConfig = this.config.find(x => x.name === 'SAMP_DEPTH');
    this.config[this.config.indexOf(sampDepth)].value = checked;
  }
}
