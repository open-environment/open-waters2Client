import { Component, OnInit } from '@angular/core';
import { WqxMonlocConfig, WqxMonloc } from '../../../@core/wqx-data/wqx-monloc';
import { NbWindowService, NbWindowRef, NbToastrService } from '@nebular/theme';
import { MonlocConfigWindowComponent } from './monloc-config-window/monloc-config-window.component';
import { WqxPubsubServiceService } from '../../../@core/wqx-services/wqx-pubsub-service.service';
import { User } from '../../../@core/data/users';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { WqxMonlocService } from '../../../@core/wqx-services/wqx-monloc.service';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { AuthService } from '../../../@core/auth/auth.service';

@Component({
  selector: 'ngx-wqx-monloc',
  templateUrl: './wqx-monloc.component.html',
  styleUrls: ['./wqx-monloc.component.scss'],
})
export class WqxMonlocComponent implements OnInit {

  user: User;
  currentOrgId: string;
  chkDeletedInd: boolean = false;
  i = 0;

  configWinRef: NbWindowRef;
  wqxMonlocSource: WqxMonloc[] = [];
  cols: any[];
  defaultCols: any[];

  constructor(private windowService: NbWindowService,
    private pubSubService: WqxPubsubServiceService,
    private authService: NbAuthService,
    private authService1: AuthService,
    private monlocService: WqxMonlocService,
    private router: Router,
    private toasterService: NbToastrService) {
    if (this.authService1.isAuthenticated() === true) {
      const u = this.authService1.getUser();
      console.log(u.profile.sub);
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

      this.currentOrgId = this.user.OrgID;
      if (localStorage.getItem('selectedOrgId') !== null) {
        this.currentOrgId = localStorage.getItem('selectedOrgId');
      }
      this.populateCols();
      this.cols = this.defaultCols;
      this.populateData();
      this.pubSubService.loadOrgId.subscribe((data: string) => {
        console.log('monloc-ngoninit pubsubservice:' + data);
        if (data !== null && data !== undefined && data !== '') {
          this.currentOrgId = data;
          this.populateData();
        }
      });
      this.pubSubService.monlocChkData.subscribe((data: WqxMonlocConfig[]) => {
        this.onConfigSaved(data);
      });


    }
    /* this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        this.user = token.getPayload(); // here we receive a payload from the token and assigns it to our `user` variable
      }
    }); */
  }

  ngOnInit() {


  }
  populateCols() {
    console.log('populateCols called!');
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
    console.log('populateData called!');
    this.populateCols();
    this.cols = this.defaultCols;
    console.log(JSON.stringify(this.cols));
    console.log(this.currentOrgId);
    this.monlocService.GetWQX_MONLOC(!this.chkDeletedInd, this.currentOrgId, false).subscribe(
      (data: WqxMonloc[]) => {
        console.log(data);
        this.wqxMonlocSource = data;
      },
    );
  }
  onConfigSaved(data: WqxMonlocConfig[]) {
    console.log('config saved!');
    console.log('setting default cols...');
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
    console.log(this.chkDeletedInd);
    this.populateData();
  }
  onAddNew(): void {
    console.log('Add New Click!');
    this.router.navigate(['/secure/water-quality/wqx-monloc-edit'], { queryParams: { monlocIdx: -1 } });
  }
  onExcel(): void {
    console.log('onExcel Click!');
  }
  onConfig(): void {
    console.log('onConfig Click!');
    this.configWinRef = this.windowService.open(MonlocConfigWindowComponent, { title: `` });
  }

  onEditClicked(monloc: WqxMonloc) {
    console.log(monloc);
    this.router.navigate(['/secure/water-quality/wqx-monloc-edit'], { queryParams: { monlocIdx: monloc.monlocIdx } });
  }
  onDeleteClicked(monloc: WqxMonloc) {
    console.log('delete action clicked!');
    console.log(monloc.monlocIdx);
    this.monlocService.DeleteT_WQX_MONLOC(monloc.monlocIdx, this.user.userIdx).subscribe(
      (result) => {
        console.log('DeleteT_WQX_MONLOC: valid');
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
        console.log('DeleteT_WQX_MONLOC: failed');
      },
    );
  }
  onSendToEPA(monlocIdx: number) {
    console.log('onSendToEPA clicked!');
    console.log(monlocIdx);
    this.router.navigate(['/secure/water-quality/wqx-hist'], { queryParams: { monlocIdx: monlocIdx } });
  }
}
