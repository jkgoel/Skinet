import { ShopParams } from './../shared/models/shopParams';
import { IProductType } from './../shared/models/productType';
import { IBrand } from './../shared/models/brands';
import { ShopService } from './shop.service';
import { IProduct } from './../shared/models/product';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  @ViewChild('search') searchTerm: ElementRef;
  products: IProduct[];
  brands: IBrand[];
  productTypes: IProductType[];
  shopParams = new ShopParams();
  totalCount: number;

  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low to High', value: 'priceAsc' },
    { name: 'Price: High to Low', value: 'priceDesc' },
  ];

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getProductTypes();
  }

  getProducts() {
    this.shopService.getProducts(this.shopParams).subscribe(
      (resposne) => {
        this.products = resposne.data;
        this.shopParams.pageNumber = resposne.pageIndex;
        this.shopParams.pageSize = resposne.pageSize;
        this.totalCount = resposne.count;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getBrands() {
    this.shopService.getBrands().subscribe(
      (resposne) => {
        this.brands = [{ id: 0, name: 'All' }, ...resposne];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getProductTypes() {
    this.shopService.getProductTypes().subscribe(
      (resposne) => {
        this.productTypes = [{ id: 0, name: 'All' }, ...resposne];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onBrandSelected(brandId: number) {
    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }
  onTypeSelected(typeId: number) {
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }
  onSortSelected(sort: string) {
    this.shopParams.sort = sort;
    this.getProducts();
  }

  onPageChanged(event: number) {
    if (this.shopParams.pageNumber !== event) {
      this.shopParams.pageNumber = event;
      this.getProducts();
    }
  }

  onSearch() {
    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onReset() {
    this.searchTerm.nativeElement.value = null;
    this.shopParams = new ShopParams();
    this.getProducts();
  }
}
