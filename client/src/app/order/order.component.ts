import { IOrder } from './../shared/models/order';
import { OrderService } from './order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  orders: IOrder[];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrdersForUser();
  }

  loadOrdersForUser() {
    this.orderService.getOrdersForUser().subscribe(
      (resposne) => {
        this.orders = resposne;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
