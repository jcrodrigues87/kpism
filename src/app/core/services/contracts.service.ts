import { Injectable } from "@angular/core";
import { HttpParams } from "@angular/common/http";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { ApiService } from "./api.service";
import { CurrentPeriodService } from "./current-period.service";
import { Contract, Period } from "../models";
import { ContractIndicator } from '../models/contract-indicators.model';

@Injectable()
export class ContractsService {

  currentPeriod: Period;
  observableContract: Observable<Contract>;
  observableContractIndicators: Observable<ContractIndicator[]>;
  observableContractIndicator: Observable<ContractIndicator>;

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

  queryIndicators(contractId): Observable<ContractIndicator[]> {
    let params: HttpParams = new HttpParams();
    this.currentPeriodService.currentPeriod.subscribe(
      data => {
        this.currentPeriod = data;
        this.observableContractIndicators = this.apiService.get('/contract_indicators/' + contractId, params).pipe(
          map(data => data.contract_indicators)
        );
      }
    );
    return this.observableContractIndicators;
  }

  saveIndicator(contractId, indicatorId, weight): Observable<ContractIndicator> {
    this.observableContractIndicator = this.apiService.post('/contract_indicators/' + contractId + '/' + indicatorId + '/' + weight).pipe(
      map(data => data.contract_indicator)
    );
    return this.observableContractIndicator;
  }

  updateIndicator(contractId, indicatorId, weight): Observable<ContractIndicator> {
    this.observableContractIndicator = this.apiService.put('/contract_indicators/' + contractId + '/' + indicatorId + '/' + weight).pipe(
      map(data => data.contract_indicator)
    );
    return this.observableContractIndicator;
  }

  deleteIndicator(contractId, indicatorId): Observable<ContractIndicator> {
    this.observableContractIndicator = this.apiService.delete('/contract_indicators/' + contractId + '/' + indicatorId)
    return this.observableContractIndicator;
  }

}