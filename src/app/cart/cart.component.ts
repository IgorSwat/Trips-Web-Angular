import { Component } from '@angular/core';
import { ShoppingInfoService } from '../shopping-info.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  data : ShoppingInfoService;

  constructor(shoppingInfo : ShoppingInfoService) {
    this.data = shoppingInfo;
  }
}
