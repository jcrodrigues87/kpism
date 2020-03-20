import { Injectable, OnInit } from '@angular/core';
import { Period } from '../models';
import { BehaviorSubject } from 'rxjs';
import { PeriodsService } from './periods.service';

@Injectable()
export class CurrentPeriodService {
    private currentPeriodSubject = new BehaviorSubject<Period>({} as Period);
    currentPeriod = this.currentPeriodSubject.asObservable();

    private currentPeriodsListSubject = new BehaviorSubject<Array<Period>>([] as Array<Period>);
    periods = this.currentPeriodsListSubject.asObservable();

    constructor (
        private periodsService: PeriodsService
    ) {
        this.reloadPeriods();
    }

    reloadPeriods(): void {
        this.periodsService.query().subscribe(data => {
            this.currentPeriodsListSubject.next(data);
          });
    }
    
    updateCurrentPeriod(period: Period): void {
        this.currentPeriodSubject.next(period);
    }
    
    updatePeriods(): void {
        this.reloadPeriods();
    }
}