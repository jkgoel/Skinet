import { BasketService } from './basket.service';
import { IBasket, IBasketItem } from './../shared/models/basket';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import {
  faMinusCircle,
  faPlusCircle,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent implements OnInit {
  basket$: Observable<IBasket>;
  minus = faMinusCircle;
  plus = faPlusCircle;
  trash = faTrash;

  constructor(private basketService: BasketService) {}

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
  }

  removeBasketItem(item: IBasketItem) {
    this.basketService.removeItemFromBasket(item);
  }

  incremenItemQuantity(item: IBasketItem) {
    this.basketService.incrementItemQuantity(item);
  }
  decremenItemQuantity(item: IBasketItem) {
    this.basketService.decrementItemQuantity(item);
  }
}
