import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripsHistoryComponent } from './trips-history.component';

describe('TripsHistoryComponent', () => {
  let component: TripsHistoryComponent;
  let fixture: ComponentFixture<TripsHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripsHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
