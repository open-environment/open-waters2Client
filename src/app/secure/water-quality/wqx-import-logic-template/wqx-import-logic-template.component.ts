import { Component, OnInit } from '@angular/core';
import { TWqxImportTemplate, TWqxImportTemplateDtl } from '../../../@core/wqx-data/wqx-import';
import { WqxImportService } from '../../../@core/wqx-services/wqx-import.service';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { User } from '../../../@core/data/users';
import { Router } from '@angular/router';
import { ImportTemplateConfigComponent } from './import-template-config/import-template-config.component';
import { NbWindowService, NbWindowRef, NbToastrService } from '@nebular/theme';
import { ImportMappedColumnWindowComponent } from './import-mapped-column-window/import-mapped-column-window.component';
import { ImportHardcodedValuesWindowComponent } from './import-hardcoded-values-window/import-hardcoded-values-window.component';
import { AuthService } from '../../../@core/auth/auth.service';


@Component({
  selector: 'ngx-wqx-import-logic-template',
  templateUrl: './wqx-import-logic-template.component.html',
  styleUrls: ['./wqx-import-logic-template.component.scss']
})
export class WqxImportLogicTemplateComponent implements OnInit {

  user: User;
  currentOrgId: string = '';
  selectedTemplateId: number = 0;
  isImportTemplate: string = 'show';
  isMappedColumns: string = '';
  importTemplates: TWqxImportTemplate[];
  selectedImportTemplate: TWqxImportTemplate;
  importMappedColumns: TWqxImportTemplateDtl[];
  importHardCodedValues: TWqxImportTemplateDtl[];
  cols: any[];
  cols2: any[];
  cols3: any[];
  configWinRef: NbWindowRef;
  configWinRef2: NbWindowRef;
  configWinRef3: NbWindowRef;

  constructor(private authService: NbAuthService,
    private authService1: AuthService,
    private importService: WqxImportService,
    private router: Router,
    private windowService: NbWindowService,
    private toasterService: NbToastrService) {
    if (this.authService1.isAuthenticated() === true) {
      const u = this.authService1.getUser();
      console.log(u.profile.sub);
      // this.currentUser = token.getPayload();
      // TODO: need to fix this
      if (this.user === undefined || this.user === null)
        this.user = {
          userIdx: 0,
          name: '',
          picture: '',
          UserIDX: '',
          OrgID: '',
          isAdmin: '',
        };
      this.user.userIdx = u.userIdx;
      this.user.name = u.name;
      this.user.OrgID = u.OrgID;
      this.user.isAdmin = u.isAdmin;
      this.currentOrgId = this.user.OrgID;

      this.populateData();
    }
    /* this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        this.user = token.getPayload(); // here we receive a payload from the token and assigns it to our `user` variable

      }
    }); */
  }

  ngOnInit() {

    if (localStorage.getItem('selectedOrgId') !== null) {
      this.currentOrgId = localStorage.getItem('selectedOrgId');
    }
    this.cols = [
      { field: 'templateId', header: 'ID' },
      { field: 'templateName', header: 'Template Name' },
      { field: 'typeCd', header: 'Data Type' },
      { field: 'createDt', header: 'Create Date' },
      { field: 'createUserid', header: 'Created By' },
    ];
    this.cols2 = [
      { field: 'colNum', header: 'Column' },
      { field: 'fieldMap', header: 'Field Map' },
      { field: 'charName', header: 'Char Name' },
      { field: 'charDefaultUnit', header: 'Default Unit' },
      { field: 'charDefaultSampFraction', header: 'Default Sample Fraction' },
    ];
    this.cols3 = [
      { field: 'fieldMap', header: 'Field Map' },
      { field: 'charName', header: 'Char Name' },
    ];
  }

