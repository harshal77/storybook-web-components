import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelcoBarChartComponent } from './telco-bar-chart.component';

describe('TelcoBarChartComponent', () => {
  let component: TelcoBarChartComponent;
  let fixture: ComponentFixture<TelcoBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelcoBarChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TelcoBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
