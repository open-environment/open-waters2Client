import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WqxAssesmentRptsComponent } from './wqx-assesment-rpts.component';

describe('WqxAssesmentRptsComponent', () => {
  let component: WqxAssesmentRptsComponent;
  let fixture: ComponentFixture<WqxAssesmentRptsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WqxAssesmentRptsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WqxAssesmentRptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
