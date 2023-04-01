import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TripsInfoService } from '../trips-info.service';

@Component({
  selector: 'app-rating-select',
  templateUrl: './rating-select.component.html',
  styleUrls: ['./rating-select.component.css']
})
export class RatingSelectComponent implements OnChanges {
  currValue : number = -1;
  isStarSelected : boolean[] = [false, false, false, false, false];
  selectedStars : Rating[] = new Array<Rating>();

  dataHandler : TripsInfoService;

  @Input() resetSignal : boolean = false;

  constructor(dataHandler : TripsInfoService) {
    this.dataHandler = dataHandler;
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (let i = 0; i < 5; i++)
      this.isStarSelected[i] = false;
    if (this.selectedStars.length > 0)
      this.selectedStars.splice(0, this.selectedStars.length);
    this.currValue = -1;
  }

  public addRating() {
    this.isStarSelected[this.currValue] = true;
    let caption : string = "";
    for (let j = 0; j <= this.currValue; j++)
      caption += "star ";
    this.selectedStars.push({id: this.currValue, text: caption} as Rating);
    this.dataHandler.filter.changeRatingState(this.currValue);
    this.dataHandler.updateFiltering();
  }

  public removeRating(id : number) {
    const starCount = this.selectedStars[id].id;
    this.isStarSelected[starCount] = false;
    this.currValue = -1;
    if (id == 0)
      this.selectedStars.shift();
    else
      this.selectedStars.splice(id, 1);
    this.dataHandler.filter.changeRatingState(starCount);
    this.dataHandler.updateFiltering();
  }

}

interface Rating {
  id : number;
  text : string;
}