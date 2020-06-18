import { BasketService } from './../../basket/basket.service';
import { IBasket } from './../../shared/models/basket';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrls: ['./checkout-review.component.scss'],
})
export class CheckoutReviewComponent implements OnInit {
  basket$: Observable<IBasket>;

  constructor(private basketservice: BasketService) {}

  ngOnInit(): void {
    this.basket$ = this.basketservice.basket$;
  }
}
