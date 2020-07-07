import { Component, OnInit } from '@angular/core';
import { WqxRefDefaultTimeZone, WqxRefTaxaOrg, WqxRefCharOrg } from '../../../@core/wqx-data/wqx-refdata';
import { LocalDataSource } from 'ng2-smart-table/lib/data-source/local/local.data-source';
import { WqxRefData, WqxImportTranslate } from '../../../@core/wqx-data/wqx-organization';
import { WQXRefDataService } from '../../../@core/wqx-services/wqx-refdata-service';
import { User } from '../../../@core/data/users';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { NbToastrService, NbWindowService } from '@nebular/theme';
import { Router } from '@angular/router';
import { AddCharWindowComponent } from './add-char-window/add-char-window.component';
import { AddTranslationWindowComponent } from './add-translation-window/add-translation-window.component';
import { WqxPubsubServiceService } from '../../../@core/wqx-services/wqx-pubsub-service.service';
import { WQXOrganizationService } from '../../../@core/wqx-services/wqx-organization-service';

@Component({
  selector: 'ngx-wqx-org-data',
  templateUrl: './wqx-org-data.component.html',
  styleUrls: ['./wqx-org-data.component.scss']
})
export class WqxOrgDataComponent implements OnInit {
  user: User;
  currentOrgId: string;
  settings = {
    actions:{
      custom:[
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
      charName: {
        title: 'Characteristic',
        type: 'string',
        filter: true,
      },
      defaultUnit: {
        title: 'Unit',
        type: 'string',
        filter: true,
      },
      defaultDetectLimit: {
        title: 'Detect Limit',
        type: 'string',
        filter: true,
      },
      defaultLowerQuantLimit: {
        title: 'Lower Quant Limit',
        type: 'string',
        filter: true,
      },
      defaultUpperQuantLimit: {
        title: 'Upper Quant Limit',
        type: 'string',
        filter: true,
      },
      analyticMethodId: {
        title: 'Analysis Method',
        type: 'string',
        filter: true,
      },
      defaultSampFraction: {
        title: 'Sample Fraction',
        type: 'string',
        filter: true,
      },
      defaultResultStatus: {
        title: 'Status',
        type: 'string',
        filter: true,
      },
      defaultResultValueType: {
        title: 'Value Type',
        type: 'string',
        filter: true,
      },
      createDt: {
        title: 'Create Date',
        type: 'string',
        filter: true,
      },
      createUserId: {
        title: 'Created By',
        type: 'string',
        filter: true,
      }
    },
  };
  settings2 = {
    actions:{
      custom:[
        {
        name: 'select',
        title: 'delete',
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
      bioSubjectTaxonomy: {
        title: 'Taxa Name',
        type: 'string',
        filter: true,
      },
      createDt: {
        title: 'Added Date',
        type: 'string',
        filter: true,
      },
      createUserId: {
        title: 'Added By',
        type: 'string',
        filter: true,
      },
    },
  };
  settings3 = {
    actions:{
      custom:[
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
      colName: {
        title: 'Field',
        type: 'string',
        filter: true,
      },
      dataFrom: {
        title: 'Data Reported As',
        type: 'string',
        filter: true,
      },
      dataTo: {
        title: 'Will Get Translated To',
        type: 'string',
        filter: true,
      },
    },
  };
  charSource: WqxRefCharOrg[] = [];
  taxaSource: WqxRefTaxaOrg[] = [];
  transSource: WqxImportTranslate[] = [];
  lblMsgShow: boolean = false;
  lblMsg: string = '';
  timeZones: WqxRefDefaultTimeZone[] = [];
  selectedTimeZome: string = '';
  selectedTaxa: string = '';
  taxas: WqxRefData[] = [];
  ddlTaxaShow: boolean = false;
  constructor(private refDataService: WQXRefDataService,
    private authService: NbAuthService,
    private toasterSerice: NbToastrService,
    private router: Router,
    private windowService: NbWindowService,
    private pubSubService: WqxPubsubServiceService,
    private organizationService: WQXOrganizationService) {
      this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {
          this.user = token.getPayload(); // here we receive a payload from the token and assigns it to our `user` variable
          this.currentOrgId = this.user.OrgID;

          this.pubSubService.fieldData.subscribe((data: any) => {
            this.onFieldDataCalled(data);
          });

          this.refDataService.GetT_WQX_REF_DEFAULT_TIME_ZONE().subscribe(
            (data) => {
              this.timeZones = data;
            },
          );

          this.PopulateTabsData();
        }
      });


   }

  ngOnInit() {
  }

  onBtnSaveClick(): void {
    if (this.selectedTimeZome !== '' && this.currentOrgId !== null && this.currentOrgId !== '') {
      this.refDataService.InsertOrUpdateT_WQX_ORGANIZATION(this.currentOrgId,'','','','','','','','','','','',this.selectedTimeZome,this.user.name,'','','','').subscribe(
        (data) => {
          if(data === 1) {
            this.toasterSerice.success('Data Saved');
          }
         },
        (err) => {
          this.toasterSerice.danger('Error encountered');
         }
      );
    }
  }
  onBtnCancelClick(): void {
    this.router.navigate(['/secure/water-quality/wqx-import']);
  }
  onAddCharateristicClicked(): void {
    console.log('onAddCharateristicClicked clicked!');
    this.windowService.open(AddCharWindowComponent, { title: `Add/Edit Characteristic Defaults` });
  }
  onAddTaxaClciked(): void {
    console.log('onAddTaxaClciked clicked!');
    if (this.ddlTaxaShow === false) {
      this.ddlTaxaShow = true;
      this.refDataService.GetT_WQX_REF_DATA('Taxon', true, true).subscribe(
        (data) => { this.taxas = data; },
        (err) => { console.log(err); },
      );
    } else {
      if(this.selectedTaxa !== ''){
        this.refDataService.InsertOrUpdateT_WQX_REF_TAXA_ORG(this.selectedTaxa,this.currentOrgId,this.user.name).subscribe(
          (data) => {
            console.log(data);
            this.populateTaxaGrid(this.currentOrgId);
           },
          (err) => { console.log(err); },
        );
      }
    }
  }

  PopulateTabsData() {
    this.populateCharGrid(this.currentOrgId);
    this.populateTaxaGrid(this.currentOrgId);
    this.populateTranslationGrid(this.currentOrgId);
  }

  populateTranslationGrid(orgId): void {
    this.organizationService.GetWQX_IMPORT_TRANSLATE_byOrg(orgId).subscribe(
      (data) => {
        this.transSource = data;
       },
      (err) => { console.log(err); },
    );
  }
  populateTaxaGrid(orgName): void {
    this.refDataService.GetT_WQX_REF_TAXA_ORG(orgName).subscribe(
      (data) => {
        this.taxaSource = data;
      },
      (err) => { console.log(err); },
    );
  }
  populateCharGrid(orgName): void {
    this.refDataService.GetT_WQX_REF_CHAR_ORG(orgName).subscribe(
      (data) => {
        console.log(data);
        this.charSource = data;
      },
      (err) => { console.log(err); },
    );
  }
  onTaxaSelected(selectedItem): void{
    this.selectedTaxa = selectedItem;
  }
  onAddTranslationClicked(): void {
    console.log('onAddTranslationClicked clicked!');
    this.windowService.open(AddTranslationWindowComponent, { title: `Add New Translation` });
  }
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
  onDeleteConfirm2(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
  onDeleteConfirm3(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
  onCustom(event): void {
     //const orgId = event.data.orgId;
     //this.router.navigate(['/secure/water-quality/wqx-org-edit'], { queryParams: { orgEditId: orgId } });
  }
  onCustom2(event): void {
    //const orgId = event.data.orgId;
    //this.router.navigate(['/secure/water-quality/wqx-org-edit'], { queryParams: { orgEditId: orgId } });
 }
  onCustom3(event): void {
    //const orgId = event.data.orgId;
    //this.router.navigate(['/secure/water-quality/wqx-org-edit'], { queryParams: { orgEditId: orgId } });
  }
  onTimeZoneSelect(selectedItem): void {
    this.selectedTimeZome = selectedItem;
  }
  onFieldDataCalled(data): void {
    this.PopulateTabsData();
  }
}
