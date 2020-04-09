import { Component, Input, OnInit, OnChanges } from "@angular/core";

import { registerLocaleData } from '@angular/common';
import localeBr from '@angular/common/locales/br';
registerLocaleData(localeBr, 'br');

@Component({
  selector: 'percent-indicator',
  templateUrl: './percent-indicator.component.html'
})
export class PercentInicatorComponent implements OnChanges {
  @Input() percent: number;
  @Input() refName: string;

  type: string = 'success';
  max: Number = 100;

  ngOnChanges(): void {
    this.max = this.percent > 100 ? this.percent : 100;
    if (this.percent >= 120) {
      this.type = 'primary';
    } else if (this.percent >= 100) {
      this.type = 'success';
    } else if (this.percent >= 95) {
      this.type = 'warning';
    } else {
      this.type = 'danger';
    }
  }

}