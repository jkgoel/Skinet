import { ShopService } from './../shop.service';
import { IProduct } from './../../shared/models/product';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product: IProduct;
  minus = faMinusCircle;
  plus = faPlusCircle;

  constructor(
    private shopService: ShopService,
    private activatedRoute: ActivatedRoute,
    private bcService: BreadcrumbService
  ) {
    bcService.set('@productDetails', '');
  }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct() {
    this.shopService
      .getProduct(this.activatedRoute.snapshot.params.id)
      .subscribe(
        (product) => {
          this.product = product;
          this.bcService.set('@productDetails', product.name);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
