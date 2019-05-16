import { Component, Input, OnInit } from "@angular/core";

import { 
  Indicator, 
  ResponsablesService, 
  PeriodsService, 
  Period, 
  Responsable, 
  User, 
  ProfilesService 
} from "../../core";

@Component({
  selector: 'responsables-editor',
  templateUrl: './responsables-editor.component.html'
})
export class ResponsablesEditorComponent implements OnInit {
  @Input() indicator: Indicator;
  errors: Object;
  isSubmitting = false;
  periods: Array<Period> = [];
  responsables: Array<Responsable> = [];
  users: Array<User> = [];
  period: Period;
  user: User;

  constructor(
    private responsablesServices: ResponsablesService,
    private periodsService: PeriodsService,
    private profilesService: ProfilesService
  ) {}

  ngOnInit(): void {
    this.periodsService.query().subscribe(periods => {
      this.periods = periods;

      if (this.periods.length > 0) {
        this.period = this.periods[this.periods.length - 1];

        this.loadResponsables();
      }
    });
  }

  loadResponsables() {
    this.responsablesServices.query(this.indicator.id, this.period.id).subscribe(responsables => {
      this.responsables = responsables;

      this.profilesService.query().subscribe(users => {
        this.users = users.filter(u => {
          let toReturn = true;
          this.responsables.forEach(r => {
            if (r.user.id === u.id) 
               toReturn = false;
          });
          return toReturn;
        });
      });
    });
  }

  add() {
    this.isSubmitting = true;
    this.errors = null;

    this.responsablesServices.set(this.indicator.id, this.period.id, this.user.id).subscribe(
      responsable => {
        this.user = null;
        this.loadResponsables();
        this.isSubmitting = false;
      },
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }

  remove(resp) {
    this.isSubmitting = true;
    this.errors = null;
    
    this.responsablesServices.destroy(resp.indicator.id, resp.period.id, resp.user.id).subscribe(
      data => {
        this.loadResponsables();
        this.isSubmitting = false;
      },
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
    console.log(resp);
  }
}