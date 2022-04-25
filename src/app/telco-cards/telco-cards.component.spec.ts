import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelcoCardsComponent } from './telco-cards.component';

describe('TelcoCardsComponent', () => {
  let component: TelcoCardsComponent;
  let fixture: ComponentFixture<TelcoCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelcoCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TelcoCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
