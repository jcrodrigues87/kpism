import { Injectable } from "@angular/core";
import { HttpParams } from "@angular/common/http";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { ApiService } from "./api.service";
import { CurrentPeriodService } from "./current-period.service";
import { Contract, Period } from "../models";

@Injectable()
export class ContractsService {

  currentPeriod: Period;
  observableContract: Observable<Contract>;

  constructor(
    private apiService: ApiService,
    private currentPeriodService: CurrentPeriodService
  ) {}

  get(userId): Observable<Contract> {
    this.currentPeriodService.currentPeriod.subscribe(
      data => {
        this.currentPeriod = data;
        this.observableContract = this.apiService.get('/contracts/' + userId + '/' + this.currentPeriod.id).pipe(
          map(data => data.contract));
        }
    );
    return this.observableContract
  }

  save(userId, contract: Contract): Observable<Contract> {
    this.currentPeriodService.currentPeriod.subscribe(
      data => {
        this.currentPeriod = data;
        this.observableContract = this.apiService.put('/contracts/' + userId + '/' + this.currentPeriod.id, {contract: contract}).pipe(
          map(data => data.contract));
        }
    );
    return this.observableContract
  }

  // queryIndicators(contractId): Observable<Array<ContractIndicator>> {

  // }

  // save(indicator: Indicator): Observable<Indicator> {
  //   this.currentPeriodService.currentPeriod.subscribe(
  //     data => {
  //       this.currentPeriod = data;
    
  //       // if is updating
  //       if (indicator.id) {
  //         this.observableIndicator = this.apiService.put('/indicators/' + this.currentPeriod.id + '/' + indicator.id, { indicator: indicator }).pipe(
  //           map(data => data.indicator)
  //         );
  //       } else { // if is creating
  //         this.observableIndicator = this.apiService.post('/indicators/' + this.currentPeriod.id, { indicator: indicator }).pipe(
  //           map(data => data.indicator)
  //         );
  //       }

  //     });
  //   return this.observableIndicator;
  // }

  // destroy(id): Observable<any> {
  //   this.currentPeriodService.currentPeriod.subscribe(
  //     data => {
  //       this.currentPeriod = data;
  //       this.observableIndicator = this.apiService.delete('/indicators/' + this.currentPeriod.id + '/' + id);
  //     }
  //   );
  //   return this.observableIndicator;
  // }

}