import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { Trip, TripSelected } from './trip-list/trip-list.component';

@Injectable({
  providedIn: 'root'
})
export class TripsInfoService {
  private trips : Trip[] = new Array<Trip>();
  filteredTrips : TripSelected[] = new Array<TripSelected>();

  //sub-classes
  private priceCalculator : PriceMeasures = new PriceMeasures();
  public filter : TripFilter = new TripFilter();

  private loadData() {
    fetch("./assets/data/data.json")
      .then(res => res.json())
      .then(json => {
        for (let trip of json.trips) {
          this.trips.push({
            title: trip.title,
            image: trip.image,
            country: trip.country,
            start: trip.start,
            end: trip.end,
            price: trip.price,
            currency: trip.currency,
            description: trip.description,
            places: trip.places,
            bookedPlaces: 0,
            rating: 0
          } as Trip)
        }
      })
      .then(() => {
        this.filter = new TripFilter();
        this.updateFiltering();
      })
      .then(() => {
        this.priceCalculator.updatePrices(this.trips);
      });
  }

  constructor() { 
    this.loadData();
  }

  public getTrips() {
    return this.trips;
  }

  public updateBookings(id : number, diff : number) {
    this.trips[id].places -= diff;
    this.trips[id].bookedPlaces += diff;
    if ((this.trips[id].places == 0 && (id == this.getCheapestID() || id == this.getMostExpensiveID())) || (this.trips[id].places == 1 && diff == -1))
      this.priceCalculator.updateID(this.filteredTrips);
  }

  public addTrip(trip : Trip) {
    this.trips.push(trip);
    this.updateFiltering();
    this.priceCalculator.updatePrices(this.trips);
  }

  public removeTrip(id : number) {
    if (id == 0)
      this.trips.shift();
    else
      this.trips.splice(id, 1);
    this.updateFiltering();
    this.priceCalculator.updatePrices(this.trips);
  }

  public setRating(id : number, rating : number) {
    this.trips[id].rating = rating;
  }

  public updateFiltering() {
    this.filteredTrips.splice(0, this.filteredTrips.length);
    for (let i = 0; i < this.trips.length; i++) {
      if (this.filter.check(this.trips[i]))
        this.filteredTrips.push({id : i, trip:this.trips[i]} as TripSelected);
    }
    this.priceCalculator.updateID(this.filteredTrips);
  }

  public getCheapestID() {
    return this.priceCalculator.cheapID;
  }

  public getMostExpensiveID() {
    return this.priceCalculator.expensiveID;
  }

  public getMinPrice() {
    return this.priceCalculator.minPrice;
  }

  public getMaxPrice() {
    return this.priceCalculator.maxPrice;
  }

}



export class PriceCoverter {
  public convertCurrency(val : number, currency : string) : number {
    switch (currency) {
      case "$":
      case "USD":
        return val*4.4;
      case "€":
      case "euro":
        return val*4.6;
      default:
        return val;
    }
  }
}



class PriceMeasures extends PriceCoverter {
  cheapID : number = -1
  expensiveID : number = -1;
  minPrice : number = 0;
  maxPrice : number = 0;

  public updatePrices(trips : Trip[]) {
    let min : number = this.convertCurrency(trips[0].price, trips[0].currency);
    let max : number = this.convertCurrency(trips[0].price, trips[0].currency);
    for (let i : number = 0; i < trips.length; i++) {
      let value : number = this.convertCurrency(trips[i].price, trips[i].currency);
      if (value > max)
        max = value;
      else if (value < min)
          min = value;
    }
    this.minPrice = min;
    this.maxPrice = max;
  }

  public updateID(trips : TripSelected[]) {
    if (trips.length == 0)
    {
      this.cheapID = -1;
      this.expensiveID = -1;
      return;
    }
    else if (trips.length == 1) {
      this.cheapID = trips[0].id;
      this.expensiveID = -1;
      return;
    }
    let min : number = this.convertCurrency(trips[0].trip.price, trips[0].trip.currency);
    let minID : number = trips[0].id;
    let max : number = this.convertCurrency(trips[0].trip.price, trips[0].trip.currency);
    let maxID : number = trips[0].id;
    for (let i : number = 0; i < trips.length; i++) {
      if (trips[i].trip.places > 0) {
        let value : number = this.convertCurrency(trips[i].trip.price, trips[i].trip.currency);
        if (value > max) {
          max = value;
          maxID = trips[i].id;
        }
        else if (value < min) {
          min = value;
          minID = trips[i].id;
        }
      }
    }
    this.cheapID = minID;
    this.expensiveID = maxID;
  }
}



