import { Component, Input } from "@angular/core";
import { Metering } from "../core";

@Component({
  selector: 'percent-indicator',
  templateUrl: './percent-indicator.component.html'
})
export class PercentInicatorComponent {

  otherMetering: Metering;
  type: string = 'success';
  value: Number = 0;
  max: Number = 100;

  @Input() set metering(metering: Metering) {
    if (metering && metering !== undefined) {
      this.otherMetering = metering;
      
      this.max = metering.percent > 100 ? metering.percent : 100;
      this.value = metering.percent;

      if (this.value > 90) {
        this.type = 'success';
      } else if (this.value > 70) {
        this.type = 'warning';
      } else {
        this.type = 'danger';
      }
    }
  }
}