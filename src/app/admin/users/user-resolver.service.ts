import { Injectable } from "@angular/core";
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from "@angular/router";

import { Observable, of } from "rxjs";

import { User, UsersService } from "../../core";
import { catchError } from "rxjs/operators";

@Injectable()
export class UserResolver implements Resolve<User> {

  constructor(
    private usersService: UsersService,
    private router: Router
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    if (route.params['userId'] === 'new') {
      return of(new User());
    } else {
      return this.usersService.get(route.params['userId'])
        .pipe(catchError((err) => this.router.navigateByUrl('admin/users')));
    }
  }
}