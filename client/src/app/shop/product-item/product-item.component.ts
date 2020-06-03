import { IProduct } from './../../shared/models/product';
import { Component, OnInit, Input } from '@angular/core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
  faShoppingCart = faShoppingCart;
  @Input() product: IProduct;

  constructor() {}

  ngOnInit(): void {}
}
