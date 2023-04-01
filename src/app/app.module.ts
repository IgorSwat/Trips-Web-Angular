import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TripListComponent } from './trip-list/trip-list.component';
import { HeadBarComponent } from './head-bar/head-bar.component';
import { TripFormComponent } from './trip-form/trip-form.component';
import { TripRatingComponent } from './trip-rating/trip-rating.component';
import { FilterSectionComponent } from './filter-section/filter-section.component';
import { PriceBarComponent } from './price-bar/price-bar.component';
import { RatingSelectComponent } from './rating-select/rating-select.component';
import { CartComponent } from './cart/cart.component';
import { TripsViewComponent } from './trips-view/trips-view.component';
import { StartViewComponent } from './start-view/start-view.component';
import { TripsHistoryComponent } from './trips-history/trips-history.component';

@NgModule({
  declarations: [
    AppComponent,
    TripListComponent,
    HeadBarComponent,
    TripFormComponent,
    TripRatingComponent,
    FilterSectionComponent,
    PriceBarComponent,
    RatingSelectComponent,
    CartComponent,
    TripsViewComponent,
    StartViewComponent,
    TripsHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
