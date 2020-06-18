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
        () => {
          this.toastr.success('Address saved');
        },
        (error) => {
          this.toastr.error(error.message);
          console.log(error);
        }
      );
  }
}
