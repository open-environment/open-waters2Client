import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { WQXOrganizationService } from '../../../@core/wqx-services/wqx-organization-service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-wqx-org-new',
  templateUrl: './wqx-org-new.component.html',
  styleUrls: ['./wqx-org-new.component.scss'],
})
export class WqxOrgNewComponent {

  settings = {
    actions: {
      custom: [
        {
          name: 'select',
          title: 'select',
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
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: WQXOrganizationService,
    private router: Router) {
    console.log('wqx-org-new comp called...');
    this.service.getVWQXAllOrgs()
      .subscribe(
        (data) => {
          console.log(data);
          this.source.load(data);
        },
        (err) => {
          console.log(err);
        },
      );
    // this.source.load(data);
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
    this.router.navigate(['/secure/main/wqx-org-new-cs'], { queryParams: { orgId: orgId } });
  }
}
