import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";

import { Period, PeriodsService, CurrentPeriodService, Tax, Reference } from "../../core";

@Component({
  templateUrl: './period-editor.component.html'
})
export class PeriodEditorComponent implements OnInit {
  period: Period = {} as Period;
  periodForm: FormGroup;
  taxForm: FormGroup;
  errors: Object = {};
  isSubmitting = false;
  isNew: Boolean = true;
  taxes: Array<Tax> = [];
  ceiling: number;
  percent: number;
  deduction: number;
  references: Array<Reference>;
  reference: Reference;

  public confirmModal: any;

  constructor(
    private periodsService: PeriodsService,
    private currentPeriodService: CurrentPeriodService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.references = [
      {refName: 'Nenhum', refOrder: 0},
      {refName: 'Janeiro', refOrder: 1},
      {refName: 'Fevereiro', refOrder: 2},
      {refName: 'Março', refOrder: 3},
      {refName: 'Abril', refOrder: 4},
      {refName: 'Maio', refOrder: 5},
      {refName: 'Junho', refOrder: 6},
      {refName: 'Julho', refOrder: 7},
      {refName: 'Agosto', refOrder: 8},
      {refName: 'Setembro', refOrder: 9},
      {refName: 'Outubro', refOrder: 10},
      {refName: 'Novembro', refOrder: 11},
      {refName: 'Dezembro', refOrder: 12},
    ]
    this.periodForm = this.fb.group({
      year: '',
      companyMultiplier: 0,
      closedMonth: '',
      closed: false
    });
  }

  ngOnInit(): void {
    this.route.data.subscribe(
      (data: { period: Period }) => {
        this.isNew = data.period.year == undefined ? true : false;
        this.period = data.period;
        this.periodForm.patchValue(data.period);
        if (!this.isNew) {
          this.taxes = this.period.tax;
          this.reference = this.references[0];
        }
      }
    );
  }

  submitForm() {
    this.isSubmitting = true;
    this.errors = {};
    this.update(this.periodForm.value);
    this.period.tax = this.taxes;

    this.periodsService.save(this.period).subscribe(
      period => {
        this.period = period;
        this.isSubmitting = false;
        this.currentPeriodService.reloadPeriods();
        this.back();
      },
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }

  addTax() {
    if (this.ceiling != undefined && this.percent != undefined && this.deduction != undefined) {
      this.taxes.push({ ceiling: this.ceiling, percent: this.percent, deduction: this.deduction }); 
      this.ceiling = undefined;
      this.percent = undefined;
      this.deduction = undefined;
    }
  }

  removeTax() {
    this.taxes = [];
    this.ceiling = undefined;
    this.percent = undefined;
    this.deduction = undefined;
  }

  back() {
    this.router.navigateByUrl('admin/periods');
  }

  update(values: Object) {
    Object.assign(this.period, values);
  }

  delete() {
    this.isSubmitting = true;
    this.errors = {};

    this.periodsService.destroy(this.period.id).subscribe(
      data => {
        this.currentPeriodService.reloadPeriods();
        this.back();
      },
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }
}