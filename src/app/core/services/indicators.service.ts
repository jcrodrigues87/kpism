import { Injectable } from "@angular/core";
import { HttpParams } from "@angular/common/http";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { ApiService } from "./api.service";
import { Indicator } from "../models";

@Injectable()
export class IndicatorsService {
  constructor(
    private apiService: ApiService
  ) {}
  
  query(): Observable<Indicator[]> {
    let params: HttpParams = new HttpParams();

    return this.apiService.get('/indicators', params).pipe(
      map(data => data.indicators)
    );
  }

  get(id): Observable<Indicator> {
    return this.apiService.get('/indicators/' + id).pipe(
      map(data => data.indicator)
    )
  }

  getByResponable(userId,periodId): Observable<Indicator[]> {
    const params = {}

    params['type'] = 'byResponsable';
    params['periodId'] = periodId;
    params['userId'] = userId;

    return this.apiService.get('/indicators', new HttpParams({ fromObject: params })).pipe(
      map(data => data.indicators)
    )
  }

  getByDepartment(departmentId): Observable<Indicator[]> {
    const params = {}

    params['type'] = 'byDepartment';
    params['departmentId'] = departmentId;

    return this.apiService.get('/indicators', new HttpParams({ fromObject: params })).pipe(
      map(data => data.indicators)
    )
  }

  save(indicator: Indicator): Observable<Indicator> {
    // if is updating
    if (indicator.id) {
      return this.apiService.put('/indicators/' + indicator.id, { indicator: indicator }).pipe(
        map(data => data.indicator)
      );
    } else { // if is creating
      return this.apiService.post('/indicators/', { indicator: indicator }).pipe(
        map(data => data.indicator)
      );
    }
  }

  destroy(id): Observable<any> {
    return this.apiService.delete('/indicators/' + id);
  }
}