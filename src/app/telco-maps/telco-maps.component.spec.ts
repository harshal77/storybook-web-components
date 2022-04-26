import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelcoMapsComponent } from './telco-maps.component';

describe('TelcoMapsComponent', () => {
  let component: TelcoMapsComponent;
  let fixture: ComponentFixture<TelcoMapsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelcoMapsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TelcoMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
