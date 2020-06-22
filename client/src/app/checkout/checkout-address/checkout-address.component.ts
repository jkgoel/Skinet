import { IAddress } from './../../shared/models/address';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from './../../account/account.service';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.scss'],
})
export class CheckoutAddressComponent implements OnInit {
  @Input() checkOutForm: FormGroup;

  constructor(
    private accService: AccountService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  saveUserAddress() {
    this.accService
      .updateUserAddress(this.checkOutForm.get('addressForm').value)
      .subscribe(
        (address: IAddress) => {
          this.toastr.success('Address saved');
          this.checkOutForm.get('addressForm').reset(address);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
