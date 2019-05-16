import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { tap } from 'rxjs/operators';

import { ApiService } from "./api.service";
import { JwtService } from "./jwt.service";
import { AuthUser } from "../models";

@Injectable()
export class AuthUserServiceOld {
  private currentAuthuser: AuthUser;
  public isAuthenticated: boolean;

  constructor (
    private apiService: ApiService,
    private jwtService: JwtService
  ) {}

  setAuth(user: AuthUser) {
    if (user) {
      this.jwtService.saveToken(user.token);
      // Set current Authuser data into observable
      this.currentAuthuser= user;
      // Set isAuthenticated to true
      this.isAuthenticated = true;
    } else {
      this.purgeAuth();
    }
  }

  attemptAuth(credentials): Observable<AuthUser> {
    return this.apiService.post('/auth/login', { user: credentials }).pipe(
       tap(data => {
         this.setAuth(data.user);
       })
    );
  }

  getCurrentAuthUser(): AuthUser {
    return this.currentAuthuser;
  }

  async populate() {
    console.log('populate');
    if (this.jwtService.getToken()) {
      this.apiService.get('/auth')
        .subscribe(
          data => this.setAuth(data.user), 
          err => this.purgeAuth()
        );
    } else {
        this.purgeAuth();
    }
  }

  purgeAuth(): void {
    this.jwtService.destroyToken();
    this.currentAuthuser = null;
    this.isAuthenticated = false 
  }
}