import { Component, EventEmitter, Output } from '@angular/core';
import { FormStateHandlerService } from '../form-state-handler.service';
import { ShoppingInfoService } from '../shopping-info.service';

@Component({
  selector: 'app-head-bar',
  templateUrl: './head-bar.component.html',
  styleUrls: ['./head-bar.component.css']
})
export class HeadBarComponent {
  private formHandler : FormStateHandlerService;
  public info : ShoppingInfoService;
  public hamburgerMenuState : boolean = false;
  public addTripButtonState : boolean = false;
  @Output() routerStateChanged = new EventEmitter<string>();

  constructor(shooppingInfo : ShoppingInfoService, formHandler : FormStateHandlerService) {
    this.info = shooppingInfo;
    this.formHandler = formHandler;
  }
  public slideOutForm() {
    this.formHandler.changeFormState(true);
  }
  public changeHamMenuState() {
    this.hamburgerMenuState = !this.hamburgerMenuState;
  }
  public setAddTripButtonState(state : boolean) {
    this.addTripButtonState = state;
  }
}
