import { Injectable } from "@angular/core";
import { HttpParams } from "@angular/common/http";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { ApiService } from "./api.service";
import { Metering } from "../models";

@Injectable()
export class MeteringsService {
  constructor(
    private apiService: ApiService
  ) {}
  
  query(indicatorId, periodId): Observable<Metering[]> {
    let params: HttpParams = new HttpParams();

    return this.apiService.get('/indicators/' + indicatorId + '/meterings/' + periodId, params).pipe(
      map(data => data.meterings)
    );
  }

  getAccumulated(indicatorId, periodId, refOrder): Observable<Metering> {
    return this.apiService.get('/indicators/' + indicatorId + '/meterings/' + periodId + '/' + refOrder + '/accumulated').pipe(
      map(data => data.metering)
    );
  }

  get(indicatorId, periodId, refOrder): Observable<Metering> {
    return this.apiService.get('/indicators/' + indicatorId + '/meterings/' + periodId + '/' + refOrder).pipe(
      map(data => data.metering)
    );
  }
  
  saveAll(indicatorId, meterings): Observable<Metering[]> {
    return this.apiService.put('/indicators/' + indicatorId + '/meterings', { meterings: meterings }).pipe(
      map(data => data.meterings)
    );
  }

  saveAllActual(meterings): Observable<Metering[]> {
    return this.apiService.put('/meterings/', { meterings: meterings }).pipe(
      map(data => data.metering)
    );
  }
}