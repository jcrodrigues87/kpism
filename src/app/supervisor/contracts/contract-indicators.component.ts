import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";

import { User, Period } from '../../core';

@Component({
  selector: 'contract-indicator',
  templateUrl: 'contract-indicators.component.html'
})
export class ContractIndicatorComponent implements OnInit {
  @Input() user: User;
  @Input() currentPeriod: Period;

  errors: Object = {};
  isSubmitting = false;
  message: string;

  constructor(
  ) {
  }

  ngOnInit(): void {
   
  }

  closeMessage() {
    this.message = undefined;
  }

}