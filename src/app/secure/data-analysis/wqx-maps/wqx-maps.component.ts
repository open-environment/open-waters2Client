import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../@core/auth/auth.service';
import { User } from '../../../@core/data/users';
import { VWqxActivityLatest } from '../../../@core/wqx-data/wqx-activity';
import { WQXActivityService } from '../../../@core/wqx-services/wqx-activity-service';

@Component({
  selector: 'ngx-wqx-maps',
  templateUrl: './wqx-maps.component.html',
  styleUrls: ['./wqx-maps.component.scss'],
})
export class WqxMapsComponent implements OnInit {

  user: User;
  currentOrgId: string = '';
  latestActivities: VWqxActivityLatest[];
  cols: any[];

  constructor(private authService: AuthService,
    private activityService: WQXActivityService) {
    const u = this.authService.getUser();
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
  }

  ngOnInit() {
    this.cols = [
      { field: 'monlocName', header: 'Location' },
      { field: 'actStartDt', header: 'Last Sampled' },
      { field: 'alkalinityTotal', header: 'Alkalinity (mg/l)' },
    ];

    this.activityService.GetVWqxActivityLatest(this.currentOrgId).subscribe(
      (result: VWqxActivityLatest[]) => {
        console.log('GetVWqxActivityLatest: valid');
        console.log(result);
        this.latestActivities = result;
      },
      (err) => {
        console.log('GetVWqxActivityLatest: failed');
        console.log(err);
      },
    );
  }

}
