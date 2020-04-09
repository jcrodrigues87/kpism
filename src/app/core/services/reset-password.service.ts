import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";

import { ApiService } from "./api.service";

@Injectable()
export class ResetPasswordService {
  email: string;

  constructor(
    private apiService: ApiService
  ) {}

  forgotPassword(value) {
    return this.apiService.post('/auth/forgot_password', value)
  }

  resetPassword(value) {
    return this.apiService.post('/auth/reset_password', value).pipe(
      map(data => data.email)
    );
  }

}