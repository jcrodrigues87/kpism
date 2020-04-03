import { Component, OnInit } from "@angular/core";

import { PeriodsService, Period, CurrentPeriodService } from "../../core";
import { Router } from "@angular/router";

@Component({
  templateUrl: './periods.component.html'
})
export class PeriodsComponent implements OnInit {

  periods: Array<Period> = [];
  searchText: String;

  constructor(
    private periodsService: PeriodsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.periodsService.query().subscribe(
      data => {
        this.periods = data;
    });
  }
  
  addNew(): void {
    this.router.navigateByUrl('admin/periods/new');
  }
}