import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelcoListComponent } from './telco-list.component';

describe('TelcoListComponent', () => {
  let component: TelcoListComponent;
  let fixture: ComponentFixture<TelcoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelcoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TelcoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
