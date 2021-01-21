import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NbStepperComponent, NbToastrService } from '@nebular/theme';
import { User } from '../../../@core/data/users';
import { WqxImportService } from '../../../@core/wqx-services/wqx-import.service';
import { WQXProjectService } from '../../../@core/wqx-services/wqx-project-service';
import { WqxProject } from '../../../@core/wqx-data/wqx-project';
import { TWqxImportTemplate } from '../../../@core/wqx-data/wqx-import';
import { AuthService } from '../../../@core/auth/auth.service';
import { WqxAdminService } from '../../../@core/wqx-services/wqx-admin.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ngx-wqx-import',
  templateUrl: './wqx-import.component.html',
  styleUrls: ['./wqx-import.component.scss'],
})
export class WqxImportComponent implements OnInit, OnDestroy {
  @ViewChild('stepper', { static: true }) stepper: NbStepperComponent;

  importServiceSubscription: Subscription[] = [];
  projectServiceSubscription: Subscription[] = [];
  adminServiceSubscription: Subscription[] = [];

  user: User;
  currentOrgId: string = '';

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
    private authService1: AuthService,
    private importService: WqxImportService,
    private projectService: WQXProjectService,
    private toasterService: NbToastrService,
    private adminService: WqxAdminService) {

    if (this.authService1.isAuthenticated() === true) {
      const u = this.authService1.getUser();
      console.log(u.profile.sub);
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
      if (localStorage.getItem('selectedOrgId') !== null) {
        this.currentOrgId = localStorage.getItem('selectedOrgId');
      }
      this.populateDropdowns();
    }
  }
  ngOnDestroy(): void {
    this.importServiceSubscription.forEach(element => {
      element.unsubscribe();
    });
    this.projectServiceSubscription.forEach(element => {
      element.unsubscribe();
    });
    this.adminServiceSubscription.forEach(element => {
      element.unsubscribe();
    });
  }

  ngOnInit() {

  }

  populateDropdowns() {
    this.projectServiceSubscription.push(this.projectService.GetWQX_PROJECT(true, this.currentOrgId, false).subscribe(
      (data) => {
        this.projects = data;
      },
      (err) => {
        console.log(err);
      },
    ));
    this.importServiceSubscription.push(this.importService.GetWQX_IMPORT_TEMPLATE(this.currentOrgId).subscribe(
      (data) => {
        this.templates = data;
      },
      (err) => {
        console.log(err);
      },
    ));
  }
  onGlobalRulesClicked() {
    this.router.navigate(['/secure/water-quality/wqx-org-data']);
  }
  onBtnContinueClick() {
    if (this.txtImportData === '') {
      this.toasterService.danger('You must copy and paste data from a spreadsheet into the large textbox.', 'Validation Failed');
    } else {
      const userIdx: number = this.user.userIdx;
      const orgId: string = this.currentOrgId;
      const importType: string = this.selectedImportType;
      const importData: string = btoa(this.txtImportData);
      const templateInd: string = this.selectedCustomImportTemplate;
      const projectId: number = +this.projectSelected;
      const projectName: string = '';
      const templateId: number = 0;
      const template: string = '';
      this.importServiceSubscription.push(this.importService.ProcessWqxImportData(userIdx, orgId, importType, importData,
        templateInd, projectId, projectName,
        templateId, template).subscribe(
          (result) => {
            if (result === 'Process MonLoc') {
              this.router.navigate(['/secure/water-quality/wqx-import-monloc']);
            } else if (result === 'Process Sample') {
              this.router.navigate(['/secure/water-quality/wqx-import-sample']);
            } else if (result === 'Process Metric') {
              this.router.navigate(['/secure/water-quality/wqx-import-metric']);
            } else {
              this.toasterService.danger(result, 'Data processing failed!', { destroyByClick: true });
            }
          },
          (err) => {
            console.log(err);
            this.toasterService.danger('Something went wrong!', 'Data processing failed!', { destroyByClick: true });
          },
        ));
    }

  }
  handleChange(event) {

  }
  onNext1Clicked() {
    if (this.selectedImportType !== '') {
      this.stepper.selectedIndex = 1;
      this.isCITRadioButtonShow = '';
      this.isProjectShow = '';
      if (this.selectedImportType === 'S') {  // Activities
        this.isCITRadioButtonShow = 'show';
        this.isProjectShow = 'show';
      } else if (this.selectedImportType === 'I') {
        this.isProjectShow = 'show';
      }
    } else {
      this.stepper.selectedIndex = 0;
      this.toasterService.danger('Please select import type.', 'Validation Failed');
      this.isCITRadioButtonShow = '';
    }
  }
  onNext2Clicked() {
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
    this.stepper.reset();
    // this.stepper.selectedIndex = 0;
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
  downloadFile(fileName) {
    this.adminServiceSubscription.push(this.adminService.DownloadFile(fileName).subscribe(
      (result: any) => {
        console.log('DownloadFile: valid');
        console.log(result);
        this.download(result.body, fileName);
      },
      (err) => {
        console.log('DownloadFile: failed');
        console.log(err);
      },
    ));
  }
  download(blob: Blob, nameFile?: string) {
    saveAs(blob, nameFile);
  }
  /* tempFunc() {
    this.router.navigate(['/secure/water-quality/wqx-import-sample']);
  } */
}
