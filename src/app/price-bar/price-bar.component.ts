import { Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import { TripsInfoService } from '../trips-info.service';

@Component({
  selector: 'app-price-bar',
  templateUrl: './price-bar.component.html',
  styleUrls: ['./price-bar.component.css']
})
export class PriceBarComponent implements OnChanges{
  private minGap : number = 5;
  lowerValue : number = 0;
  higherValue : number = 100;
  lowerPrice : number = 0;
  higherPrice : number = 0;

  dataHandler : TripsInfoService;

  @Input() resetSignal : boolean = false;

  constructor(dataHandler : TripsInfoService) {
    this.dataHandler = dataHandler;
    this.updatePrices();
  }

  private updatePrices() {
    let minPrice = this.dataHandler.getMinPrice();
    let maxPrice = this.dataHandler.getMaxPrice();
    this.lowerPrice = Math.floor(minPrice + (maxPrice - minPrice) * this.lowerValue / 100);
    this.higherPrice = Math.ceil(minPrice + (maxPrice - minPrice) * this.higherValue / 100);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.lowerValue = 0;
    this.higherValue = 100;
    this.updatePrices();
  }

  public handleFirst() {
    if (this.higherValue - this.lowerValue < this.minGap) {
      this.lowerValue = this.higherValue - this.minGap;
      (<HTMLInputElement>document.getElementById("i1")).value = (this.lowerValue).toString();
    }
    this.updatePrices();
  }

  public handleSecond() {
    if (this.higherValue - this.lowerValue < this.minGap) {
      this.higherValue = this.lowerValue + this.minGap;
      (<HTMLInputElement>document.getElementById("i2")).value = (this.higherValue).toString();
    }
    this.updatePrices();
  }

  public updateFilters() {
    this.dataHandler.filter.setPriceMin(this.lowerPrice);
    this.dataHandler.filter.setPriceMax(this.higherPrice);
    this.dataHandler.updateFiltering();
  }

}
