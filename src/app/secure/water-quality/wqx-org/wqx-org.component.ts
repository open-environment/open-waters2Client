import { Component, OnDestroy, OnInit } from '@angular/core';
import { WQXOrganizationService } from '../../../@core/wqx-services/wqx-organization-service';
import { WqxPubsubServiceService } from '../../../@core/wqx-services/wqx-pubsub-service.service';
import { Router } from '@angular/router';
import { WqxOrganization, WqxOrganization4Excel } from '../../../@core/wqx-data/wqx-organization';
import { User } from '../../../@core/data/users';
import { AuthService } from '../../../@core/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ngx-wqx-org',
  templateUrl: './wqx-org.component.html',
  styleUrls: ['./wqx-org.component.scss'],
})
export class WqxOrgComponent implements OnInit, OnDestroy {
  user: User;
  currentOrgId: string = '';

  pubSubServiceSubscription: Subscription[] = [];

  orgs: WqxOrganization[] = [];

  constructor(private service: WQXOrganizationService,
    private pubSubService: WqxPubsubServiceService,
    private router: Router,
    private authService: AuthService) {

    if (this.authService.isAuthenticated() === true) {
      const u = this.authService.getUser();
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

    }
    this.pubSubServiceSubscription.push(this.pubSubService.loadData.subscribe((data: any) => {
    }));

  }
  ngOnDestroy(): void {
    this.pubSubServiceSubscription.forEach(element => {
      element.unsubscribe();
    });
  }

  ngOnInit() {
    if (localStorage.getItem('selectedOrgId') !== null) {
      this.currentOrgId = localStorage.getItem('selectedOrgId');
    }
    this.loadData();
  }

  loadData(): void {
    if (this.user.isAdmin.toString() === 'true') {
      this.service.GetWQX_ORGANIZATION()
        .subscribe(
          (data) => {
            this.orgs = data;
          },
          (err) => {
            console.log(err);
          },
        );
    } else {
      this.service.GetWQX_USER_ORGS_ByUserIDX(this.user.userIdx, true).subscribe(
        (data) => {
          this.orgs = data;
        },
        (err) => {
          console.log(err);
        },
      );
    }
  }

  exportExcel() {
    const temp: WqxOrganization4Excel[] = [];
    this.orgs.map(x => {
      const t = {} as WqxOrganization4Excel;
      t.ID = x.orgId;
      t.Name = x.orgFormalName;
      t.Description = x.orgDesc;
      t.TribalCode = x.tribalCode;
      t.ElectronicAddress = x.electronicaddress;
      t.AddressType = x.electronicaddresstype;
      t.Phone = x.telephoneNum;
      t.Ext = x.telephoneExt;
      t.PhoneType = x.telephoneNumType;
      temp.push(t);
    });

    console.log(temp);
    import('xlsx').then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(temp);
      const workbook = { Sheets: { 'OrgExport': worksheet }, SheetNames: ['OrgExport'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, 'OrgExport');
    });
  }


  saveAsExcelFile(buffer: any, fileName: string): void {
    import('file-saver').then(FileSaver => {
      const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      const EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE,
      });
      FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
    });
  }
  onEditClicked(org: WqxOrganization): void {
    const orgId = org.orgId;
    this.router.navigate(['/secure/water-quality/wqx-org-edit'], { queryParams: { orgEditId: orgId } });
  }
  onAddNewClick(): void {
    this.router.navigate(['/secure/water-quality/wqx-org-edit'], { queryParams: { orgEditId: -1 } });
  }
}
