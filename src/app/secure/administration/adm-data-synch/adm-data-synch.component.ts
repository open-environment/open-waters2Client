import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NbFlipCardComponent } from '@nebular/theme';
import { AuthService } from '../../../@core/auth/auth.service';
import { User } from '../../../@core/data/users';
import { WQXOrganizationService } from '../../../@core/wqx-services/wqx-organization-service';
import { WQXRefDataService } from '../../../@core/wqx-services/wqx-refdata-service';

@Component({
  selector: 'ngx-adm-data-synch',
  templateUrl: './adm-data-synch.component.html',
  styleUrls: ['./adm-data-synch.component.scss'],
})
export class AdmDataSynchComponent implements OnInit {
  @ViewChild('flipcard', { static: true }) flipcard: NbFlipCardComponent;
  @ViewChild('flipcard2', { static: true }) flipcard2: NbFlipCardComponent;

  user: User;
  currentOrgId: string;

  msg1: number = 0;
  msg2: number = 0;
  lastRetvd1: string = '';
  lastRetvd2: string = '';
  loading1 = false;
  loading2 = false;

  constructor(private refDataService: WQXRefDataService,
    private organizationService: WQXOrganizationService,
    private authService: AuthService,
    private router: Router) {
    console.log('admin-data-sync const');
    const u = this.authService.getUser();
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
    if (this.user.isAdmin !== 'true') {
      const navigationExtras: NavigationExtras = {
        state: {
          data: `You do not have security access to this page.
          Please click the link below to return to the dashboard.`,
        },
      };
      this.router.navigate(['/pages/miscellaneous/unauthorized'], navigationExtras);
    }
    this.currentOrgId = this.user.OrgID;
  }

  ngOnInit() {
    this.flipcard.showToggleButton = false;
    this.flipcard2.showToggleButton = false;
    this.DisplayDates();
  }
  DisplayDates() {
    this.refDataService.GetT_WQX_REF_DATA_LastUpdate().subscribe(
      (result: string) => {
        console.log('GetT_WQX_REF_DATA_LastUpdate: valid');
        console.log(result);
        this.lastRetvd1 = result;
      },
      (err) => {
        console.log('GetT_WQX_REF_DATA_LastUpdate: failed');
        console.log(err);
      },
    );
    this.organizationService.GetT_EPA_ORGS_LastUpdateDate().subscribe(
      (result: string) => {
        console.log('GetT_EPA_ORGS_LastUpdateDate: valid');
        console.log(result);
        this.lastRetvd2 = result;
      },
      (err) => {
        console.log('GetT_EPA_ORGS_LastUpdateDate: failed');
        console.log(err);
      },
    );
  }
  flip() {
    this.msg1 = 0;
    this.flipcard.toggle();
  }
  flip2() {
    this.msg2 = 0;
    this.flipcard2.toggle();
  }
  pullFromEPA() {
    this.loading1 = true;
    this.refDataService.WQXImport_Org().subscribe(
      (result: number) => {
        console.log('WQXImport_Org: valid');
        console.log(result);
        if (result === 0) result = 3;
        this.msg1 = result;
      },
      (err) => {
        console.log('WQXImport_Org: failed');
        console.log(err);
        this.msg1 = 3;
      },
      () => {
        this.loading1 = false;
        this.flipcard.toggle();
      },
    );

  }
  pullRefDataFromEPA() {
    this.msg2 = 1;
    this.flipcard2.toggle();
  }
  RefDataSelect(tableName: string) {
    this.loading2 = true;
    console.log(tableName);
    this.refDataService.WQXImport_RefData(tableName).subscribe(
      (result: number) => {
        console.log('WQXImport_RefData: valid');
        console.log(result);
        this.msg2 = 1;
      },
      (err) => {
        console.log('WQXImport_RefData: failed');
        console.log(err);
        this.msg2 = 0;
      },
      () => {
        this.loading2 = false;
        this.flipcard2.toggle();
      },
    );
  }
}
