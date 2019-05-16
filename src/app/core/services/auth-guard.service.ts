import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from "@angular/router";

import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";

import { AuthUserService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivateChild, CanActivate {
  constructor(
    private router: Router,
    private authUserService: AuthUserService
  ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>
  {
    return this.authUserService.isAuthenticated.pipe(
      take(1),
      map(value => {
        if (!value) {
          this.router.navigate(['/login'], {
            queryParams: {
              return: state.url
            }
          });
        }

        return value;
      })
    );
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>
  {
    return this.canActivate(route, state);
  }
}