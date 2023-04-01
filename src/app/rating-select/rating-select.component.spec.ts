import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingSelectComponent } from './rating-select.component';

describe('RatingSelectComponent', () => {
  let component: RatingSelectComponent;
  let fixture: ComponentFixture<RatingSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RatingSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RatingSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
