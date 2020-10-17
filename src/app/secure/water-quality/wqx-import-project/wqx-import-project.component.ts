import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { AuthService } from '../../../@core/auth/auth.service';
import { User } from '../../../@core/data/users';
import { TWqxImportTempProject } from '../../../@core/wqx-data/wqx-import';
import { WqxImportService } from '../../../@core/wqx-services/wqx-import.service';

@Component({
  selector: 'ngx-wqx-import-project',
  templateUrl: './wqx-import-project.component.html',
  styleUrls: ['./wqx-import-project.component.scss'],
})
export class WqxImportProjectComponent implements OnInit {

  user: User;
  currentOrgId: string = '';

  tempProjects: TWqxImportTempProject[];
  selectedTempProjects: TWqxImportTempProject[];
  wqxImport: boolean = false;
  wqxSubmitStatus: string = 'U';

  constructor(private activatedRout: ActivatedRoute,
    private authService: NbAuthService,
    private authService1: AuthService,
    private importService: WqxImportService,
    private router: Router) {
    const u = this.authService1.getUser();

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
    console.log(this.user);
    this.currentOrgId = this.user.OrgID;

    this.importService.GetWQX_IMPORT_TEMP_ProjectByUserIdx(this.user.userIdx).subscribe(
      (data: TWqxImportTempProject[]) => {
        console.log('GetWQX_IMPORT_TEMP_ProjectByUserIdx: valid');
        console.log(data);
        this.tempProjects = data;
      },
      (err) => {
        console.log('GetWQX_IMPORT_TEMP_ProjectByUserIdx: falied');
        console.log(err);
      },
    );
  }

  ngOnInit() {
    if (localStorage.getItem('selectedOrgId') !== null) {
      this.currentOrgId = localStorage.getItem('selectedOrgId');
    }
  }

  selectRow(checkValue) {
    console.log(checkValue);
  }
  onRowSelect(event) {
    // console.log('nRowSelect');
    // console.log(event.data);
  }

  onRowUnselect(event) {
    // console.log('onRowUnselect');
    // console.log(event.data);
  }
  onBtnImportClicked() {
    console.log('btnImportClicked!');

    // TODO:
    // if importing data from EPA, then save the records as already synced and passing
    // bool wqxImport = ((Request.QueryString["e"] ?? "") == "1") ? true : chkWQXImport.Checked;
    // string wqxSubmitStatus = ((Request.QueryString["e"] ?? "") == "1") ? "Y" : "U";
    console.log(this.selectedTempProjects);
    console.log(this.wqxImport);
    let _selectedTempProjectIds: string = '';
    if (this.selectedTempProjects !== undefined && this.selectedTempProjects.length > 0) {
      this.selectedTempProjects.forEach(element => {
        _selectedTempProjectIds += element.tempProjectIdx.toString() + ',';
      });
      if (_selectedTempProjectIds.length > 0) {
        if (_selectedTempProjectIds.endsWith(',')) {
          _selectedTempProjectIds = _selectedTempProjectIds.substring(0, _selectedTempProjectIds.length - 1);
        }
        console.log(_selectedTempProjectIds);
        this.importService.ProcessImportTempProject(this.wqxImport, this.wqxSubmitStatus, _selectedTempProjectIds, this.user.userIdx).subscribe(
          (result) => {
            console.log('ProcessImport: valid');
            console.log(result);
            this.router.navigate(['/secure/water-quality/wqx-import']);
          },
          (err) => {
            console.log('ProcessImport: failed');
            console.log(err);
          },
        );
      }
    }
  }
  onButtonCancelImportClicked() {
    console.log('onButtonCancelImportClicked!');
    this.importService.CancelProcessImportTempProject(this.user.userIdx).subscribe(
      (result) => {
        console.log('CancelProcessImportTempProject: valid');
        console.log(result);
        this.router.navigate(['/secure/water-quality/wqx-import']);
      },
      (err) => {
        console.log('CancelProcessImportTempProject: failed');
        console.log(err);
      },
    );
  }
}
