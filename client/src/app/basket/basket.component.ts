import { BasketService } from './basket.service';
import { IBasket, IBasketItem, IBasketTotal } from './../shared/models/basket';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent implements OnInit {
  basket$: Observable<IBasket>;
  basketTotal$: Observable<IBasketTotal>;

  constructor(private basketService: BasketService) {}

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
    this.basketTotal$ = this.basketService.basketTotal$;
  }

  removeBasketItem(item: IBasketItem) {
    this.basketService.removeItemFromBasket(item);
  }

  incrementItemQuantity(item: IBasketItem) {
    this.basketService.incrementItemQuantity(item);
  }
  decrementItemQuantity(item: IBasketItem) {
    this.basketService.decrementItemQuantity(item);
  }
}
