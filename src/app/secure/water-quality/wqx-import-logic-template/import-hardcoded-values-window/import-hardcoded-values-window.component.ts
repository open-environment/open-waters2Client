import { Component, OnInit } from '@angular/core';
import { WqxRefSampColMethod } from '../../../../@core/wqx-data/wqx-refdata';
import { WQXRefDataService } from '../../../../@core/wqx-services/wqx-refdata-service';
import { NbWindowRef } from '@nebular/theme';
import { WqxImportService } from '../../../../@core/wqx-services/wqx-import.service';
import { TWqxImportTemplateDtl } from '../../../../@core/wqx-data/wqx-import';

@Component({
  selector: 'ngx-import-hardcoded-values-window',
  templateUrl: './import-hardcoded-values-window.component.html',
  styleUrls: ['./import-hardcoded-values-window.component.scss']
})
export class ImportHardcodedValuesWindowComponent implements OnInit {

  selectedField: string = '';
  isHC1Show: string = '';
  isHC2Show: string = '';
  isHC3Show: string = '';
  isHC4Show: string = '';
  txtHardCodeValue: string = '';
  selectedHardActID: string = '';
  sampCollSelected: string = '';
  sampCalls: WqxRefSampColMethod[] = [];
  hardcodeValueSelected: string = '';
  hardcodeValues: any[] = [];

  orgId: string = '';
  templateId: string = '';

  constructor(private refDataService: WQXRefDataService,
    private windowRef: NbWindowRef,
    private importService: WqxImportService) { }

  ngOnInit() {
    console.log('ngOnInit in mapped column');
    try {
      const obj = JSON.parse(this.windowRef.config.context.toString());
      this.orgId = obj.orgId;
      this.templateId = obj.templateId;
      this.refDataService.GetT_WQX_REF_SAMP_COL_METHOD_ByContext(this.orgId)
        .subscribe(
          (data) => {
            this.sampCalls = data;
          },
        );
    } catch (e) {
      if (e instanceof SyntaxError) {
        console.log(e, true);
      } else {
        console.log(e, false);
      }
    }
  }

  onSubmit() {
    if (+this.templateId > 0) {
      let hcVal: string;
      if (this.isHC1Show === 'show') {
        hcVal = this.txtHardCodeValue;
      } else if (this.isHC2Show === 'show') {
        hcVal = this.selectedHardActID;
      } else if (this.isHC3Show === 'show') {
        hcVal = this.sampCollSelected;
      } else if (this.isHC4Show === 'show') {
        hcVal = this.hardcodeValueSelected;
      } else {
        hcVal = '';
      }
      if (hcVal !== '') {
        const data = {} as TWqxImportTemplateDtl;
        data.templateDtlId = 0;
        data.templateId = +this.templateId;
        data.colNum = 0;
        data.fieldMap = this.selectedField;
        data.charName = hcVal;
        data.charDefaultUnit = '';
        data.createUserId = 'system';
        data.charDefaultSampFraction = '';
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
            this.windowRef.config.context = 'Something went wrong!';
            this.windowRef.close();
          },
        );
      }
    }
  }
  onHardCodedValuesCancel() {
    this.windowRef.config.context = '';
    this.windowRef.close();
  }
  onFieldSlectionChanged(event) {
    console.log('onFieldSlectionChanged fired');
    console.log(event);
    this.isHC1Show = '';
    this.isHC2Show = '';
    this.isHC3Show = '';
    this.isHC4Show = '';
    if (event === 'ACTIVITY_ID') {
      this.isHC2Show = 'show';
    } else if (event === 'ACT_COMMENTS') {
      this.isHC1Show = 'show';
    } else if (event === 'SAMP_COLL_METHOD_IDX') {
      this.isHC3Show = 'show';

    } else {
      this.isHC4Show = 'show';
      this.refDataService.GetT_WQX_REF_DATA(this.getEventValue(event), true, true)
        .subscribe(
          (data) => {
            console.log('GetT_WQX_REF_DATA: valid');
            console.log(data);
            this.hardcodeValues = data;
          },
          (err) => {
            console.log('GetT_WQX_REF_DATA: failed');
            console.log(err);
          },
        );
    }

  }
  getEventValue(event: any): string {
    let val: string = '';
    switch (event) {
      case 'ACTIVITY_ID':
        val = 'Activity ID';
        break;
      case 'ACT_TYPE':
        val = 'ActivityType';
        break;
      case 'ACT_MEDIA':
        val = 'ActivityMedia';
        break;
      case 'ACT_SUBMEDIA':
        val = 'ActivityMediaSubdivision';
        break;
      case 'ACT_COMMENTS':
        val = 'Activity Comments';
        break;
      case 'SAMP_COLL_METHOD_IDX':
        val = 'Sample Collection Method';
        break;
      case 'SAMP_COLL_EQUIP':
        val = 'SampleCollectionEquipment';
        break;
      case 'RESULT_VALUE_TYPE':
        val = 'ResultValueType';
        break;
      case 'RESULT_STATUS':
        val = 'ResultStatus';
        break;
      default:
        break;
    }
    return val;
  }
  onHardcodeValueSelected() {

  }
}
