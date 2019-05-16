import { Component, OnInit, TemplateRef } from '@angular/core';
import { 
  IndicatorsService, 
  Indicator, 
  Period, 
  PeriodsService,
  User,
  Reference,
  UsersService,
  AuthUserService,
  ProfilesService,
  ReferencesService,
  MeteringsService,
  IndicatorFilter,
  DepartmentsService
} from '../core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  indicators: Array<Indicator> = [];
  periods: Array<Period> = [];
  references: Array<Reference> = [];
  //users: Array<User> = [];
  //departments: Array<User> = [];

  //user: User;
  indicator: Indicator;
  period: Period;
  reference: Reference;

  refValues = {};
  accValues = {};

  meteringsLoaded: boolean = false;
  
  chartModal: BsModalRef | null;

  indicatorsFilter: Array<IndicatorFilter> = [];
  indicatorFilter: IndicatorFilter;

  constructor(
    private indicatorsService: IndicatorsService,
    private meteringsService: MeteringsService,
    private periodsService: PeriodsService,
    private referencesService: ReferencesService,
    private profilesService: ProfilesService,
    private modalService: BsModalService,
    private authService: AuthUserService,
    private departmentsService: DepartmentsService
  ) {}

  ngOnInit(): void {
    this.periodsService.query().subscribe(periods => {
      this.periods = periods;
      
      if (periods.length > 0) {
        this.period = this.periods[this.periods.length -1];

        this.loadReferences();
      }
    });

    this.profilesService.query().subscribe(users => {
      //this.users = users;

      let user = this.authService.getCurrentUserProfile();

      this.loadFilters();

      let toSet: IndicatorFilter = new IndicatorFilter();

      toSet.id = user.id;
      toSet.name = user.name;
      toSet.departmentName = user.department ? user.department.name : undefined;
      toSet.type = 'Usuários';

      this.indicatorFilter = toSet;

      console.log({u: user});
      console.log({i: this.indicatorFilter});

      if (user && this.period) 
        this.indicatorsService.getByResponable(user.id,this.period.id).subscribe(indicators => {
        this.indicators = indicators;

        this.loadMeterings();
      });
    });
  }

  loadFilters(): void {
    let temp: Array<IndicatorFilter> = [];

    this.profilesService.query().subscribe(users => {
      users.forEach(user => {
        const filter: IndicatorFilter = new IndicatorFilter();
  
        filter.id = user.id;
        filter.name = user.name;
        filter.departmentName = user.department ? user.department.name : undefined;
        filter.type = 'Usuários';
  
        temp.push(filter);
      });

      this.departmentsService.query().subscribe(department => {
        department.forEach(department => {
          const filter: IndicatorFilter = new IndicatorFilter();
    
          filter.id = department.id;
          filter.name = department.name;
          filter.type = 'Departamentos'
    
          temp.push(filter);
        });

        this.indicatorsFilter = temp;
      });
    });
  }

  loadIndicators(): void {
    // if (this.user && this.period) 
    //   this.indicatorsService.getByResponable(this.user.id,this.period.id).subscribe(indicators => {
    //     this.indicators = indicators;

    //     this.loadMeterings();
    //   });
    if (this.indicatorFilter) {
      if (this.indicatorFilter.type === 'Usuários') {
        if (this.period)
          this.indicatorsService.getByResponable(this.indicatorFilter.id, this.period.id).subscribe(indicators => {
            this.indicators = indicators;

            this.loadMeterings();
          });
      }

      if (this.indicatorFilter.type === 'Departamentos') {
        if (this.period)
          this.indicatorsService.getByDepartment(this.indicatorFilter.id).subscribe(indicators => {
            this.indicators = indicators;

            this.loadMeterings();
          });
      }
    }
  }

  loadMeterings(): void {
    if (this.indicatorFilter && this.period && this.reference) {
      this.refValues = {};
      this.accValues = {};

      this.indicators.forEach(indicator => {
        this.meteringsService.get(indicator.id, this.period.id, this.reference.refOrder).subscribe(m => {
          this.refValues[indicator.id] = m;
        });
      });

      this.indicators.forEach(indicator => {
        this.meteringsService.getAccumulated(indicator.id, this.period.id, this.reference.refOrder).subscribe(m => {
          this.accValues[indicator.id] = m;
        });
      });
    }
  }

  loadReferences(): void {
    if (this.period) {
      this.referencesService.get(this.period.id).subscribe(references => {
        this.references = references;

        if (references.length > 0)
          this.reference = references[references.length - 1];
      });
    }
  }

  openModal(template: TemplateRef<any>, indicator) {
    this.indicator = indicator;

    const initialState = { indicator: indicator, period: this.period };

    this.chartModal = this.modalService.show(template, { class: 'modal-lg', initialState });
  }
}