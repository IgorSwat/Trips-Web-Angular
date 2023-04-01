import { Component } from '@angular/core';
import { TripsInfoService } from '../trips-info.service';

@Component({
  selector: 'app-filter-section',
  templateUrl: './filter-section.component.html',
  styleUrls: ['./filter-section.component.css']
})
export class FilterSectionComponent {
  filterState : boolean = true;
  heightValue : string = "250%";
  buttonOpacityValue : string = "100%";
  sendSignal : boolean = false;

  country : string = "";
  dateMin : Date = new Date();
  dateMax : Date = new Date();

  dataHandler : TripsInfoService;

  constructor(dataHandler : TripsInfoService) {
    this.dataHandler = dataHandler;
  }

  public handleFilterState() {
    if (this.filterState) {
      this.filterState = false;
      this.heightValue = "0%";
      this.buttonOpacityValue = "0%";
    }
    else {
      this.filterState = true;
      this.heightValue = "250%";
      this.buttonOpacityValue = "100%";
    }
  }

  public sendCountryInfo() {
    this.dataHandler.filter.setCountry(this.country);
    this.dataHandler.updateFiltering();
  }

  public sendStartDateInfo() {
    this.dataHandler.filter.setDateMin(new Date(this.dateMin));
    this.dataHandler.updateFiltering();
  }

  public sendEndDateInfo() {
    this.dataHandler.filter.setDateMax(new Date(this.dateMax));
    this.dataHandler.updateFiltering();
  }

  public sendResetSignal() {
    this.sendSignal = !this.sendSignal;
    this.country = "";
    this.dateMin = new Date(Date.parse("rrrr-mm-dd"));
    this.dateMax = new Date(Date.parse("rrrr-mm-dd"));
    this.dataHandler.filter.reset();
    this.dataHandler.updateFiltering();
  }
}
