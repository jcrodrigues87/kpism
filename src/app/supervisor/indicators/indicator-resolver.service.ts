import { Injectable } from "@angular/core";
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from "@angular/router";

import { Observable, of } from "rxjs";

import { Indicator, IndicatorsService } from "../../core";
import { catchError } from "rxjs/operators";

@Injectable()
export class IndicatorResolver implements Resolve<Indicator> {

  constructor(
    private indicatorsService: IndicatorsService,
    private router: Router
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    if (route.params['indicatorId'] === 'new') {
      return of(new Indicator());
    } else {
      return this.indicatorsService.get(route.params['indicatorId'])
        .pipe(catchError((err) => this.router.navigateByUrl('admin/indicators')));
    }
  }
}