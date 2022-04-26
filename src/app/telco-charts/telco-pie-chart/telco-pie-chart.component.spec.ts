import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelcoPieChartComponent } from './telco-pie-chart.component';

describe('TelcoPieChartComponent', () => {
  let component: TelcoPieChartComponent;
  let fixture: ComponentFixture<TelcoPieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelcoPieChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TelcoPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
