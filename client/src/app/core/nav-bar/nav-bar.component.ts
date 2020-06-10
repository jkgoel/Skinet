import { AccountService } from './../../account/account.service';
import { IUser } from './../../shared/models/user';
import { IBasket } from './../../shared/models/basket';
import { Observable } from 'rxjs';
import { BasketService } from './../../basket/basket.service';
import { Component, OnInit } from '@angular/core';
import {
  faShoppingCart,
  faHistory,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  faShoppingCart = faShoppingCart;
  faHistory = faHistory;
  faSignOut = faSignOutAlt;
  basket$: Observable<IBasket>;
  currentUser$: Observable<IUser>;

  constructor(
    private basketService: BasketService,
    private accService: AccountService
  ) {}

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
    this.currentUser$ = this.accService.currentUser$;
  }

  logout() {
    this.accService.logout();
  }
}
