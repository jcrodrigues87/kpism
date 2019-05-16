import { Injectable } from "@angular/core";
import { HttpParams } from "@angular/common/http";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { ApiService } from "./api.service";
import { ChartData } from "../models";

@Injectable()
export class ChartDataService {
  constructor(
    private apiService: ApiService
  ) {}
  
  query(indicatorId, periodId): Observable<ChartData> {
    let params: HttpParams = new HttpParams();

    return this.apiService.get('/charts/' + indicatorId + '/' + periodId, params).pipe(
      map(data => data.chartData)
    );
  }
}