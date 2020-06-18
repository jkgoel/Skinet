import { IOrder } from './../shared/models/order';
import { environment } from './../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getOrdersForUser() {
    return this.http.get<IOrder[]>(this.baseUrl + 'orders');
  }

  getOrderById(orderId: number) {
    return this.http.get<IOrder>(this.baseUrl + 'orders/' + orderId);
  }
}