  populateData() {
    console.log('populateData called!');
    console.log(this.currentOrgId);
    this.importService.GetWQX_IMPORT_TEMPLATE(this.currentOrgId).subscribe(
      (data: TWqxImportTemplate[]) => {
        console.log('GetWQX_IMPORT_TEMPLATE: valid');
        console.log(data);
        this.importTemplates = data;
      },
      (err) => {
        console.log('GetWQX_IMPORT_TEMPLATE: failed');
        console.log(err);
      },
    );
  }
  onSelectClicked(data) {
    this.selectedImportTemplate = data;
    console.log(data.templateId);
    this.selectedTemplateId = data.templateId;
    this.isMappedColumns = 'show';
    this.populateMappedColumns();
    this.populateHardCodedValues();
  }
  populateMappedColumns() {
    this.importService.GetWQX_IMPORT_TEMPLATE_DTL_DynamicByTemplateID(this.selectedTemplateId).subscribe(
      (data: TWqxImportTemplateDtl[]) => {
        console.log('GetWQX_IMPORT_TEMPLATE_DTL_DynamicByTemplateID: valid');
        console.log(data);
        this.importMappedColumns = data;
      },
      (err) => {
        console.log('GetWQX_IMPORT_TEMPLATE_DTL_DynamicByTemplateID: failed');
        console.log(err);
      },
    );
  }
  populateHardCodedValues() {
    this.importService.GetWQX_IMPORT_TEMPLATE_DTL_HardCodeByTemplateID(this.selectedTemplateId).subscribe(
      (data: TWqxImportTemplateDtl[]) => {
        console.log('GetWQX_IMPORT_TEMPLATE_DTL_HardCodeByTemplateID: valid');
        console.log(data);
        this.importHardCodedValues = data;
      },
      (err) => {
        console.log('GetWQX_IMPORT_TEMPLATE_DTL_HardCodeByTemplateID: failed');
        console.log(err);
      },
    );
  }
  onDeleteClicked(data) {
    console.log(data.templateId);
    this.importService.DeleteT_WQX_IMPORT_TEMPLATE(data.templateId).subscribe(
      (result) => {
        console.log('DeleteT_WQX_IMPORT_TEMPLATE: valid');
        console.log(result);
        this.populateData();
      },
      (err) => {
        console.log('DeleteT_WQX_IMPORT_TEMPLATE: failed');
        console.log(err);
      }
    );
  }
  onHVDeleteClicked(data) {
    console.log(data.templateDtlId);
    this.importService.DeleteT_WQX_IMPORT_TEMPLATE_DTL(data.templateDtlId).subscribe(
      (result) => {
        console.log('DeleteT_WQX_IMPORT_TEMPLATE_DTL (Hard-Coded Values): valid');
        console.log(result);
        this.populateHardCodedValues();
      },
      (err) => {
        console.log('DeleteT_WQX_IMPORT_TEMPLATE_DTL (Hard-Coded Values): failed');
        console.log(err);
      },
    );
  }
  onMCDeleteClicked(data) {
    console.log(data.templateDtlId);
    this.importService.DeleteT_WQX_IMPORT_TEMPLATE_DTL(data.templateDtlId).subscribe(
      (result) => {
        console.log('DeleteT_WQX_IMPORT_TEMPLATE_DTL (Mapped Columns): valid');
        console.log(result);
        this.populateMappedColumns();
      },
      (err) => {
        console.log('DeleteT_WQX_IMPORT_TEMPLATE_DTL (Mapped Columns): failed');
        console.log(err);
      },
    );
  }
  onSendToEPA(data) {

  }
  onBack() {
    this.router.navigate(['/secure/water-quality/wqx-import']);
  }
  onDefine() {
    console.log('onDefine');
    console.log(this.currentOrgId);
    this.configWinRef = this.windowService.open(ImportTemplateConfigComponent,
      { title: ``, hasBackdrop: true, context: this.currentOrgId });
    this.configWinRef.onClose.subscribe(
      (result) => {
        console.log('window close event');
        if (this.configWinRef.config.context === 'success') {
          this.populateData();
        } else if (this.configWinRef.config.context === '') {
          // do nothing
        } else {
          this.toasterService.danger('Something went wrong!');
        }
      },
    );
  }
  onMappedColumnAddNew() {
    this.configWinRef2 = this.windowService
      .open(ImportMappedColumnWindowComponent,
        { title: ``, hasBackdrop: true, context: `{ "templateId": "${this.selectedTemplateId}", "orgId": "${this.currentOrgId}" }` });
    this.configWinRef2.onClose.subscribe(
      (result) => {
        console.log('window2 close event');
        if (this.configWinRef2.config.context === 'success') {
          this.populateMappedColumns();
        } else if (this.configWinRef2.config.context === '') {
          // do nothing
        } else {
          this.toasterService.danger('Something went wrong!');
        }
      },
    );
  }
  onHarCodedValuesAddNew() {
    this.configWinRef3 = this.windowService
      .open(ImportHardcodedValuesWindowComponent,
        { title: ``, hasBackdrop: true, context: `{ "templateId": "${this.selectedTemplateId}", "orgId": "${this.currentOrgId}" }` });
    this.configWinRef3.onClose.subscribe(
      (result) => {
        console.log('windo3 close event');
        if (this.configWinRef3.config.context === 'success') {
          this.populateHardCodedValues();
        } else if (this.configWinRef3.config.context === '') {
          // do nothing
        } else {
          this.toasterService.danger('Something went wrong!');
        }
      },
    );
  }
  onRowSelect(data) {
    console.log('onRowSelect');
    console.log(data);
  }
}
