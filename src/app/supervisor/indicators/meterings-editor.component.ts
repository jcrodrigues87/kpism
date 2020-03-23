import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { Indicator, IndicatorsService, Metering, } from "../../core";

@Component({
  selector: 'meterings-editor',
  templateUrl: './meterings-editor.component.html'
})
export class MeteringsEditorComponent implements OnInit {
  @Input() indicator: Indicator;
  @Input() showDelta: Boolean;

  errors: Object;
  isSubmitting = false;
  meterings: Array<Metering> = [];
  
  constructor(
    private indicatorsService: IndicatorsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.meterings = this.indicator.metering
  }

  save() {
    this.isSubmitting = true;
    this.errors = null;

    this.indicator.metering = this.meterings
    this.indicatorsService.save(this.indicator).subscribe(
      indicator => {
        this.indicator = indicator;
        this.isSubmitting = false;
        this.back();
      },
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }

  calc(meter) {
    if (meter.actual !== "" && meter.target !== "") {
      if (this.indicator.orientation === 'higher') {
        meter.difference = meter.actual - meter.target;
        meter.percent = (meter.actual / meter.target) * 100;
      } else {
        meter.difference = meter.target - meter.actual;
        meter.percent = (meter.target / meter.actual) * 100;
      }
    } else {
      meter.difference = 0;  
      meter.percent = 0;
    }
    if (meter.percent > this.indicator.limit)
      meter.percent = this.indicator.limit;
  }

  back() {
    this.router.navigateByUrl('supervisor/indicators');
  }

}