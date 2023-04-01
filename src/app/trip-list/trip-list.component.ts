import { Component} from '@angular/core';
import { ShoppingInfoService } from '../shopping-info.service';
import { TripsInfoService } from '../trips-info.service';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css'],
})
export class TripListComponent {
  // services
  public data : TripsInfoService;
  public info : ShoppingInfoService;

  constructor(shoppingInfo : ShoppingInfoService, tripsData : TripsInfoService) {
    this.info = shoppingInfo;
    this.data = tripsData;
  }

  public updateBookings(id : number, diff : number) {
    this.data.updateBookings(id, diff);
    this.info.updateShopping(this.data.getTrips()[id], diff);
  }

  public removeTrip(id : number) {
    if (this.data.getTrips()[id].bookedPlaces > 0)
      this.info.updateShopping(this.data.getTrips()[id], -this.data.getTrips()[id].bookedPlaces);
    this.data.removeTrip(id);
  }

  public addTrip(trip : Trip) {
    this.data.addTrip(trip);
  }

  public setRating(id : number, rating : number) {
    this.data.setRating(id, rating);
  }

  public getTrips() {
    return this.data.getTrips();
  }
}



export interface Trip {
  title: string;
  image: string;
  country: string;
  start: string;
  end: string;
  price: number;
  currency: string;
  description: string;
  places: number;
  bookedPlaces: number;
  rating: number;
}



export interface TripSelected {
  id : number;
  trip : Trip;
}