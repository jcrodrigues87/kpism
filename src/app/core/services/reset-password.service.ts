import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";

import { ApiService } from "./api.service";

@Injectable()
export class ResetPasswordService {
  email: string;

  constructor(
    private apiService: ApiService
  ) {}

  resetPassword() {
    return this.apiService.put('/auth/forgot_password', { email: this.email }).pipe(
      map(data => data.email)
    );
  }

}