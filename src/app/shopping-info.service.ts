import { Injectable } from '@angular/core';
import { Trip } from './trip-list/trip-list.component';
import { PriceCoverter } from './trips-info.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingInfoService extends PriceCoverter {
  private tripsToBuy : TripStats[] = new Array<TripStats>();
  shoppingCount : number = 0;
  totalPrice : number = 0;

  private findID(trip : Trip) {
    for (let i = 0; i < this.tripsToBuy.length; i++) {
      if (this.tripsToBuy[i].trip.title == trip.title)
        return i;
    }
    return -1;
  }

  public updateShopping(trip : Trip, diff : number) {
    console.log(trip.title);
    let id = this.findID(trip);
    if (diff > 0 && id == -1) {
      let price : number = Math.ceil(diff * this.convertCurrency(trip.price, trip.currency));
      this.tripsToBuy.push({trip: trip, totalValue: price} as TripStats);
      this.totalPrice += price;
    }
    else if (diff < 0 && id != -1) {
      let price : number = Math.ceil((-diff) * this.convertCurrency(trip.price, trip.currency));
      this.tripsToBuy[id].totalValue -= price;
      this.totalPrice -= price;
      if (this.tripsToBuy[id].totalValue <= 0) {
        if (id == 0)
          this.tripsToBuy.shift();
        else
          this.tripsToBuy.splice(id, 1);
      }
    }
    else {
      let price : number = Math.ceil(diff * this.convertCurrency(trip.price, trip.currency));
      this.tripsToBuy[id].totalValue += price;
      this.totalPrice += price;
    }
    this.shoppingCount += diff;
  }

  public getTrips() {
    return this.tripsToBuy;
  }

}



export interface TripStats {
  trip: Trip;
  totalValue: number;
}