import { Component, OnInit, Input } from '@angular/core';
import { WqxMonlocConfig } from '../../../../@core/wqx-data/wqx-monloc';
import { WqxPubsubServiceService } from '../../../../@core/wqx-services/wqx-pubsub-service.service';
import { NbWindowRef } from '@nebular/theme';
import { WqxProjectConfig } from '../../../../@core/wqx-data/wqx-project';

@Component({
  selector: 'ngx-project-config-window',
  templateUrl: './project-config-window.component.html',
  styleUrls: ['./project-config-window.component.scss'],
})
export class ProjectConfigWindowComponent implements OnInit {

  config: WqxProjectConfig[] = [];
  constructor(private pubSubService: WqxPubsubServiceService,
    protected windowRef: NbWindowRef) {
   }

  ngOnInit() {
    this.config = JSON.parse(localStorage.getItem('projectConfig'));
  }

  onConfigSave(): void {
    console.log('onConfigSave clicked!');
    localStorage.setItem('projectConfig', JSON.stringify(this.config));
    this.pubSubService.setProjectData(this.config);
    this.windowRef.close();
  }
  onConfigCancel(): void {
    console.log('onConfigCancel clicked!');
    this.windowRef.close();
  }

  onChkAMP_DESIGN_TYPE_CD(checked: boolean): void {
    const ampDesignTypeCd: WqxProjectConfig = this.config.find(x => x.name === 'SAMP_DESIGN_TYPE_CD');
    this.config[this.config.indexOf(ampDesignTypeCd)].value = checked;
  }
  onChkQAPP_APPROVAL(checked: boolean): void {
    const qappApproval: WqxProjectConfig = this.config.find(x => x.name === 'QAPP_APPROVAL');
    this.config[this.config.indexOf(qappApproval)].value = checked;
  }
}
