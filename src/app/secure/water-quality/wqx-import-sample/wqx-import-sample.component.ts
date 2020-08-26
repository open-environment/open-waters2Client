import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { User } from '../../../@core/data/users';
import { TWqxImportTempMonloc, ImportSampleResultDisplay } from '../../../@core/wqx-data/wqx-import';
import { WqxImportService } from '../../../@core/wqx-services/wqx-import.service';

@Component({
  selector: 'ngx-wqx-import-sample',
  templateUrl: './wqx-import-sample.component.html',
  styleUrls: ['./wqx-import-sample.component.scss']
})
export class WqxImportSampleComponent implements OnInit {

  user: User;
  importSamples: ImportSampleResultDisplay[];
  selectedimportSamples: ImportSampleResultDisplay[];
  wqxImport: boolean = false;
  wqxSubmitStatus: string = 'U';
  activityReplaceType: string = 'R';
  constructor(private activatedRout: ActivatedRoute,
    private authService: NbAuthService,
    private importService: WqxImportService,
    private router: Router) { }

  ngOnInit() {
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        this.user = token.getPayload(); // here we receive a payload from the token and assigns it to our `user` variable
        console.log(this.user);
        console.log('called GetWQX_IMPORT_TEMP_SAMPLEByUserIdx wtih userIdx: ' + this.user.userIdx);
        this.importService.GetWQX_IMPORT_TEMP_SAMPLEByUserIdx(this.user.userIdx).subscribe(
          (data: ImportSampleResultDisplay[]) => {
            console.log('GetWQX_IMPORT_TEMP_SAMPLEByUserIdx: valid');
            console.log(data);
            this.importSamples = data;
          },
          (err) => {
            console.log('GetWQX_IMPORT_TEMP_SAMPLEByUserIdx: falied');
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

    this.importService.ProcessImportTempSample(this.wqxSubmitStatus, this.activityReplaceType, this.user.userIdx).subscribe(
      (result) => {
        console.log('ProcessImport: valid');
        console.log(result);
        this.router.navigate(['/secure/water-quality/wqx-import']);
      },
      (err) => {
        console.log('ProcessImport: failed');
        console.log(err);
        this.router.navigate(['/secure/water-quality/wqx-import']);
      },
    );

    // TODO:
    // if importing data from EPA, then save the records as already synced and passing
    // bool wqxImport = ((Request.QueryString["e"] ?? "") == "1") ? true : chkWQXImport.Checked;
    // string wqxSubmitStatus = ((Request.QueryString["e"] ?? "") == "1") ? "Y" : "U";
    /* console.log(this.selectedimportSamples);
    console.log(this.wqxImport);
    let _selectedImportSampleIds: string = '';
    this.selectedimportSamples.forEach(element => {
      _selectedImportSampleIds += element.TempSampleIdx.toString() + ',';
    }); 
    if (_selectedImportSampleIds.length > 0) {
      if (_selectedImportSampleIds.endsWith(',')) {
        _selectedImportSampleIds = _selectedImportSampleIds.substring(0, _selectedImportSampleIds.length - 1);
      }
      console.log(_selectedImportSampleIds);
      this.importService.ProcessImportTempSample(this.wqxSubmitStatus, this.activityReplaceType, this.user.userIdx).subscribe(
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
    } */


  }
  onButtonCancelImportClicked() {
    console.log('onButtonCancelImportClicked!');
    this.importService.CancelProcessImportTempSample(this.user.userIdx).subscribe(
      (result) => {
        console.log('CancelProcessImportTempSample: valid');
        console.log(result);
        this.router.navigate(['/secure/water-quality/wqx-import']);
      },
      (err) => {
        console.log('CancelProcessImportTempSample: failed');
        console.log(err);
      },
    );
  }
}
