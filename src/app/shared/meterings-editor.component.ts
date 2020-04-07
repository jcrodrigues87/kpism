import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";

import { registerLocaleData } from '@angular/common';
import localeBr from '@angular/common/locales/br';
registerLocaleData(localeBr, 'br');

import { Indicator, IndicatorsService, Metering, CalcService, Period } from "../core";

@Component({
  selector: 'meterings-editor',
  templateUrl: './meterings-editor.component.html'
})
export class MeteringsEditorComponent{
  @Input() indicator: Indicator;
  @Output() indicatorChange = new EventEmitter<Indicator>();
  @Input() showDelta: boolean;
  @Input() targetEdit: boolean;
  @Input() actualEditNumber: number = 0; // 0 means all can be edited, 1 means january cant be edited, ...
  @Input() currentPeriod: Period;

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

  targetReadonly(): boolean {
    if (this.targetEdit && !this.currentPeriod.closed) {
      return false
    }
    return true
  }

  actualReadonly(index): boolean {
    if (index + 1 > this.actualEditNumber && !this.currentPeriod.closed)
      return false
    return true 
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