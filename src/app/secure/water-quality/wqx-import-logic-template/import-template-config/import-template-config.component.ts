import { Component, OnInit } from '@angular/core';
import { WqxImportService } from '../../../../@core/wqx-services/wqx-import.service';
import { TWqxImportTemplate } from '../../../../@core/wqx-data/wqx-import';
import { NbWindowRef } from '@nebular/theme';

@Component({
  selector: 'ngx-import-template-config',
  templateUrl: './import-template-config.component.html',
  styleUrls: ['./import-template-config.component.scss']
})
export class ImportTemplateConfigComponent implements OnInit {

  txtTemplateName: string = '';
  selectedItem: string = 'S_CT';
  constructor(private importService: WqxImportService,
    private windowRef: NbWindowRef) {
  }

  ngOnInit() {
    console.log('ngOnInit in config');
    console.log(this.windowRef.config.context.toString());
  }


  onImportTemplateConfigCancel() {
    this.windowRef.config.context = '';
    this.windowRef.close();
  }

  onSubmit() {
    console.log('onSubmit - ImportTemplateConfig called');
    const data = {} as TWqxImportTemplate;
    data.templateId = 0;
    data.orgId = this.windowRef.config.context.toString();
    data.templateName = this.txtTemplateName;
    data.typeCd = this.selectedItem;
    data.createUserId = 'system'; // Todo: get this from config.context
    this.importService.InsertOrUpdateWQX_IMPORT_TEMPLATE(data).subscribe(
      (result) => {
        console.log('InsertOrUpdateWQX_IMPORT_TEMPLATE: valid');
        console.log(result);
        this.windowRef.config.context = 'success';
        this.windowRef.close();
      },
      (err) => {
        console.log('InsertOrUpdateWQX_IMPORT_TEMPLATE: failed');
        console.log(err);
        this.windowRef.config.context = 'failed';
        this.windowRef.close();
      },
      () => {
        this.windowRef.config.context = 'error';
        this.windowRef.close();
      },
    )
  }
}
