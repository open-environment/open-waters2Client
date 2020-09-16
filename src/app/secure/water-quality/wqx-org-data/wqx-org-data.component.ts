import { Component, OnInit } from '@angular/core';
import { WqxRefDefaultTimeZone, WqxRefTaxaOrg, WqxRefCharOrg } from '../../../@core/wqx-data/wqx-refdata';
import { WqxRefData, WqxImportTranslate } from '../../../@core/wqx-data/wqx-organization';
import { WQXRefDataService } from '../../../@core/wqx-services/wqx-refdata-service';
import { User } from '../../../@core/data/users';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { NbToastrService, NbWindowService, NbWindowState } from '@nebular/theme';
import { Router } from '@angular/router';
import { AddCharWindowComponent } from './add-char-window/add-char-window.component';
import { AddTranslationWindowComponent } from './add-translation-window/add-translation-window.component';
import { WqxPubsubServiceService } from '../../../@core/wqx-services/wqx-pubsub-service.service';
import { WQXOrganizationService } from '../../../@core/wqx-services/wqx-organization-service';

@Component({
  selector: 'ngx-wqx-org-data',
  templateUrl: './wqx-org-data.component.html',
  styleUrls: ['./wqx-org-data.component.scss'],
})
export class WqxOrgDataComponent implements OnInit {
  user: User;
  currentOrgId: string;
  settings = {
    actions: {
      custom: [
        {
          name: 'edit',
          title: '<i class="ion-edit" title="Edit"></i>',
        },
        {
          name: 'delete',
          title: '<i class="far fa-trash-alt" title="delete"></i>',
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
        filter: false,
      },
      defaultUnit: {
        title: 'Unit',
        type: 'string',
        filter: false,
      },
      defaultDetectLimit: {
        title: 'Detect Limit',
        type: 'string',
        filter: false,
      },
      defaultLowerQuantLimit: {
        title: 'Lower Quant Limit',
        type: 'string',
        filter: false,
      },
      defaultUpperQuantLimit: {
        title: 'Upper Quant Limit',
        type: 'string',
        filter: false,
      },
      analyticMethodId: {
        title: 'Analysis Method',
        type: 'string',
        filter: false,
      },
      defaultSampFraction: {
        title: 'Sample Fraction',
        type: 'string',
        filter: false,
      },
      defaultResultStatus: {
        title: 'Status',
        type: 'string',
        filter: false,
      },
      defaultResultValueType: {
        title: 'Value Type',
        type: 'string',
        filter: false,
      },
      createDt: {
        title: 'Create Date',
        type: 'string',
        filter: false,
      },
      createUserId: {
        title: 'Created By',
        type: 'string',
        filter: false,
      },
    },
  };
  settings2 = {
    actions: {
      custom: [
        {
          name: 'delete',
          title: '<i class="far fa-trash-alt" title="delete"></i>',
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
        filter: false,
      },
      createDt: {
        title: 'Added Date',
        type: 'string',
        filter: false,
      },
      createUserId: {
        title: 'Added By',
        type: 'string',
        filter: false,
      },
    },
  };
  settings3 = {
    actions: {
      custom: [
        {
          name: 'delete',
          title: '<i class="far fa-trash-alt" title="delete"></i>',
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
        filter: false,
      },
      dataFrom: {
        title: 'Data Reported As',
        type: 'string',
        filter: false,
      },
      dataTo: {
        title: 'Will Get Translated To',
        type: 'string',
        filter: false,
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
        this.pubSubService.charData.subscribe((data: any) => {
          this.onCharDataCalled(data);
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

    if (localStorage.getItem('selectedOrgId') !== null) {
      this.currentOrgId = localStorage.getItem('selectedOrgId');
    }
  }

  onBtnSaveClick(): void {
    if (this.selectedTimeZome !== '' && this.currentOrgId !== null && this.currentOrgId !== '') {
      this.refDataService.InsertOrUpdateT_WQX_ORGANIZATION(this.currentOrgId, '', '', '', '', '', '', '', '', '', '', '', this.selectedTimeZome, this.user.name, '', '', '', '').subscribe(
        (data) => {
          if (data === 1) {
            this.toasterSerice.success('Data Saved');
          }
        },
        (err) => {
          this.toasterSerice.danger('Error encountered');
        },
      );
    }
  }
  onBtnCancelClick(): void {
    this.router.navigate(['/secure/water-quality/wqx-import']);
  }
  onAddCharateristicClicked(): void {
    console.log('onAddCharateristicClicked clicked!');
    this.windowService.open(AddCharWindowComponent, { title: `Add/Edit Characteristic Defaults`, initialState: NbWindowState.MAXIMIZED });
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
      if (this.selectedTaxa !== '') {
        this.refDataService.InsertOrUpdateT_WQX_REF_TAXA_ORG(this.selectedTaxa, this.currentOrgId, this.user.name).subscribe(
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
  onTaxaSelected(selectedItem): void {
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
    if (event.action === 'edit') {
      console.log(event.data);
      // implementation pending
    }
    if (event.action === 'delete') {
      this.refDataService.DeleteT_WQX_REF_CHAR_ORG(this.currentOrgId, event.data.charName).subscribe(
        (result) => {
          this.populateCharGrid(this.currentOrgId);
        },
        (err) => { console.log(err); },
      );
    }
  }
  onCustom2(event): void {
    if (event.action === 'delete') {
      this.refDataService.DeleteT_WQX_REF_TAXA_ORG(this.currentOrgId, event.data.bioSubjectTaxonomy).subscribe(
        (result) => {
          this.populateTaxaGrid(this.currentOrgId);
        },
        (err) => { console.log(err); },
      );
    }
  }
  onCustom3(event): void {
    if (event.action === 'delete') {
      this.refDataService.DeleteT_WQX_IMPORT_TRANSLATE(event.data.translateIdx).subscribe(
        (result) => {
          this.populateTranslationGrid(this.currentOrgId);
        },
        (err) => { console.log(err); },
      );
    }
  }
  onTimeZoneSelect(selectedItem): void {
    this.selectedTimeZome = selectedItem;
  }
  onFieldDataCalled(data): void {
    this.PopulateTabsData();
  }
  onCharDataCalled(data): void {
    this.PopulateTabsData();
  }
}
