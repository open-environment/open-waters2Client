import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table/lib/data-source/local/local.data-source';
import { WQXOrganizationService } from '../../../@core/wqx-services/wqx-organization-service';
import { WqxPubsubServiceService } from '../../../@core/wqx-services/wqx-pubsub-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-wqx-org',
  templateUrl: './wqx-org.component.html',
  styleUrls: ['./wqx-org.component.scss']
})
export class WqxOrgComponent implements OnInit {

  settings = {
    hideSubHeader: true,
    actions: {
      custom: [
        {
        name: 'select',
        title: '<i class="ion-edit" title="Edit"></i>',
        },
      ],
      add: false,
      edit: false,
      delete: false,
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: 'Select >>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      orgId: {
        title: 'Organization ID',
        type: 'string',
        filter: true,
      },
      orgFormalName: {
        title: 'Organization Name',
        type: 'string',
        filter: true,
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();

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
    const data = this.service.getVWQXAllOrgs()
    .subscribe(
      (_data) => {
        this.source.load(_data);
      },
    );
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onCustom(event): void {
     const orgId = event.data.orgId;
     this.router.navigate(['/secure/water-quality/wqx-org-edit'], { queryParams: { orgEditId: orgId } });
  }
  onAddNewClick(): void{
    console.log('Add new clicked!');
    this.router.navigate(['/secure/water-quality/wqx-org-edit'], { queryParams: { orgEditId: -1 } });
  }
}
