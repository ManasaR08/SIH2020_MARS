import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardResultComponent } from './dashboard-result.component';

describe('DashboardResultComponent', () => {
  let component: DashboardResultComponent;
  let fixture: ComponentFixture<DashboardResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
