import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { User } from '../../../@core/data/users';
import { TWqxImportTempMonloc } from '../../../@core/wqx-data/wqx-import';
import { WqxImportService } from '../../../@core/wqx-services/wqx-import.service';

@Component({
  selector: 'ngx-wqx-import-monloc',
  templateUrl: './wqx-import-monloc.component.html',
  styleUrls: ['./wqx-import-monloc.component.scss'],
})
export class WqxImportMonlocComponent implements OnInit {

  user: User;
  tempMonlocs: TWqxImportTempMonloc[];
  selectedTempMonlocs: TWqxImportTempMonloc[];
  wqxImport: boolean = false;
  wqxSubmitStatus: string = 'U';

  constructor(private activatedRout: ActivatedRoute,
    private authService: NbAuthService,
    private importService: WqxImportService,
    private router: Router) { }

  ngOnInit() {
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        this.user = token.getPayload(); // here we receive a payload from the token and assigns it to our `user` variable
        console.log(this.user);
        console.log('called GetWQX_IMPORT_TEMP_MONLOCByUserIdx wtih userIdx: ' + this.user.userIdx);
        this.importService.GetWQX_IMPORT_TEMP_MONLOCByUserIdx(this.user.userIdx).subscribe(
          (data: TWqxImportTempMonloc[]) => {
            console.log('GetWQX_IMPORT_TEMP_MONLOCByUserIdx: valid');
            console.log(data);
            this.tempMonlocs = data;
          },
          (err) => {
            console.log('GetWQX_IMPORT_TEMP_MONLOCByUserIdx: falied');
            console.log(err);
          },
        );
      }
    });
    /* this.activatedRoute.queryParams.subscribe(params => {
      this.orgEditId = params['userid'];
    }); */
  }

  selectRow(checkValue) {
    console.log(checkValue);
  }
  onRowSelect(event) {
    // console.log('nRowSelect');
    // console.log(event.data);
  }

  onRowUnselect(event) {
    // console.log('onRowUnselect');
    // console.log(event.data);
  }
  onBtnImportClicked() {
    console.log('btnImportClicked!');

    // TODO:
    // if importing data from EPA, then save the records as already synced and passing
    // bool wqxImport = ((Request.QueryString["e"] ?? "") == "1") ? true : chkWQXImport.Checked;
    // string wqxSubmitStatus = ((Request.QueryString["e"] ?? "") == "1") ? "Y" : "U";
    console.log(this.selectedTempMonlocs);
    console.log(this.wqxImport);
    let _selectedTempMonlocIds: string = '';
    if (this.selectedTempMonlocs !== undefined && this.selectedTempMonlocs.length > 0) {
      this.selectedTempMonlocs.forEach(element => {
        _selectedTempMonlocIds += element.tempMonlocIdx.toString() + ',';
      });
      if (_selectedTempMonlocIds.length > 0) {
        if (_selectedTempMonlocIds.endsWith(',')) {
          _selectedTempMonlocIds = _selectedTempMonlocIds.substring(0, _selectedTempMonlocIds.length - 1);
        }
        console.log(_selectedTempMonlocIds);
        this.importService.ProcessImportTempMonloc(this.wqxImport, this.wqxSubmitStatus, _selectedTempMonlocIds, this.user.userIdx).subscribe(
          (result) => {
            console.log('ProcessImport: valid');
            console.log(result);
            this.router.navigate(['/secure/water-quality/wqx-import']);
          },
          (err) => {
            console.log('ProcessImport: failed');
            console.log(err);
          },
        );
      }
    }
  }
  onButtonCancelImportClicked() {
    console.log('onButtonCancelImportClicked!');
    this.importService.CancelProcessImportTempMonloc(this.user.userIdx).subscribe(
      (result) => {
        console.log('CancelProcessImport: valid');
        console.log(result);
        this.router.navigate(['/secure/water-quality/wqx-import']);
      },
      (err) => {
        console.log('CancelProcessImport: failed');
        console.log(err);
      },
    );
  }
}