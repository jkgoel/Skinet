import { SharedModule } from './../shared/shared.module';
import { OrderRoutingModule } from './order-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';

@NgModule({
  declarations: [OrderComponent, OrderDetailComponent],
  imports: [CommonModule, OrderRoutingModule, SharedModule],
})
export class OrderModule {}
