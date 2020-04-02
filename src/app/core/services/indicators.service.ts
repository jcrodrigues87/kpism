import { Injectable } from "@angular/core";
import { HttpParams } from "@angular/common/http";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { ApiService } from "./api.service";
import { CurrentPeriodService } from "./current-period.service";
import { Indicator, Period } from "../models";

@Injectable()
export class IndicatorsService {

  currentPeriod: Period;
  observableIndicators: Observable<Indicator[]>;
  observableIndicator: Observable<Indicator>;

  constructor(
    private apiService: ApiService,
    private currentPeriodService: CurrentPeriodService
  ) {}
  
  query(): Observable<Indicator[]> {
    let params: HttpParams = new HttpParams();
    this.currentPeriodService.currentPeriod.subscribe(
      data => {
        this.currentPeriod = data;
        this.observableIndicators = this.apiService.get('/indicators/' + this.currentPeriod.id, params).pipe(
          map(data => data.indicators)
        );
      }
    );
    return this.observableIndicators;
  }

  get(id): Observable<Indicator> {
    this.currentPeriodService.currentPeriod.subscribe(
      data => {
        this.currentPeriod = data;
        this.observableIndicator = this.apiService.get('/indicators/' + this.currentPeriod.id + '/' + id).pipe(
          map(data => data.indicator));
        }
    );
    return this.observableIndicator
  }

  save(indicator: Indicator): Observable<Indicator> {
    this.currentPeriodService.currentPeriod.subscribe(
      data => {
        this.currentPeriod = data;
        // if is updating
        if (indicator.id) {
          this.observableIndicator = this.apiService.put('/indicators/' + this.currentPeriod.id + '/' + indicator.id, { indicator: indicator }).pipe(
            map(data => data.indicator)
          );
        } else { // if is creating
          this.observableIndicator = this.apiService.post('/indicators/' + this.currentPeriod.id, { indicator: indicator }).pipe(
            map(data => data.indicator)
          );
        }
      });
    return this.observableIndicator;
  }

  saveMetering(indicator: Indicator): Observable<Indicator> {
    this.currentPeriodService.currentPeriod.subscribe(
      data => {
        this.currentPeriod = data;
        if (indicator.id) {
          this.observableIndicator = this.apiService.put('/indicators/meterings/' + this.currentPeriod.id + '/' + indicator.id, { meterings: indicator.metering }).pipe(
            map(data => data.indicator)
          );
        }
      });
    return this.observableIndicator;
  }

  destroy(id): Observable<any> {
    this.currentPeriodService.currentPeriod.subscribe(
      data => {
        this.currentPeriod = data;
        this.observableIndicator = this.apiService.delete('/indicators/' + this.currentPeriod.id + '/' + id);
      }
    );
    return this.observableIndicator;
  }

}