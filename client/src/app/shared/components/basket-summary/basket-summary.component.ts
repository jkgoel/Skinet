import { IOrderItem } from './../../models/order';
import { IBasketItem } from './../../models/basket';
import { BasketService } from './../../../basket/basket.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {
  faMinusCircle,
  faPlusCircle,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.scss'],
})
export class BasketSummaryComponent implements OnInit {
  minus = faMinusCircle;
  plus = faPlusCircle;
  trash = faTrash;

  @Input() items: IBasketItem[] | IOrderItem[] = [];
  @Input() isBasket = true;
  @Input() isOrder = false;

  @Output() decrement: EventEmitter<IBasketItem> = new EventEmitter<
    IBasketItem
  >();
  @Output() increment: EventEmitter<IBasketItem> = new EventEmitter<
    IBasketItem
  >();
  @Output() remove: EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();

  constructor(private basketService: BasketService) {}

  ngOnInit(): void {}

  decrementItemQuantity(item: IBasketItem) {
    this.decrement.emit(item);
  }
  incrementItemQuantity(item: IBasketItem) {
    this.increment.emit(item);
  }
  removeBasketItem(item: IBasketItem) {
    this.remove.emit(item);
  }
}
