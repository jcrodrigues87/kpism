import { Injectable } from "@angular/core";
import { HttpParams } from "@angular/common/http";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { ApiService } from "./api.service";
import { Period } from "../models";

@Injectable()
export class PeriodsService {
  constructor(
    private apiService: ApiService
  ) {}
  
  query(): Observable<Period[]> {
    let params: HttpParams = new HttpParams();

    return this.apiService.get('/periods', params).pipe(
      map(data => data.periods)
    );
  }

  queryActive(): Observable<Period[]> {
    let params: HttpParams = new HttpParams();

    return this.apiService.get('/periods', params).pipe(
      map(data => data.periods.filter(period => period.inactive ? false : true))
    );
  }

  get(id): Observable<Period> {
    return this.apiService.get('/periods/' + id).pipe(
      map(data => data.period)
    );
  }

  save(period: Period): Observable<Period> {
    // if is updating
    if (period.id) {
      return this.apiService.put('/periods/' + period.id, { period: period }).pipe(
        map(data => data.period)
      );
    } else { // if is creating
      return this.apiService.post('/periods/', { period: period }).pipe(
        map(data => data.period)
      );
    }
  }

  destroy(id): Observable<any> {
    return this.apiService.delete('/periods/' + id);
  }
}