import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WqxMapsComponent } from './wqx-maps.component';

describe('WqxMapsComponent', () => {
  let component: WqxMapsComponent;
  let fixture: ComponentFixture<WqxMapsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WqxMapsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WqxMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
