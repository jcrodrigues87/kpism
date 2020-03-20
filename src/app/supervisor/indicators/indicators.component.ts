import { Component, OnInit } from "@angular/core";

import { IndicatorsService, Indicator, CurrentPeriodService, Period } from "../../core";
import { Router } from "@angular/router";

@Component({
  templateUrl: './indicators.component.html'
})
export class IndicatorsComponent implements OnInit {

  indicators: Array<Indicator> = [];
  currentPeriod: Period;

  constructor(
    private indicatorsService: IndicatorsService,
    private currentPeriodService: CurrentPeriodService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentPeriodService.currentPeriod.subscribe(
      data => {
        this.reloadList(data);
        if (this.currentPeriod.id) {
          this.indicatorsService.query().subscribe(
            data_two => {
              this.indicators = data_two;
          });
        }
    });
  }

  reloadList(data: Period): void {
    this.currentPeriod = data;
  }
  
  addNew(): void {
    this.router.navigateByUrl('supervisor/indicators/new');
  }
}