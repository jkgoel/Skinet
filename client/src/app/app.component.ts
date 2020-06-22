import { AccountService } from './account/account.service';
import { BasketService } from './basket/basket.service';
import { Component, OnInit } from '@angular/core';
import { IProduct } from './shared/models/product';
import { IPagination } from './shared/models/pagination';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'SkiNet';
  constructor(
    private basketService: BasketService,
    private accService: AccountService
  ) {}
  ngOnInit(): void {
    this.loadBasket();
    this.loadCurrentUser();
  }

  loadBasket() {
    const basketId = localStorage.getItem('basket_id');
    if (basketId) {
      this.basketService.getBasket(basketId).subscribe(
        () => {
          // console.log('initialize basket');
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  loadCurrentUser() {
    const token = localStorage.getItem('token');
    this.accService.loadCurrentUser(token).subscribe(
      () => {
        // console.log('loaded user');
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
