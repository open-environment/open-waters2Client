import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WqxImportFromEpaComponent } from './wqx-import-from-epa.component';

describe('WqxImportFromEpaComponent', () => {
  let component: WqxImportFromEpaComponent;
  let fixture: ComponentFixture<WqxImportFromEpaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WqxImportFromEpaComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WqxImportFromEpaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
