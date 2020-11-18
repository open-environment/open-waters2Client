import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbWindowService, NbWindowRef, NbToastrService } from '@nebular/theme';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../@core/auth/auth.service';
import { User } from '../../../@core/data/users';
import { WqxMonlocConfig, WqxMonloc, WqxMonloc4Excel } from '../../../@core/wqx-data/wqx-monloc';
import { MonlocConfigWindowComponent } from './monloc-config-window/monloc-config-window.component';
import { WqxPubsubServiceService } from '../../../@core/wqx-services/wqx-pubsub-service.service';
import { WqxMonlocService } from '../../../@core/wqx-services/wqx-monloc.service';


@Component({
  selector: 'ngx-wqx-monloc',
  templateUrl: './wqx-monloc.component.html',
  styleUrls: ['./wqx-monloc.component.scss'],
})
export class WqxMonlocComponent implements OnInit, OnDestroy {

  user: User;
  currentOrgId: string;
  chkDeletedInd: boolean = false;

  configWinRef: NbWindowRef;
  wqxMonlocSource: WqxMonloc[] = [];
  cols: any[];
  defaultCols: any[];

  pubSubServiceSubscription: Subscription[] = [];
  monlocServiceSubscription: Subscription[] = [];

  constructor(
    private windowService: NbWindowService,
    private router: Router,
    private toasterService: NbToastrService,
    private pubSubService: WqxPubsubServiceService,
    private authService: AuthService,
    private monlocService: WqxMonlocService,
  ) {
    localStorage.setItem('currentPage', 'monloc');
    if (this.authService.isAuthenticated() === true) {
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

      this.currentOrgId = this.user.OrgID;
      if (localStorage.getItem('selectedOrgId') !== null) {
        this.currentOrgId = localStorage.getItem('selectedOrgId');
      }
      this.populateCols();
      this.cols = this.defaultCols;
      this.populateData();
      this.pubSubServiceSubscription.push(this.pubSubService.loadOrgId.subscribe((data: string) => {
        if (localStorage.getItem('currentPage') === 'monloc') {
          if (data !== null && data !== undefined && data !== '') {
            this.currentOrgId = data;
            this.populateData();
          }
        }
      }));
      this.pubSubServiceSubscription.push(this.pubSubService.monlocChkData.subscribe((data: WqxMonlocConfig[]) => {
        this.onConfigSaved(data);
      }));


    }
  }
  ngOnDestroy(): void {
    this.pubSubServiceSubscription.forEach(element => {
      element.unsubscribe();
    });
    this.monlocServiceSubscription.forEach(element => {
      element.unsubscribe();
    });
  }

  ngOnInit() { }

  populateCols() {
    this.defaultCols = [
      { field: 'monlocId', header: 'ID' },
      { field: 'monlocName', header: 'Name' },
      { field: 'monlocType', header: 'Type' },
      { field: 'monlocDesc', header: 'Description' },
      { field: 'latitudeMsr', header: 'Latitude' },
      { field: 'longitudeMsr', header: 'Longitude' },
      { field: 'wellholeDepthMsrUnit', header: 'Depth Unit' },
    ];
  }
  populateData() {
    this.populateCols();
    this.cols = this.defaultCols;
    this.monlocServiceSubscription.push(this.monlocService.GetWQX_MONLOC(!this.chkDeletedInd, this.currentOrgId, false).subscribe(
      (data: WqxMonloc[]) => {
        console.log(this.currentOrgId);
        this.wqxMonlocSource = data;
      },
    ));
  }
  onConfigSaved(data: WqxMonlocConfig[]) {
    // Avoid copy by reference
    this.cols = JSON.parse(JSON.stringify(this.defaultCols));

    data.forEach(element => {
      if (element.value === true) {
        this.cols.push({ field: element.field, header: element.header });
      }
    });
  }

  onChkDeletedInd(checked: boolean) {
    this.chkDeletedInd = checked;
    this.populateData();
  }
  onAddNew(): void {
    this.router.navigate(['/secure/water-quality/wqx-monloc-edit'], { queryParams: { monlocIdx: -1 } });
  }

  onConfig(): void {
    this.configWinRef = this.windowService.open(MonlocConfigWindowComponent,
      {
        title: ``,
        hasBackdrop: true,
        closeOnBackdropClick: true,
        closeOnEsc: true,
      });
    this.configWinRef.stateChange.subscribe(
      (data) => {
        console.log(data);
        if (data) {
          if (data.newState !== 'full-screen') this.configWinRef.fullScreen();
        }
      },
    );
  }

  onEditClicked(monloc: WqxMonloc) {
    this.router.navigate(['/secure/water-quality/wqx-monloc-edit'], { queryParams: { monlocIdx: monloc.monlocIdx } });
  }
  onDeleteClicked(monloc: WqxMonloc) {
    this.monlocServiceSubscription.push(this.monlocService.DeleteT_WQX_MONLOC(monloc.monlocIdx, this.user.userIdx).subscribe(
      (result) => {
        if (result === 1) {
          this.toasterService.success('Record successfully deleted.', '', { destroyByClick: true, duration: 5000 });
        } else if (result === -1) {
          this.toasterService.danger('Activities found for this monitoring location - location cannot be deleted.', '', { destroyByClick: true, duration: 5000 });
        } else if (result === 0) {
          this.toasterService.danger('Unable to delete monitoring location.', '', { destroyByClick: true, duration: 5000 });
        } else {

        }
        this.populateData();
      },
      (err) => {
        console.log(err);
      },
    ));
  }

  exportExcel() {
    const temp: WqxMonloc4Excel[] = [];
    this.wqxMonlocSource.map(x => {
      const t = {} as WqxMonloc4Excel;
      t.ID = x.monlocId;
      t.Name = x.monlocName;
      t.Type = x.monlocType;
      t.Description = x.monlocDesc;
      t.EightDigitHUC = x.hucEight;
      t.TwelveDigitHUC = x.hucTwelve;
      t.TribalLand = x.tribalLandInd;
      t.Latitude = x.latitudeMsr;
      t.Longitude = x.longitudeMsr;
      if (x.sourceMapScale) t.SourceMapScale = x.sourceMapScale.toString();
      t.HorizCollectionMethod = x.horizCollMethod;
      t.HorizDatum = x.horizRefDatum;
      t.VertialMeasure = x.vertMeasure;
      t.Unit = x.vertMeasureUnit;
      t.VerticalCollectionMethod = x.vertCollMethod;
      t.VerticalDatum = x.vertRefDatum;
      t.County = x.countyCode;
      t.State = x.stateCode;
      t.Country = x.countryCode;
      t.WellType = x.wellType;
      t.Aquifer = x.aquiferName;
      t.Formation = x.formationType;
      t.WellholeDepth = x.wellholeDepthMsr;
      t.DepthUnit = x.wellholeDepthMsrUnit;
      if (x.wqxInd) {
        t.SendToEPA = x.wqxInd.toString();
      } else {
        t.SendToEPA = 'false';
      }
      temp.push(t);
    });

    console.log(temp);
    import('xlsx').then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(temp);
      const workbook = { Sheets: { 'MonLocExport': worksheet }, SheetNames: ['MonLocExport'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, 'MonLocExport');
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
  onSendToEPA(monlocIdx: number) {
    this.router.navigate(['/secure/water-quality/wqx-hist'], { queryParams: { TableCD: 'MLOC', TableIdx: monlocIdx } });
  }
}
