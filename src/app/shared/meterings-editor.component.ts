import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";

import { Indicator, IndicatorsService, Metering, CalcService } from "../core";

@Component({
  selector: 'meterings-editor',
  templateUrl: './meterings-editor.component.html'
})
export class MeteringsEditorComponent{
  @Input() indicator: Indicator;
  @Output() indicatorChange = new EventEmitter<Indicator>();
  @Input() showDelta: boolean;
  @Input() targetEdit: boolean;

  errors: Object;
  isSubmitting = false;
  meterings: Array<Metering> = [];
  message: string;
  warning: string;
  
  constructor(
    private indicatorsService: IndicatorsService,
    private calcService: CalcService,
    private router: Router
  ) {}

  save() {
    this.isSubmitting = true;
    this.errors = null;
    for (var i = 0; i < this.indicator.metering.length; i++) {
      if (this.indicator.metering[i].actual == undefined || this.indicator.metering[i].target == undefined) {
        this.message = undefined;
        this.warning = "Preencha todos os campos!"
        return;
      }
    }
    this.indicatorsService.saveMetering(this.indicator).subscribe(
      indicator => {
        this.indicator = indicator;
        this.isSubmitting = false;
        this.warning = undefined;
        this.message = "Salvo com sucesso!";
        this.indicatorChange.emit(this.indicator)
      },
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }

  calc(meter) {
    meter = this.calcService.calcPercentDifference(meter, this.indicator.orientation, this.indicator.limit);
    this.message = undefined;
    this.warning = "Modificações ainda não foram salvas!"
  }

  closeMessage() {
    this.message = undefined;
    this.warning = undefined;
  }

}