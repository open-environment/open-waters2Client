import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WqxMgmtComponent } from './wqx-mgmt.component';

describe('WqxMgmtComponent', () => {
  let component: WqxMgmtComponent;
  let fixture: ComponentFixture<WqxMgmtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WqxMgmtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WqxMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
