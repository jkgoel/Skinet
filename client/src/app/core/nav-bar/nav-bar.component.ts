import { IBasket } from './../../shared/models/basket';
import { Observable } from 'rxjs';
import { BasketService } from './../../basket/basket.service';
import { Component, OnInit } from '@angular/core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  faShoppingCart = faShoppingCart;
  basket$: Observable<IBasket>;

  constructor(private basketService: BasketService) {}

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
  }
}
