import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from './../account.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string;

  constructor(
    private accService: AccountService,
    private router: Router,
    private activatedRoutes: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.returnUrl =
      this.activatedRoutes.snapshot.queryParams.returnUrl || '/shop';
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'),
      ]),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    this.accService.login(this.loginForm.value).subscribe(
      () => {
        console.log('user logged in');
        this.router.navigateByUrl(this.returnUrl);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
