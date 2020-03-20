import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";

import { Indicator, IndicatorsService, DepartmentsService, Department } from "../../core";

@Component({
  templateUrl: './indicator-editor.component.html'
})
export class IndicatorEditorComponent implements OnInit {
  indicator: Indicator = {} as Indicator;
  indicatorForm: FormGroup;
  errors: Object = {};
  isSubmitting = false;

  departments: Array<Department> = [];

  public confirmModal: any;

  constructor(
    private indicatorsService: IndicatorsService,
    private departmentsService: DepartmentsService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.indicatorForm = this.fb.group({
      name: '',
      description: '',
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
    this.route.data.subscribe(
      (data: { indicator: Indicator }) => {
        this.indicator = data.indicator;
        this.indicatorForm.patchValue(data.indicator);

        this.departmentsService.query().subscribe(departments => {
          this.departments = departments;
        });
      }
    );
  }

  submitForm() {
    this.isSubmitting = true;
    this.errors = {};

    this.update(this.indicatorForm.value);

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

  back() {
    this.router.navigateByUrl('supervisor/indicators');
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