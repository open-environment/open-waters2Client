import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WqxProjectComponent } from './wqx-project.component';

describe('WqxProjectComponent', () => {
  let component: WqxProjectComponent;
  let fixture: ComponentFixture<WqxProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WqxProjectComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WqxProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
