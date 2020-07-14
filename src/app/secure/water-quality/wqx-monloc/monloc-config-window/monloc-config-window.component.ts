import { Component, OnInit, Input } from '@angular/core';
import { WqxMonlocConfig } from '../../../../@core/wqx-data/wqx-monloc';
import { WqxPubsubServiceService } from '../../../../@core/wqx-services/wqx-pubsub-service.service';
import { NbWindowRef } from '@nebular/theme';

@Component({
  selector: 'ngx-monloc-config-window',
  templateUrl: './monloc-config-window.component.html',
  styleUrls: ['./monloc-config-window.component.scss'],
})
export class MonlocConfigWindowComponent implements OnInit {

  config: WqxMonlocConfig[] = [];
  constructor(private pubSubService: WqxPubsubServiceService,
    private windowRef: NbWindowRef) {

  }

  ngOnInit() {
    this.config = JSON.parse(localStorage.getItem('monlocConfig'));
  }

  onConfigSave(): void {
    console.log('onConfigSave clicked!');
    localStorage.setItem('monlocConfig', JSON.stringify(this.config));
    this.pubSubService.setMonLocData(this.config);
  }
  onConfigCancel(): void {
    console.log('onConfigCancel clicked!');
    this.windowRef.close();
  }

  onChkHUC_EIGHT(checked: boolean): void {
    const hucEight: WqxMonlocConfig = this.config.find(x => x.name === 'HUC_EIGHT');
    this.config[this.config.indexOf(hucEight)].value = checked;
  }
  onChkHUC_TWELVE(checked: boolean): void {
    const hucTwelve: WqxMonlocConfig = this.config.find(x => x.name === 'HUC_TWELVE');
    this.config[this.config.indexOf(hucTwelve)].value = checked;
  }
  onChkTRIBAL_LAND(checked: boolean): void {
    const tribalLand: WqxMonlocConfig = this.config.find(x => x.name === 'TRIBAL_LAND');
    this.config[this.config.indexOf(tribalLand)].value = checked;
  }
  onChkSOURCE_MAP_SCALE(checked: boolean): void {
    const sourceMapScale: WqxMonlocConfig = this.config.find(x => x.name === 'SOURCE_MAP_SCALE');
    this.config[this.config.indexOf(sourceMapScale)].value = checked;
  }
  onChkHORIZ_COLL_METHOD(checked: boolean): void {
    const horizCollMethod: WqxMonlocConfig = this.config.find(x => x.name === 'HORIZ_COLL_METHOD');
    this.config[this.config.indexOf(horizCollMethod)].value = checked;
  }
  onChkHORIZ_REF_DATUM(checked: boolean): void {
    const horizRefDatum: WqxMonlocConfig = this.config.find(x => x.name === 'HORIZ_REF_DATUM');
    this.config[this.config.indexOf(horizRefDatum)].value = checked;
  }
  onChkERT_MEASURE(checked: boolean): void {
    const ertMeasure: WqxMonlocConfig = this.config.find(x => x.name === 'ERT_MEASURE');
    this.config[this.config.indexOf(ertMeasure)].value = checked;
  }
  onChkCOUNTRY_CODE(checked: boolean): void {
    const countryCode: WqxMonlocConfig = this.config.find(x => x.name === 'COUNTRY_CODE');
    this.config[this.config.indexOf(countryCode)].value = checked;
  }
  onChkSTATE_CODE(checked: boolean): void {
    const stateCode: WqxMonlocConfig = this.config.find(x => x.name === 'STATE_CODE');
    this.config[this.config.indexOf(stateCode)].value = checked;
  }
  onChkCOUNTY_CODE(checked: boolean): void {
    const countyCode: WqxMonlocConfig = this.config.find(x => x.name === 'COUNTY_CODE');
    this.config[this.config.indexOf(countyCode)].value = checked;
  }
  onChkWELL_TYPE(checked: boolean): void {
    const wellType: WqxMonlocConfig = this.config.find(x => x.name === 'WELL_TYPE');
    this.config[this.config.indexOf(wellType)].value = checked;
  }
  onChkAQUIFER_NAME(checked: boolean): void {
    const aquiferName: WqxMonlocConfig = this.config.find(x => x.name === 'AQUIFER_NAME');
    this.config[this.config.indexOf(aquiferName)].value = checked;
  }
  onChkFORMATION_TYPE(checked: boolean): void {
    const formationType: WqxMonlocConfig = this.config.find(x => x.name === 'FORMATION_TYPE');
    this.config[this.config.indexOf(formationType)].value = checked;
  }
  onChkWELLHOLE_DEPTH(checked: boolean): void {
    const wellholeDepth: WqxMonlocConfig = this.config.find(x => x.name === 'WELLHOLE_DEPTH');
    this.config[this.config.indexOf(wellholeDepth)].value = checked;
  }
}
