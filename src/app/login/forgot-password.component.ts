import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Errors, AuthUser, AuthUserService } from '../core';
import { ResetPasswordService } from '../core/services/reset-password.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'forgot-password.component.html'
})
export class ForgotPasswordComponent implements OnInit {
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
    private fb: FormBuilder,
    private resetPasswordService: ResetPasswordService
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

    
  }
}
