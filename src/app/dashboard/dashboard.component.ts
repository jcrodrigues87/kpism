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
  Metering,
  CalcService
} from '../core';

@Component({
  templateUrl: 'dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnChanges {
  periods: Array<Period> = [];
  indicator: Indicator;
  period: Period;

  teste;
  
  currentPeriod: Period;
  sectionUser: User;
  selectedUser: User;
  users: Array<User> = [];
  contract: Contract;
  contractIndicators: Array<ContractIndicator> = [];
  indicators: Array<Indicator> = [];
  references: Array<Reference> = [];
  reference: Reference;

  acordeonSelected: ContractIndicator;


  metering: Metering;

  accumulated: Array<Metering> = [];
  accumulatedResult: number;
  totalWeight: number;
  refResult: number;


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
    private departmentsService: DepartmentsService,
    private calcService: CalcService
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
  console.log('aaa')
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
  }

  calcAccumulatedIndex(index): void {
    this.accumulated[index] = ({id: "", refOrder: this.reference.refOrder, refName: this.reference.refName, target: 0, actual: 0, difference: 0, percent: 0, createdAt: undefined, updatedAt: undefined})
    if (this.contractIndicators[index].indicator.accumulatedType == "sum") {
      for (var j = 0; j < this.reference.refOrder; j++) {
        this.accumulated[index].target += this.contractIndicators[index].indicator.metering[j].target;
        this.accumulated[index].actual += this.contractIndicators[index].indicator.metering[j].actual;
      }
    } else if  (this.contractIndicators[index].indicator.accumulatedType == "avg") {
      for (var j = 0; j < this.reference.refOrder; j++) {
        this.accumulated[index].target += this.contractIndicators[index].indicator.metering[j].target;
        this.accumulated[index].actual += this.contractIndicators[index].indicator.metering[j].actual;
      }
      this.accumulated[index].target /= this.contractIndicators[index].indicator.metering[j-1].refOrder;
      this.accumulated[index].actual /= this.contractIndicators[index].indicator.metering[j-1].refOrder;
    } else {
      this.accumulated[index] = this.contractIndicators[index].indicator.metering[this.reference.refOrder-1]
    }
    this.accumulated[index] = this.calcService.calcPercentDifference(this.accumulated[index], this.contractIndicators[index].indicator.orientation, this.contractIndicators[index].indicator.limit)
    console.log(this.accumulated)
    this.calcTotalAccumulated();
  }

  calcAccumulated(): void {
    this.accumulated = [];
    for (var i = 0; i < this.contractIndicators.length; i++) {
      this.accumulated.push({id: "", refOrder: this.reference.refOrder, refName: this.reference.refName, target: 0, actual: 0, difference: 0, percent: 0, createdAt: undefined, updatedAt: undefined})
      this.calcAccumulatedIndex(i);
    }
  }

  calcTotalAccumulated(): void {
    this.accumulatedResult = 0;
    for (var j = 0; j < this.accumulated.length; j++) {
      this.accumulatedResult += (this.accumulated[j].percent * this.contractIndicators[j].weight * 0.01)
    }
    console.log(this.accumulatedResult)
  }

  doSomething(obj) {
    console.log(obj)
    this.calcAccumulatedIndex(obj);
  }

  acordeon(contractIndicator): void {
    if (this.acordeonSelected == contractIndicator) {
      this.acordeonSelected = undefined;
    } else {
      this.acordeonSelected = contractIndicator;
    }
  }

  openModal(template: TemplateRef<any>, indicator) {
    this.indicator = indicator;

    const initialState = { indicator: indicator, period: this.period };

    this.chartModal = this.modalService.show(template, { class: 'modal-lg', initialState });
  }

}