import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../@core/auth/auth.service';
import { User } from '../../../@core/data/users';
import { TWqxImportLog } from '../../../@core/wqx-data/wqx-import';
import { WqxImportService } from '../../../@core/wqx-services/wqx-import.service';

@Component({
  selector: 'ngx-wqx-import-from-epa',
  templateUrl: './wqx-import-from-epa.component.html',
  styleUrls: ['./wqx-import-from-epa.component.scss'],
})
export class WqxImportFromEpaComponent implements OnInit {

  user: User;
  currentOrgId: string = '';

  importLogs: TWqxImportLog[];

  constructor(private importService: WqxImportService,
    private authService1: AuthService) {
    const u = this.authService1.getUser();
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
  }

  ngOnInit() {
    this.importService.GetWQX_IMPORT_LOG(this.currentOrgId).subscribe(
      (result) => {
        console.log('GetWQX_IMPORT_LOG: valid');
        console.log(result);
        this.importLogs = result;
      },
      (err) => {
        console.log('GetWQX_IMPORT_LOG: failed');
        console.log(err);
      },
    );
  }

  onRowDelete(importLog: TWqxImportLog) {
    console.log(importLog);
  }
}
