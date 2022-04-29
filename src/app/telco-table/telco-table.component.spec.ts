import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelcoTableComponent } from './telco-table.component';

describe('TelcoTableComponent', () => {
  let component: TelcoTableComponent;
  let fixture: ComponentFixture<TelcoTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelcoTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TelcoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
