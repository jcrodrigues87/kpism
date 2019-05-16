import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";

import { Observable } from "rxjs";
import { take, map } from "rxjs/operators";

import { AuthUserService } from "./auth.service";

@Injectable()
export class NoAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authUserService: AuthUserService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authUserService.isAuthenticated.pipe(take(1), map(isAuth => !isAuth));
  }
}