import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WqxActivityComponent } from './wqx-activity.component';

describe('WqxActivityComponent', () => {
  let component: WqxActivityComponent;
  let fixture: ComponentFixture<WqxActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WqxActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WqxActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
