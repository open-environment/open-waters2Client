import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table/lib/data-source/local/local.data-source';
import { WQXOrganizationService } from '../../../@core/wqx-services/wqx-organization-service';
import { WqxPubsubServiceService } from '../../../@core/wqx-services/wqx-pubsub-service.service';
import { Router } from '@angular/router';
import { Column } from 'primeng/primeng';
import { WqxAllOrgs, WqxOrganization } from '../../../@core/wqx-data/wqx-organization';

@Component({
  selector: 'ngx-wqx-org',
  templateUrl: './wqx-org.component.html',
  styleUrls: ['./wqx-org.component.scss'],
})
export class WqxOrgComponent implements OnInit {

  orgs: WqxOrganization[] = [];

  constructor(private service: WQXOrganizationService,
    private pubSubService: WqxPubsubServiceService,
    private router: Router) {
    this.pubSubService.loadData.subscribe((data: any) => {
      console.log('subscribe called: ' + data);
    });
    this.loadData();
  }

  ngOnInit() {
  }

  loadData(): void {
    this.service.GetWQX_ORGANIZATION()
      .subscribe(
        (data) => {
          this.orgs = data;
        },
      );
  }

  onEditClicked(org: WqxOrganization): void {
    const orgId = org.orgId;
    this.router.navigate(['/secure/water-quality/wqx-org-edit'], { queryParams: { orgEditId: orgId } });
  }
  onAddNewClick(): void {
    console.log('Add new clicked!');
    this.router.navigate(['/secure/water-quality/wqx-org-edit'], { queryParams: { orgEditId: -1 } });
  }
}
