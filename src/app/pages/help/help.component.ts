import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import { WqxAdminService } from '../../@core/wqx-services/wqx-admin.service';

@Component({
  selector: 'ngx-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

  constructor(private adminService: WqxAdminService) { }

  ngOnInit() {
  }

  downloadFile(fileName) {
    this.adminService.DownloadFile(fileName).subscribe(
      (result: any) => {
        // const contentDisposition = result.headers.get('content-disposition');
        // const filename = contentDisposition.split(';')[1].split('filename')[1].split('=')[1].trim();
        this.download(result.body, fileName);
      },
      (err) => {
        //console.log('DownloadFile: failed');
        console.log(err);
      },
    );
  }
  download(blob: Blob, nameFile?: string) {
    saveAs(blob, nameFile);
  }
}
