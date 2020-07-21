import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmDataSynchComponent } from './adm-data-synch.component';

describe('AdmDataSynchComponent', () => {
  let component: AdmDataSynchComponent;
  let fixture: ComponentFixture<AdmDataSynchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmDataSynchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmDataSynchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
