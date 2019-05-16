import { Component, Input, OnInit, OnChanges } from "@angular/core";

import { 
  Indicator, 
  MeteringsService, 
  PeriodsService, 
  Period, 
  Metering, 
  User, 
  ProfilesService 
} from "../../core";

@Component({
  selector: 'meterings-editor',
  templateUrl: './meterings-editor.component.html'
})
export class MeteringsEditorComponent implements OnInit, OnChanges {
  @Input() indicator: Indicator;
  @Input() showDelta: Boolean;

  errors: Object;
  isSubmitting = false;
  periods: Array<Period> = [];
  meterings: Array<Metering> = [];
  users: Array<User> = [];
  period: Period;
  user: User;

  constructor(
    private meteringsServices: MeteringsService,
    private periodsService: PeriodsService,
    private profilesService: ProfilesService
  ) {}

  ngOnInit(): void {
    this.periodsService.query().subscribe(periods => {
      this.periods = periods;

      if (this.periods.length > 0) {
        this.period = this.periods[this.periods.length - 1];

        this.loadMeterings();
      }
    });
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    if (this.period)
      this.loadMeterings();
  }

  loadMeterings() {
    this.meteringsServices.query(this.indicator.id, this.period.id).subscribe(meterings => {
      this.meterings = meterings;
    });
  }

  save() {
    this.isSubmitting = true;
    this.errors = null;

    this.meteringsServices.saveAll(this.indicator.id, this.meterings).subscribe(
      metering => {
        console.log({metering});
        this.isSubmitting = false;
      },
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }

  // remove(resp) {
  //   this.isSubmitting = true;
  //   this.errors = null;
    
  //   this.meteringsServices.destroy(resp.indicator.id, resp.period.id, resp.user.id).subscribe(
  //     data => {
  //       this.loadMeterings();
  //       this.isSubmitting = false;
  //     },
  //     err => {
  //       this.errors = err;
  //       this.isSubmitting = false;
  //     }
  //   );
  //   console.log(resp);
  // }
}