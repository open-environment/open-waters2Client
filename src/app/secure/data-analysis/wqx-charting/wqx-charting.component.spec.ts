import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WqxChartingComponent } from './wqx-charting.component';

describe('WqxChartingComponent', () => {
  let component: WqxChartingComponent;
  let fixture: ComponentFixture<WqxChartingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WqxChartingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WqxChartingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
