import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbMenuService } from '@nebular/theme';

@Component({
  selector: 'ngx-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss'],
})
export class UnauthorizedComponent implements OnInit {
  data: string;
  constructor(private router: Router,
    private menuService: NbMenuService) {
    this.menuService.collapseAll();
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state as { data: string };
    this.data = state.data;
  }

  ngOnInit() {
  }

  goToHome() {
    this.router.navigate(['/auth/login']);
  }
}
