import { Component, OnInit } from "@angular/core";

import { PeriodsService, Period, CurrentPeriodService } from "../../core";
import { Router } from "@angular/router";

@Component({
  templateUrl: './periods.component.html'
})
export class PeriodsComponent implements OnInit {

  periods: Array<Period> = [];
  currentPeriod: Period;

  constructor(
    private periodsService: PeriodsService,
    private currentPeriodService: CurrentPeriodService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.periodsService.query().subscribe(
      data => {
        this.periods = data;
    });
    this.currentPeriodService.currentPeriod.subscribe(
      data => this.reloadList(data)
    );
  }

  reloadList(data: Period): void {
    this.currentPeriod = data;
  }
  
  addNew(): void {
    this.router.navigateByUrl('admin/periods/new');
  }
}