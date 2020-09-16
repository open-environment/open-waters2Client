import { Component, OnInit } from '@angular/core';
import { NbWindowRef } from '@nebular/theme';
import { WqxRefCharacteristic, WqxRefData, WqxRefSampColMethod } from '../../../../@core/wqx-data/wqx-refdata';
import { WQXRefDataService } from '../../../../@core/wqx-services/wqx-refdata-service';
import { TWqxImportTemplate, TWqxImportTemplateDtl } from '../../../../@core/wqx-data/wqx-import';
import { WqxImportService } from '../../../../@core/wqx-services/wqx-import.service';

@Component({
  selector: 'ngx-import-mapped-column-window',
  templateUrl: './import-mapped-column-window.component.html',
  styleUrls: ['./import-mapped-column-window.component.scss']
})
export class ImportMappedColumnWindowComponent implements OnInit {

  selectedField: string = 'ACT_COMMENTS';
  txtColumnNumber: number;
  isCharacteristicNameShow: string = '';
  isUnitCodeShow: string = '';
  isSampleFractionShow: string = '';

  chars: WqxRefCharacteristic[] = [];
  units: WqxRefData[] = [];
  sampCalls: WqxRefSampColMethod[] = [];
  selectedChar: string;
  selectedUnit: string;
  sampCollSelected: string;

  orgId: string = '';
  templateId: string = '';

  constructor(private windowRef: NbWindowRef,
    private refDataService: WQXRefDataService,
    private importService: WqxImportService) { }

  ngOnInit() {
    console.log('ngOnInit in mapped column');
    try {
      const obj = JSON.parse(this.windowRef.config.context.toString());
      this.orgId = obj.orgId;
      this.templateId = obj.templateId;
    } catch (e) {
      if (e instanceof SyntaxError) {
        console.log(e, true);
      } else {
        console.log(e, false);
      }
    }
    this.isCharacteristicNameShow = '';
    this.isUnitCodeShow = '';
    this.isSampleFractionShow = '';

    this.refDataService.GetT_WQX_REF_CHARACTERISTIC(true, false)
      .subscribe(
        (data) => { this.chars = data; },
        (err) => { console.log(err); },
      );

    this.refDataService.GetT_WQX_REF_DATA('MeasureUnit', true, true)
      .subscribe(
        (data) => { this.units = data; },
        (err) => { console.log(err); },
      );

    this.refDataService.GetT_WQX_REF_SAMP_COL_METHOD_ByContext(this.orgId)
      .subscribe(
        (data) => {
          this.sampCalls = data;
        },
      );
  }
  onSubmit() {
    const data = {} as TWqxImportTemplateDtl;
    data.colNum = this.txtColumnNumber;
    data.templateId = +this.templateId;
    data.fieldMap = this.selectedField;
    data.charName = this.selectedChar;
    data.charDefaultUnit = this.selectedUnit;
    data.charDefaultSampFraction = this.sampCollSelected;
    this.importService.InsertOrUpdateWQX_IMPORT_TEMPLATE_DTL(data).subscribe(
      (result) => {
        console.log('InsertOrUpdateWQX_IMPORT_TEMPLATE_DTL: valid');
        console.log(result);
        this.windowRef.config.context = 'success';
        this.windowRef.close();
      },
      (err) => {
        console.log('InsertOrUpdateWQX_IMPORT_TEMPLATE_DTL: failed');
        console.log(err);
        this.windowRef.config.context = 'error';
        this.windowRef.close();
      },
      () => {
        this.windowRef.config.context = 'error';
        this.windowRef.close();
      }
    );
  }
  onMappedColumnCancel() {
    this.windowRef.config.context = '';
    this.windowRef.close();
  }
  onFieldSlectionChanged(data) {
    this.isCharacteristicNameShow = '';
    this.isUnitCodeShow = '';
    this.isSampleFractionShow = '';
    switch (data) {
      case 'ACT_COMMENTS':
        break;
      case 'ACTIVITY_ID':
        break;
      case 'ACT_DEPTHHEIGHT_MSR':
        this.isUnitCodeShow = 'show';
        break;
      case 'ACT_MEDIA':
        break;
      case 'ACT_START_DATE':
        break;
      case 'ACT_START_TIME':
        break;
      case 'ACT_SUBMEDIA':
        break;
      case 'ACT_TYPE':
        break;
      case 'CHAR':
        this.isCharacteristicNameShow = 'show';
        this.isUnitCodeShow = 'show';
        this.isSampleFractionShow = 'show';
        break;
      case 'MONLOC_ID':
        break;
      case 'RESULT_VALUE_TYPE':
        break;
      case 'RESULT_STATUS':
        break;
      default:
        break;
    }
  }
  onCharSelected(event) {

  }
  onUnitSelected(event) {

  }
}
