import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";

import { User, Period, ContractsService, Contract, Indicator, IndicatorsService, ContractIndicator } from '../../core';

@Component({
  selector: 'contract-indicator',
  templateUrl: 'contract-indicators.component.html'
})
export class ContractIndicatorComponent implements OnChanges {
  @Input() contract: Contract;
  @Input() user: User;
  @Input() currentPeriod: Period;

  indicatorForm: FormGroup;
  indicators: Array<Indicator> = [];
  contractIndicators: Array<ContractIndicator>;
  selectedItem: ContractIndicator;
  selectedWeight: number = 0;

  totalWeight: number = 0;
  errors: Object = {};
  isSubmitting = false; 
  message: string;
  warning: string;

  constructor(
    private indicatorsService: IndicatorsService,
    private contractService: ContractsService,
    private fb: FormBuilder
  ) {
    this.indicatorForm = this.fb.group({
      indicator: '',
      weight: ''
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.contract) {
      this.reload();
    }
  }

  reload() {
    this.contractService.queryIndicators(this.contract.id).subscribe(
      data => {
        this.contractIndicators = data;
        this.totalWeight = 0;
        for (var i = 0; i < this.contractIndicators.length; i++) {
          this.totalWeight += this.contractIndicators[i].weight;
        }
        this.indicatorsService.query().subscribe(indicators => {
          this.indicators = indicators.filter(
            e => {              
              let toReturn = true;
              this.contractIndicators.forEach(i => {
                if (i.indicator.id === e.id) { // verify if indicator is already in the contract 
                  toReturn = false;
                }
              });
              return toReturn;
            });
            this.indicators.sort((a,b)=>a.name.localeCompare(b.name))
        });
    });
  }

  add(): void {
    this.isSubmitting = true;
    this.errors = null;
    if (this.indicatorForm.value.weight + this.totalWeight > 100) {
      this.warning = "Peso não pode ultrapassar 100!"
      return;
    }
    this.contractService.saveIndicator(this.contract.id, this.indicatorForm.value.indicator.id, this.indicatorForm.value.weight).subscribe(
      data => {
        this.indicatorForm.reset();
        this.reload();
        this.selectedItem = undefined;
        this.warning = undefined;
        this.isSubmitting = false;
      },
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }

  select(contractIndicator): void {
    if (!this.selectedItem || contractIndicator.id !== this.selectedItem.id) {
      this.selectedItem = contractIndicator;
      this.selectedWeight = contractIndicator.weight;
    }
  }

  closeMessage() {
    this.message = undefined;
    this.warning = undefined;
  }

  updateWeight(): void {
    if (this.selectedWeight + (this.totalWeight - this.selectedItem.weight) > 100) {
      this.warning = "Peso não pode ultrapassar 100!"
      return;
    }
    this.contractService.updateIndicator(this.selectedItem.contract, this.selectedItem.indicator.id, this.selectedWeight).subscribe(
      data => {
        this.reload();
        this.selectedItem = undefined;
        this.warning = undefined;
        this.isSubmitting = false;
      },
      err => {
        this.errors = err;
        this.selectedItem = undefined;
        this.isSubmitting = false;
      }
    );
  } 

  remove(indicatorId): void {
    this.contractService.deleteIndicator(this.contract.id, indicatorId).subscribe(
      data => {
        this.reload();
        this.selectedItem = undefined;
        this.warning = undefined;
        this.isSubmitting = false;
      },
      err => {
        this.errors = err;
        this.selectedItem = undefined;
        this.isSubmitting = false;
      }
    );
  }

}