import { BasketService } from './../basket/basket.service';
import { IBasketTotal } from './../shared/models/basket';
import { Observable } from 'rxjs';
import { AccountService } from './../account/account.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  basketTotal$: Observable<IBasketTotal>;

  constructor(
    private fb: FormBuilder,
    private accSerice: AccountService,
    private basketService: BasketService
  ) {}

  ngOnInit(): void {
    this.createCheckOutForm();
    this.getAddressFormValues();
    this.basketTotal$ = this.basketService.basketTotal$;
  }

  createCheckOutForm() {
    this.checkoutForm = this.fb.group({
      addressForm: this.fb.group({
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        street: [null, Validators.required],
        city: [null, Validators.required],
        state: [null, Validators.required],
        zipCode: [null, Validators.required],
      }),
      deliveryForm: this.fb.group({
        deliveryMethod: [null, Validators.required],
      }),
      paymentForm: this.fb.group({
        nameOnCard: [null, Validators.required],
      }),
    });
  }

  getAddressFormValues() {
    this.accSerice.getUserAddresss().subscribe(
      (address) => {
        if (address) {
          this.checkoutForm.get('addressForm').patchValue(address);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
