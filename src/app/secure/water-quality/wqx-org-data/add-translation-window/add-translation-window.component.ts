import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { User } from '../../../../@core/data/users';
import { NbWindowRef } from '@nebular/theme';
import { WQXRefDataService } from '../../../../@core/wqx-services/wqx-refdata-service';
import { WqxPubsubServiceService } from '../../../../@core/wqx-services/wqx-pubsub-service.service';


@Component({
  selector: 'ngx-add-translation-window',
  templateUrl: './add-translation-window.component.html',
  styleUrls: ['./add-translation-window.component.scss']
})
export class AddTranslationWindowComponent implements OnInit {

  @Output() fieldAdded = new EventEmitter<{isFieldAdded: boolean}>();
  user: User;
  currentOrgId: string = '';
  fields: string[] = [];
  selectedField: string = '';
  txtFrom: string = '';
  txtTo: string = '';

  constructor(public windowRef: NbWindowRef,
    private refDataService: WQXRefDataService,
    private authService: NbAuthService,
    private pubSubService: WqxPubsubServiceService) {
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        this.user = token.getPayload(); // here we receive a payload from the token and assigns it to our `user` variable
        this.currentOrgId = this.user.OrgID;
        this.refDataService.GetAllColumnBasic('S').subscribe(
          (data) => {
            this.fields = data;
           },
          (err) => { console.log(err); },
        );
      }
    });
   }

  ngOnInit() {
  }

  onFieldSelected(selectedItem): void {
    this.selectedField = selectedItem;
    console.log(this.selectedField);
  }
  onAddTranslate2Clicked(): void {
    console.log('onAddTranslate2Clicked');
    this.refDataService.InsertOrUpdateWQX_IMPORT_TRANSLATE(null, this.currentOrgId, this.selectedField, this.txtFrom, this.txtTo, this.user.name).subscribe(
      (data) => {
        console.log(data);
        this.pubSubService.fieldChanged(true);
       },
      (err) => { console.log(err); },
    );
  }
  onCloseModel1Clicked(): void {
    console.log('onCloseModel1Clicked');
  }
}
