import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Errors, AuthUser, AuthUserService } from '../core';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  errors: Errors = {errors: {}};
  isSubmitting: boolean = false;
  authForm: FormGroup;
  user: AuthUser;
  return: string;

  public confirmModal: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authservice: AuthUserService,
    private fb: FormBuilder
  ) {
    // utiliza o FormBuilder para criar o FormGroup
    this.authForm = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => this.return = params['return'] || '/');
  }

  submitForm() {
    this.isSubmitting = true;
    this.errors = {errors: {}};

    const credentials = this.authForm.value;
    
    this.authservice.attemptAuth(credentials)
      .subscribe(
        data => this.router.navigateByUrl(this.return),
        err => {
          this.errors = err;
          this.isSubmitting = false;
        }
      )
  }

  forgotPassword() {
    this.router.navigateByUrl('forgotpassword');
  }

}
