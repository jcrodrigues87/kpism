import { Injectable } from "@angular/core";
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from "@angular/router";

import { Observable, of } from "rxjs";

import { Period, PeriodsService } from "../../core";
import { catchError } from "rxjs/operators";

@Injectable()
export class PeriodResolver implements Resolve<Period> {

  constructor(
    private periodsService: PeriodsService,
    private router: Router
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    if (route.params['periodId'] === 'new') {
      return of(new Period());
    } else {
      return this.periodsService.get(route.params['periodId'])
        .pipe(catchError((err) => this.router.navigateByUrl('admin/periods')));
    }
  }
}