class DateComparator {
  private year1 : number = 0;
  private year2 : number = 0;
  private month1 : number = 0;
  private month2 : number = 0;
  private day1 : number = 0;
  private day2 : number = 0;

  private setParameters(date : Date, dateStr : string) {
    this.year1 = date.getFullYear();
    this.year2 = Number.parseInt(dateStr.substring(6));
    this.month1 = date.getMonth() + 1;
    this.month2 = Number.parseInt(dateStr.substring(3, 5));
    this.day1 = date.getDate();
    this.day2 = Number.parseInt(dateStr.substring(0, 2));
  }

  public preceeds(date : Date, dateStr : string) {
    this.setParameters(date, dateStr);
    if (this.year1 != this.year2)
      return this.year1 < this.year2;
    else if (this.month1 != this.month2)
      return this.month1 < this.month2;
    if (this.day1 != this.day2)
      return this.day1 < this.day2;
    return true;
  }

  public follows(date : Date, dateStr: string) {
    this.setParameters(date, dateStr);
    if (this.year1 != this.year2)
      return this.year1 > this.year2;
    else if (this.month1 != this.month2)
      return this.month1 > this.month2;
    else if (this.day1 != this.day2)
      return this.day1 > this.day2;
    return true;
  }
}



export class TripFilter extends PriceCoverter {
  private filterStates : boolean[] = [false, false, false, false, false];
  private country : string = "";
  private priceMin : number = -1;
  private priceMax : number = -1;
  private dateMin : Date = new Date("1999-01-01");
  private dateMax : Date = new Date("2099-01-01");
  private avaibleRatings : boolean[] = [false, false, false, false, false];
  private countRatingsAdded : number = 0;
  private dateCmp : DateComparator = new DateComparator();

  public setCountry(country : string) : void {
    this.country = country.toLowerCase();
    if (this.country != "")
      this.filterStates[0] = true;
    else
      this.filterStates[0] = false;
  }

  public setPriceMin(priceMin : number) : void {
    this.priceMin = priceMin;
    this.filterStates[1] = true;
  }

  public setPriceMax(priceMax : number) : void {
    this.priceMax = priceMax;
    this.filterStates[2] = true;
  }

  public setDateMin(dateMin : Date) : void {
    this.dateMin = dateMin;
    this.filterStates[3] = true;
  }

  public setDateMax(dateMax : Date) : void {
    this.dateMax = dateMax;
    this.filterStates[4] = true;
  }

  public changeRatingState(id : number) : void {
    if (this.avaibleRatings[id])
      this.countRatingsAdded -= 1;
    else
      this.countRatingsAdded += 1;
    this.avaibleRatings[id] = !this.avaibleRatings[id];
  }

  public reset() : void {
    for (let i = 0; i < 5; i++) {
      this.filterStates[i] = false;
      this.avaibleRatings[i] = false;
    }
    this.countRatingsAdded = 0;
  }

  public check(trip : Trip) : boolean {
    const countryLowerCase = trip.country.toLowerCase();
    if (this.filterStates[0] && countryLowerCase.search(this.country) == -1)
      return false;
    const convertedPrice = this.convertCurrency(trip.price, trip.currency);
    if (this.filterStates[1] && convertedPrice < this.priceMin)
      return false;
    if (this.filterStates[2] && convertedPrice > this.priceMax)
      return false;
    if (this.filterStates[3] && !this.dateCmp.preceeds(this.dateMin, trip.start))
      return false;
    if (this.filterStates[4] && !this.dateCmp.follows(this.dateMax, trip.end))
      return false;
    if (this.countRatingsAdded > 0 && (trip.rating == 0 || !this.avaibleRatings[trip.rating - 1]))
      return false;
    return true;
  }
}