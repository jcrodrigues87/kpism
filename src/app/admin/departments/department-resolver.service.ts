import { Injectable } from "@angular/core";
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from "@angular/router";

import { Observable, of } from "rxjs";

import { Department, DepartmentsService } from "../../core";
import { catchError } from "rxjs/operators";

@Injectable()
export class DepartmentResolver implements Resolve<Department> {

  constructor(
    private departmentsService: DepartmentsService,
    private router: Router
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    if (route.params['departmentId'] === 'new') {
      return of(new Department());
    } else {
      return this.departmentsService.get(route.params['departmentId'])
        .pipe(catchError((err) => this.router.navigateByUrl('admin/departments')));
    }
  }
}