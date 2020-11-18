import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NbFlipCardComponent } from '@nebular/theme';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../@core/auth/auth.service';
import { User } from '../../../@core/data/users';
import { WQXOrganizationService } from '../../../@core/wqx-services/wqx-organization-service';
import { WQXRefDataService } from '../../../@core/wqx-services/wqx-refdata-service';

@Component({
  selector: 'ngx-adm-data-synch',
  templateUrl: './adm-data-synch.component.html',
  styleUrls: ['./adm-data-synch.component.scss'],
})
export class AdmDataSynchComponent implements OnInit, OnDestroy {
  @ViewChild('flipcard', { static: true }) flipcard: NbFlipCardComponent;
  @ViewChild('flipcard2', { static: true }) flipcard2: NbFlipCardComponent;

  user: User;
  currentOrgId: string = '';
  selectedTableName: string = '';
  msg1: number = 0;
  msg2: number = 0;
  lastRetvd1: string = '';
  lastRetvd2: string = '';
  loading1 = false;
  loading2 = false;

  organizationServiceSubscription: Subscription[] = [];
  refDataServiceSubscription: Subscription[] = [];
  constructor(
    private authService: AuthService,
    private router: Router,
    private refDataService: WQXRefDataService,
    private organizationService: WQXOrganizationService,
  ) {
    const u = this.authService.getUser();
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
  ngOnDestroy(): void {
    this.organizationServiceSubscription.forEach(element => {
      element.unsubscribe();
    });
    this.refDataServiceSubscription.forEach(element => {
      element.unsubscribe();
    });
  }

  ngOnInit() {
    this.flipcard.showToggleButton = false;
    this.flipcard2.showToggleButton = false;
    this.DisplayDates();
  }
  DisplayDates() {
    this.refDataServiceSubscription.push(this.refDataService.GetT_WQX_REF_DATA_LastUpdate().subscribe(
      (result: string) => {
        this.lastRetvd1 = result;
      },
      (err) => {
        console.log(err);
      },
    ));
    this.organizationServiceSubscription.push(this.organizationService.GetT_EPA_ORGS_LastUpdateDate().subscribe(
      (result: string) => {
        this.lastRetvd2 = result;
      },
      (err) => {
        console.log(err);
      },
    ));
  }
  flip() {
    this.msg1 = 0;
    this.flipcard.toggle();
  }
  flip2() {
    this.msg2 = 0;
    this.flipcard2.toggle();
    this.selectedTableName = '';
  }
  pullFromEPA() {
    this.loading1 = true;
    this.refDataServiceSubscription.push(this.refDataService.WQXImport_Org().subscribe(
      (result: number) => {
        if (result === 0) result = 3;
        this.msg1 = result;
      },
      (err) => {
        this.msg1 = 3;
      },
      () => {
        this.loading1 = false;
        this.flipcard.toggle();
      },
    ));

  }
  pullRefDataFromEPA() {
    this.loading2 = true;
    console.log(this.selectedTableName);
    this.refDataServiceSubscription.push(this.refDataService.WQXImport_RefData(this.selectedTableName).subscribe(
      (result: number) => {
        this.msg2 = 1;
      },
      (err) => {
        console.log(err);
        this.msg2 = 0;
      },
      () => {
        this.loading2 = false;
        this.flipcard2.toggle();
      },
    ));
  }
  RefDataSelect(tableName: string) {
    this.selectedTableName = tableName;
  }
}
