import { Component, OnInit, TemplateRef, OnChanges } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { 
  Indicator, 
  Period, 
  Reference,
  AuthUserService,
  ProfilesService,
  IndicatorFilter,
  DepartmentsService,
  CurrentPeriodService,
  User,
  ContractsService,
  Contract,
  ContractIndicator,
  Metering
} from '../core';
import { reference } from '@angular/core/src/render3';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit, OnChanges {
  periods: Array<Period> = [];
  indicator: Indicator;
  period: Period;
  
  currentPeriod: Period;
  sectionUser: User;
  selectedUser: User;
  users: Array<User> = [];
  contract: Contract;
  contractIndicators: Array<ContractIndicator> = [];
  indicators: Array<Indicator> = [];
  references: Array<Reference> = [];
  reference: Reference;


  metering: Metering;

  totalWeight: number;
  refResult: number;
  accumulatedResult: number;


  refValues = {};
  accValues = {};
  meteringsLoaded: boolean = false;
  chartModal: BsModalRef | null;
  indicatorsFilter: Array<IndicatorFilter> = [];
  indicatorFilter: IndicatorFilter;

  constructor(
    private contractService: ContractsService,
    private currentPeriodService: CurrentPeriodService,
    private profilesService: ProfilesService,
    private modalService: BsModalService,
    private authService: AuthUserService,
    private departmentsService: DepartmentsService
  ) {
    this.references = [
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
  }

  ngOnInit(): void {
    this.currentPeriodService.currentPeriod.subscribe(
      data => {
        this.currentPeriod = data;
        this.sectionUser = this.authService.getCurrentUserProfile();
        this.selectedUser = this.sectionUser;
        this.reference = this.references[0];
        this.loadContract();
        this.profilesService.query().subscribe(users => {
          this.users = users;
        });
      });
  }

 ngOnChanges(): void {
  this.calcAccumulated()
 }

  loadContract(): void {
    this.contractService.get(this.selectedUser.id).subscribe(contract => {
      this.contract = contract;
      this.contractService.queryIndicators(this.contract.id).subscribe(contractIndicators => {
        this.contractIndicators = contractIndicators;
        this.loadMeterings();
        
      })  
    })
  }

  loadMeterings(): void {
    this.totalWeight = 0;
    this.refResult = 0;
    for (var i = 0; i < this.contractIndicators.length; i++) {
      this.totalWeight += this.contractIndicators[i].weight
      this.refResult += (this.contractIndicators[i].indicator.metering[this.reference.refOrder-1].percent * this.contractIndicators[i].weight * 0.01)
    }
    this.calcAccumulated();
    
    // if (this.indicatorFilter && this.period && this.reference) {
    //   this.refValues = {};
    //   this.accValues = {};

    //   this.indicators.forEach(indicator => {
    //     this.meteringsService.get(indicator.id, this.period.id, this.reference.refOrder).subscribe(m => {
    //       this.refValues[indicator.id] = m;
    //     });
    //   });

    //   this.indicators.forEach(indicator => {
    //     this.meteringsService.getAccumulated(indicator.id, this.period.id, this.reference.refOrder).subscribe(m => {
    //       this.accValues[indicator.id] = m;
    //     });
    //   });
    // }
  }

  calcAccumulated(): void {
    for (var i = 0; i < this.contractIndicators.length; i++) {
      this.contractIndicators[i].indicator.accumulated = {id: "", refOrder: this.reference.refOrder, refName: this.reference.refName, target: 0, actual: 0, difference: 0, percent: 0, createdAt: undefined, updatedAt: undefined}
      if (this.contractIndicators[i].indicator.accumulatedType == "sum") {
        for (var j = 0; j < this.reference.refOrder; j++) {
          this.contractIndicators[i].indicator.accumulated.target += this.contractIndicators[i].indicator.metering[j].target;
          this.contractIndicators[i].indicator.accumulated.actual += this.contractIndicators[i].indicator.metering[j].actual;
        }
      } else if  (this.contractIndicators[i].indicator.accumulatedType == "avg") {
        for (var j = 0; j < this.reference.refOrder; j++) {
          this.contractIndicators[i].indicator.accumulated.target += this.contractIndicators[i].indicator.metering[j].target;
          this.contractIndicators[i].indicator.accumulated.actual += this.contractIndicators[i].indicator.metering[j].actual;
        }
        this.contractIndicators[i].indicator.accumulated.target /= this.contractIndicators[i].indicator.metering[j-1].refOrder;
        this.contractIndicators[i].indicator.accumulated.actual /= this.contractIndicators[i].indicator.metering[j-1].refOrder;
      } else {
        this.contractIndicators[i].indicator.accumulated = this.contractIndicators[i].indicator.metering[this.reference.refOrder-1]
      }
    }
    // this.accumulatedResult = 0;
    // for (var i = 0; i < this.contractIndicators.length; i++) {
    //   this.contractIndicators[i].indicator.accumulated = this.metering;
    //   console.log(this.contractIndicators[i].indicator)
    //   console.log(this.contractIndicators[i].indicator.accumulated)
    //   this.accumulatedResult += (this.contractIndicators[i].indicator.accumulated.percent * this.contractIndicators[i].weight * 0.01)
    // }
  }

  acordeon(): void {
    
  }

  // loadIndicators(): void {
  //   // if (this.user && this.period) 
  //   //   this.indicatorsService.getByResponable(this.user.id,this.period.id).subscribe(indicators => {
  //   //     this.indicators = indicators;

  //   //     this.loadMeterings();
  //   //   });
  //   if (this.indicatorFilter) {
  //     if (this.indicatorFilter.type === 'Usuários') {
  //       if (this.period)
  //         this.indicatorsService.getByResponable(this.indicatorFilter.id, this.period.id).subscribe(indicators => {
  //           this.indicators = indicators;

  //           this.loadMeterings();
  //         });
  //     }

  //     if (this.indicatorFilter.type === 'Departamentos') {
  //       if (this.period)
  //         this.indicatorsService.getByDepartment(this.indicatorFilter.id).subscribe(indicators => {
  //           this.indicators = indicators;

  //           this.loadMeterings();
  //         });
  //     }
  //   }
  // }



  openModal(template: TemplateRef<any>, indicator) {
    this.indicator = indicator;

    const initialState = { indicator: indicator, period: this.period };

    this.chartModal = this.modalService.show(template, { class: 'modal-lg', initialState });
  }
}