import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";

import { Indicator, IndicatorsService, DepartmentsService, Department, CurrentPeriodService, Period } from "../../core";

@Component({
  templateUrl: './indicator-editor.component.html'
})
export class IndicatorEditorComponent implements OnInit {
  indicator: Indicator = {} as Indicator;
  indicatorForm: FormGroup;
  departments: Array<Department> = [];
  currentPeriod: Period;

  public confirmModal: any;

  errors: Object = {};
  isSubmitting = false;
  message: string;
  new: boolean = true;
  readOnlyBasket: boolean = false;

  constructor(
    private indicatorsService: IndicatorsService,
    private departmentsService: DepartmentsService,
    private currentPeriodService: CurrentPeriodService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.indicatorForm = this.fb.group({
      name: '',
      description: '',
      equation: '',
      evaluation: '',
      department: '',
      limit: '',
      basket: false,
      measure: '',
      accumulatedType: '',
      orientation: '',
      classification: '',
    });
  }

  ngOnInit(): void {
    this.currentPeriodService.currentPeriod.subscribe(data => {
      this.currentPeriod = data;
      this.route.data.subscribe(
        (data: { indicator: Indicator }) => {
          this.indicator = data.indicator;
          if (this.indicator.id)
            this.new = false;
          this.indicatorForm.patchValue(data.indicator);
          if (this.indicator.basket) {
            this.indicatorForm.controls.accumulatedType.disable();
            this.indicatorForm.controls.orientation.disable();
            this.indicatorForm.controls.measure.disable();
          }
          this.departmentsService.query().subscribe(departments => {
            this.departments = departments;
            this.departments.sort((a,b)=>a.name.localeCompare(b.name))
          });
        }
      );
    });
  }

  submitForm() {
    this.isSubmitting = true;
    this.errors = {};

    this.update(this.indicatorForm.value);
    if (this.indicator.basket) {
      this.indicator.accumulatedType = "avg";
      this.indicator.orientation = "higher";
      this.indicator.measure = "%";
    }

    this.indicatorsService.save(this.indicator).subscribe(
      indicator => {
        this.indicator = indicator;
        this.isSubmitting = false;
        this.new = false;
        this.message = "Salvo com sucesso!";
        this.back();
      },
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }

  back() {
    this.router.navigateByUrl('supervisor/indicators');
  }

  closeMessage() {
    this.message = undefined;
  }

  modified(a, b): any {
    const aProps = Object.getOwnPropertyNames(a);

    let toReturn: any = {}

    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];

        // If values of same property are not equal,
        // objects are not equivalent
        if (a[propName] !== b[propName]) {
            toReturn[propName] = a[propName];
        }
    }

    return toReturn;
  }

  update(values: Object) {
    Object.assign(this.indicator, values);
  }

  basketOption(): void {
    if (this.indicatorForm.value.basket == true) {
      this.indicatorForm.controls.accumulatedType.setValue("avg");
      this.indicatorForm.controls.orientation.setValue("higher");
      this.indicatorForm.controls.measure.setValue("%");
      this.indicatorForm.controls.accumulatedType.disable();
      this.indicatorForm.controls.orientation.disable();
      this.indicatorForm.controls.measure.disable();
    } else {
      this.indicatorForm.controls.accumulatedType.enable();
      this.indicatorForm.controls.orientation.enable();
      this.indicatorForm.controls.measure.enable();
    }
  }

  delete() {
    this.isSubmitting = true;
    this.errors = {};

    this.indicatorsService.destroy(this.indicator.id).subscribe(
      data => this.back(),
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }
}