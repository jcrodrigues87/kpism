import { Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
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
        private periodsService: PeriodsService,
        private router: Router
    ) {
        this.reloadPeriods();
    }

    reloadPeriods(): void {
        this.periodsService.query().subscribe(data => {
            this.router.navigateByUrl('dashboard');
            this.currentPeriodsListSubject.next(data);
          });
    }
    
    updateCurrentPeriod(period: Period): void {
        this.router.navigateByUrl('dashboard');
        this.currentPeriodSubject.next(period);
    }
    
    updatePeriods(): void {
        this.reloadPeriods();
    }
}