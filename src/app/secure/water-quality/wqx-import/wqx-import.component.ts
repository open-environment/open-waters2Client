import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NbStepperComponent, NbToastrService } from '@nebular/theme';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { User } from '../../../@core/data/users';
import { WqxImportService } from '../../../@core/wqx-services/wqx-import.service';
import { WQXProjectService } from '../../../@core/wqx-services/wqx-project-service';
import { WqxProject } from '../../../@core/wqx-data/wqx-project';
import { TWqxImportTemplate } from '../../../@core/wqx-data/wqx-import';

@Component({
  selector: 'ngx-wqx-import',
  templateUrl: './wqx-import.component.html',
  styleUrls: ['./wqx-import.component.scss'],
})
export class WqxImportComponent implements OnInit {
  @ViewChild('stepper', { static: true }) stepper: NbStepperComponent;

  user: User;
  selectedImportType: string = '';
  txtImportData: string = '';
  isCITRadioButtonShow: string = '';
  isCTSShow: string = '';
  selectedCustomImportTemplate: string = '';
  isProjectShow: string = '';
  projects: WqxProject[] = [];
  projectSelected: string = '';
  templates: TWqxImportTemplate[] = [];
  selectedTemplateId: number;

  constructor(private router: Router,
    private authService: NbAuthService,
    private importService: WqxImportService,
    private projectService: WQXProjectService,
    private toasterService: NbToastrService) {
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        this.user = token.getPayload(); // here we receive a payload from the token and assigns it to our `user` variable
        console.log(this.user);
      }
    });
  }

  ngOnInit() {
    this.projectService.GetWQX_PROJECT(true, this.user.OrgID, false).subscribe(
      (data) => {
        console.log('GetWQX_PROJECT: valid');
        console.log(data);
        this.projects = data;
      },
      (err) => {
        console.log('GetWQX_PROJECT: failed');
        console.log(err);
      }
    );
    this.importService.GetWQX_IMPORT_TEMPLATE(this.user.OrgID).subscribe(
      (data) => {
        console.log('GetWQX_IMPORT_TEMPLATE: valid');
        console.log(data);
        this.templates = data;
      },
      (err) => {
        console.log('GetWQX_IMPORT_TEMPLATE: failed');
        console.log(err);
      },
    );
  }

  onDataToImportChanged(importType) {
    console.log('onDataToImportChanged!');
    console.log(importType);
    if (importType !== '') {
      this.stepper.selectedIndex = 1;
      this.isCITRadioButtonShow = '';
      this.isProjectShow = '';
      if (importType === 'S') {  // Activities
        this.isCITRadioButtonShow = 'show';
        this.isProjectShow = 'show';
      } else if (importType === 'I') {
        this.isProjectShow = 'show';
      }
    } else {
      this.isCITRadioButtonShow = '';
    }
  }
  onGlobalRulesClicked() {
    console.log('onGlobalRulesClicked!');
    this.router.navigate(['/secure/water-quality/wqx-org-data']);
  }
  onBtnContinueClick() {
    console.log('onBtnContinueClick!');
    if (this.txtImportData === '') {
      this.toasterService.danger('You must copy and paste data from a spreadsheet into the large textbox.', 'Validation Failed');
    } else {
      const userIdx: number = this.user.userIdx;
      const orgId: string = this.user.OrgID;
      const importType: string = this.selectedImportType;
      const importData: string = btoa(this.txtImportData);
      const templateInd: string = this.selectedCustomImportTemplate;
      const projectId: number = +this.projectSelected;
      const projectName: string = '';
      const templateId: number = 0;
      const template: string = '';
      console.log('calling ProcessWqxImportData...');
      this.importService.ProcessWqxImportData(userIdx, orgId, importType, importData,
        templateInd, projectId, projectName,
        templateId, template).subscribe(
          (result) => {
            console.log('ProcessWqxImportData: valid');
            console.log(result);
            if (result === 'Process MonLoc') {
              this.router.navigate(['/secure/water-quality/wqx-import-monloc']);
            } else if (result === 'Process Sample') {
              this.router.navigate(['/secure/water-quality/wqx-import-sample']);
            } else if (result === 'Process Metric') {
              this.router.navigate(['/secure/water-quality/wqx-import-Metric']);
            } else {
              this.toasterService.danger(result, 'Data processing failed!', { destroyByClick: true });
            }
          },
          (err) => {
            console.log('ProcessWqxImportData: failed');
            console.log(err);
            this.toasterService.danger('Something went wrong!', 'Data processing failed!', { destroyByClick: true });
          },
        );
    }

  }
  handleChange(event) {
    console.log('handleChange!');
    console.log(event);
  }
  onNextClicked() {
    console.log('onNextClicked!');
    console.log(this.stepper.selectedIndex);
    console.log(this.projectSelected);
    if ((this.selectedImportType === 'S' ||
      this.selectedImportType === 'I') && this.projectSelected === '') {
      this.toasterService.danger('Please select a project into which this data will be imported.', 'Validation Failed');
      this.stepper.selectedIndex = 1;
    }
    if (this.selectedImportType === 'S' && this.selectedCustomImportTemplate === '') {
      this.toasterService.danger('Please indicate whether you will use a custom import template.', 'Validation Failed');
      this.stepper.selectedIndex = 1;
    }

  }
  onBtnCancelImportClicked() {
    this.stepper.selectedIndex = 0;
    this.selectedImportType = '';
    this.projectSelected = '';
    this.selectedCustomImportTemplate = '';
    this.txtImportData = '';
  }
  onCITRBChanged(event) {
    if (event === '2') {
      this.isCTSShow = 'show';
    } else {
      this.isCTSShow = '';
    }
  }
  onECITClicked() {
    this.router.navigate(['/secure/water-quality/wqx-import-logic-template']);
  }
}
