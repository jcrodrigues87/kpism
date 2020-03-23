import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder, FormGroup } from '@angular/forms';

import { Errors } from '../core';
import { ResetPasswordService } from '../core/services/reset-password.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'reset-password.component.html'
})
export class ResetPasswordComponent {
  errors: Errors = {errors: {}};
  isSubmitting: boolean = false;
  emailForm: FormGroup;
  

  constructor(
    private router: Router,
    private resetPasswordService: ResetPasswordService,
    private fb: FormBuilder,
  ) {
      this.emailForm = this.fb.group({
        token: '',
        email: '',
        password: '',
        repassword: ''
      });
    }

  submitForm() {
    this.isSubmitting = true;
    this.errors = {errors: {}};
    
    if (this.emailForm.value.password != this.emailForm.value.repassword) {
      this.errors = {errors: {Erro: ": Senhas precisam ser iguais!"}};
      this.isSubmitting = false;
    } else {
      this.resetPasswordService.resetPassword(this.emailForm.value).subscribe(
        data => {
          this.isSubmitting = false;
          this.router.navigateByUrl('login');
        },
        err => {
          this.errors = err;
          this.isSubmitting = false;
        }
      );
    }
  }

}