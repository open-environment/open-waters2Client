import { Component, OnInit } from '@angular/core';
import { NbWindowRef, NbWindowService } from '@nebular/theme';

@Component({
  selector: 'ngx-ref-data-entry',
  templateUrl: './ref-data-entry.component.html',
  styleUrls: ['./ref-data-entry.component.scss']
})
export class RefDataEntryComponent implements OnInit {

  txtID: string = '';
  txtName: string = '';
  txtDesc: string = '';
  ctx: string = '';
  constructor(protected windowRef: NbWindowRef) { }

  ngOnInit() {
    this.ctx = this.windowRef.config.context.toString();
  }

  onSubmit(f) {
    console.log(f);
    const obj = {
      id: this.txtID,
      name: this.txtName,
      desc: this.txtDesc,
      ctx: this.ctx,
    };
    this.windowRef.config.context = obj;
    this.windowRef.close();
  }
  onCancelClicked() {
    this.windowRef.close();
  }
}
