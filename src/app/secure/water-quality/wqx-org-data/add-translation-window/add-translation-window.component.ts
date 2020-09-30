import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { User } from '../../../../@core/data/users';
import { NbWindowRef } from '@nebular/theme';
import { WQXRefDataService } from '../../../../@core/wqx-services/wqx-refdata-service';
import { WqxPubsubServiceService } from '../../../../@core/wqx-services/wqx-pubsub-service.service';
import { AuthService } from '../../../../@core/auth/auth.service';


@Component({
  selector: 'ngx-add-translation-window',
  templateUrl: './add-translation-window.component.html',
  styleUrls: ['./add-translation-window.component.scss'],
})
export class AddTranslationWindowComponent implements OnInit {

  @Output() fieldAdded = new EventEmitter<{ isFieldAdded: boolean }>();
  user: User;
  currentOrgId: string = '';
  fields: string[] = [];
  selectedField: string = '';
  txtFrom: string = '';
  txtTo: string = '';

  constructor(public windowRef: NbWindowRef,
    private refDataService: WQXRefDataService,
    private authService: NbAuthService,
    private authService1: AuthService,
    private pubSubService: WqxPubsubServiceService) {
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
      this.refDataService.GetAllColumnBasic('S').subscribe(
        (data) => {
          this.fields = data;
        },
        (err) => { console.log(err); },
      );
    }
    /* this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        this.user = token.getPayload(); // here we receive a payload from the token and assigns it to our `user` variable
        
      }
    }); */
  }

  ngOnInit() {

    if (localStorage.getItem('selectedOrgId') !== null) {
      this.currentOrgId = localStorage.getItem('selectedOrgId');
    }
  }

  onFieldSelected(selectedItem): void {
    this.selectedField = selectedItem;
    console.log(this.selectedField);
  }
  onSubmit(): void {
    this.refDataService.InsertOrUpdateWQX_IMPORT_TRANSLATE(null, this.currentOrgId, this.selectedField, this.txtFrom, this.txtTo, this.user.name).subscribe(
      (data) => {
        console.log(data);
        this.pubSubService.fieldChanged(true);
      },
      (err) => { console.log(err); },
      () => {
        this.windowRef.close();
      },
    );
  }
  onCloseModel1Clicked(): void {
    this.windowRef.close();
  }
}
