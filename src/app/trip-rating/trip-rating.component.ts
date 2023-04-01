import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-trip-rating',
  templateUrl: './trip-rating.component.html',
  styleUrls: ['./trip-rating.component.css']
})
export class TripRatingComponent {
  indices : number[] = new Array(0, 1, 2, 3, 4);
  @Input() choosedStar : number = 0;
  @Output() ratingBeenSet = new EventEmitter<number>();

  constructor() {}

  public setStarRate(starNumber : number) {
    if (this.choosedStar == 0) {
      this.choosedStar = starNumber;
      this.ratingBeenSet.emit(starNumber);
    }
  }
}
