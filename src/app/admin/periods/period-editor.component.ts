import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";

import { Period, PeriodsService } from "../../core";

@Component({
  templateUrl: './period-editor.component.html'
})
export class PeriodEditorComponent implements OnInit {
  period: Period = {} as Period;
  periodForm: FormGroup;
  errors: Object = {};
  isSubmitting = false;

  public confirmModal: any;

  constructor(
    private periodsService: PeriodsService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.periodForm = this.fb.group({
      name: '',
      begin: '',
      end: ''
    });
  }

  ngOnInit(): void {
    this.route.data.subscribe(
      (data: { period: Period }) => {
        this.period = data.period;
        this.periodForm.patchValue(data.period);
      }
    );
  }

  submitForm() {
    this.isSubmitting = true;
    this.errors = {};

    this.update(this.periodForm.value);

    console.log({ period: this.period });

    this.periodsService.save(this.period).subscribe(
      period => {
        this.period = period;
        this.isSubmitting = false;
        //this.router.navigateByUrl(`admin/periods/${period.id}`)
      },
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }

  back() {
    this.router.navigateByUrl('admin/periods');
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
    Object.assign(this.period, values);
  }

  delete() {
    this.isSubmitting = true;
    this.errors = {};

    this.periodsService.destroy(this.period.id).subscribe(
      data => this.back(),
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }
}