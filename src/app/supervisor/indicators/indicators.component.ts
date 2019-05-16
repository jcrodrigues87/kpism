import { Component, OnInit } from "@angular/core";

import { IndicatorsService, Indicator } from "../../core";
import { Router } from "@angular/router";

@Component({
  templateUrl: './indicators.component.html'
})
export class IndicatorsComponent implements OnInit {

  indicators: Array<Indicator> = [];

  constructor(
    private indicatorsService: IndicatorsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.indicatorsService.query().subscribe(
      data => {
        this.indicators = data;
      }
    );
  }
  
  addNew(): void {
    this.router.navigateByUrl('supervisor/indicators/new');
  }
}