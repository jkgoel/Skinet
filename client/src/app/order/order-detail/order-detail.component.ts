import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { OrderService } from './../order.service';
import { IOrder } from './../../shared/models/order';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
})
export class OrderDetailComponent implements OnInit {
  order: IOrder;

  constructor(
    private orderServe: OrderService,
    private bcService: BreadcrumbService,
    private activeRoute: ActivatedRoute
  ) {
    bcService.set('@orderdetail', '');
  }

  ngOnInit(): void {
    this.loadOrderbyId();
  }

  loadOrderbyId() {
    this.orderServe.getOrderById(this.activeRoute.snapshot.params.id).subscribe(
      (response) => {
        this.order = response;
        this.bcService.set(
          '@orderdetail',
          `Order# ${this.order.id} - ${this.order.status}`
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
