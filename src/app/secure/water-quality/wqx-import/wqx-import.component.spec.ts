import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WqxImportComponent } from './wqx-import.component';

describe('WqxImportComponent', () => {
  let component: WqxImportComponent;
  let fixture: ComponentFixture<WqxImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WqxImportComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WqxImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
