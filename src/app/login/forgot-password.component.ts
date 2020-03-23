import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder, FormGroup } from '@angular/forms';

import { Errors } from '../core';
import { ResetPasswordService } from '../core/services/reset-password.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'forgot-password.component.html'
})
export class ForgotPasswordComponent {
  errors: Errors = {errors: {}};
  isSubmitting: boolean = false;
  emailForm: FormGroup;

  constructor(
    private router: Router,
    private resetPasswordService: ResetPasswordService,
    private fb: FormBuilder,
  ) {
      this.emailForm = this.fb.group({
        email: ''
      });
    }

  submitForm() {
    this.isSubmitting = true;
    this.errors = {errors: {}};    

    this.resetPasswordService.forgotPassword(this.emailForm.value).subscribe(
      data => {
        this.isSubmitting = false;
        this.router.navigateByUrl('resetpassword');
      },
      err => {
        this.errors = err;
        console.log(err)
        this.isSubmitting = false;
      }
    );
  }
}