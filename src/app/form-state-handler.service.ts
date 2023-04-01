import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormStateHandlerService {
  private state : boolean = false;
  private leftOffset : string = "-120vw";
  private opacityValue : string = "0%";

  constructor() {}

  public changeFormState(newState : boolean) : void {
    this.state = newState;
    if (this.state) {
      this.opacityValue = "100%";
      this.leftOffset = "0";
    }
    else {
      this.leftOffset = "-120vw";
      this.opacityValue = "0%";
    }
  }

  public getOffset() : string {
    return this.leftOffset;
  }

  public getOpacity() : string {
    return this.opacityValue;
  }

}
