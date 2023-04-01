import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { FormStateHandlerService } from '../form-state-handler.service';
import { Trip } from '../trip-list/trip-list.component';


@Component({
  selector: 'app-trip-form',
  templateUrl: './trip-form.component.html',
  styleUrls: ['./trip-form.component.css']
  
})
export class TripFormComponent {
  public states : Map<string, boolean> = new Map();
  private formBuilder : FormBuilder;
  public modelForm : FormGroup;
  public formHandler : FormStateHandlerService;
  @Output() formSubmit = new EventEmitter<Trip>();

  constructor(formBuilder : FormBuilder, formHandler : FormStateHandlerService) {
    this.formHandler = formHandler;
    this.formBuilder = formBuilder;
    this.modelForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      country: ['', Validators.required],
      image: '',
      start: ['', Validators.required],
      end: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      currency: 'zł',
      places: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      description: 'Pusty opis'
    });
    this.states.set("title", true);
    this.states.set("country", true);
    this.states.set("start", true);
    this.states.set("end", true);
    this.states.set("price", true);
    this.states.set("places", true);
  }

  private resetInputStates() {
    for (let [field, state] of this.states) {
      this.states.set(field, true);
    }
  }

  public hideForm() : void {
    this.formHandler.changeFormState(false);
    this.modelForm.reset();
    this.resetInputStates();
  }

  public validityUpdate(field : string) {
    let state = this.states.get(field);
    let control = this.modelForm.get(field);
    if (state && control && !control.valid)
      this.states.set(field, false);
    else if (!state && control?.valid)
      this.states.set(field, true);
  }

  public onSubmit() : void {
    if (!this.modelForm.valid) {
      for (let [field, state] of this.states) {
        this.validityUpdate(field);
      }
      return;
    }
    let trip = {
      title: this.modelForm.get('title')!.value,
      image: this.modelForm.get('image')!.value,
      country: this.modelForm.get('country')!.value,
      start: this.modelForm.get('start')!.value,
      end: this.modelForm.get('end')!.value,
      price: this.modelForm.get('price')!.value,
      currency: this.modelForm.get('currency')!.value,
      description: this.modelForm.get('description')!.value,
      places: this.modelForm.get('places')!.value,
      bookedPlaces: 0
    } as Trip;
    if (trip.image == '')
      trip.image = "assets/img/notfound.png";
    this.formSubmit.emit(trip);
    this.hideForm();
  }
}