import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelcoSearchComponent } from './telco-search.component';

describe('TelcoSearchComponent', () => {
  let component: TelcoSearchComponent;
  let fixture: ComponentFixture<TelcoSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelcoSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TelcoSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
