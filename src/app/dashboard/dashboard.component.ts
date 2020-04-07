import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { registerLocaleData } from '@angular/common';
import localeBr from '@angular/common/locales/br';
registerLocaleData(localeBr, 'br');

import { 
  Indicator, 
  Period, 
  Reference,
  AuthUserService,
  ProfilesService,
  CurrentPeriodService,
  User,
  ContractsService,
  Contract,
  ContractIndicator,
  Metering,
  CalcService,
  BasketItemsService,
  Basket,
  BasketItem,
  DepartmentsService
} from '../core';

@Component({
  templateUrl: 'dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  indicator: Indicator;
  currentPeriod: Period;
  sectionUser: User;
  selectedUser: User;
  users: Array<User> = [];
  contract: Contract;
  contractIndicators: Array<ContractIndicator> = [];
  references: Array<Reference> = [];
  reference: Reference;
  acordeonSelected: ContractIndicator;
  chartModal: BsModalRef | null;
  showDepartmentUsers: boolean = false;

  accumulated: Array<Metering> = [];
  accumulatedResult: number;
  totalWeight: number;
  refResult: number;

  basket: Basket = {} as Basket;
  acordeonBasketSelected: BasketItem;
  basketAccumulated: Array<Metering> = [];
  
  constructor(
    private contractService: ContractsService,
    private currentPeriodService: CurrentPeriodService,
    private profilesService: ProfilesService,
    private modalService: BsModalService,
    private authService: AuthUserService,
    private basketItemsService: BasketItemsService,
    private calcService: CalcService,
    private departmentService: DepartmentsService
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
    var date = new Date();
    this.currentPeriodService.currentPeriod.subscribe(
      data => {
        this.currentPeriod = data;
        this.sectionUser = this.authService.getCurrentUserProfile();
        this.selectedUser = this.sectionUser;
        if (+this.currentPeriod.year == date.getFullYear()) {
          this.reference = this.references[date.getMonth()]
        } else if (this.currentPeriod.closed || +this.currentPeriod.year < date.getFullYear()) {
          this.reference = this.references[11];
        } else {
          this.reference = this.references[0];
        }
        if (this.currentPeriod.id) {
          this.loadUsers();
          this.loadContract();
        }
      });
  }

  openModal(template: TemplateRef<any>, indicator) {
    this.indicator = indicator;
    const initialState = { indicator: indicator };
    this.chartModal = this.modalService.show(template, { class: 'modal-lg', initialState });
  }

  loadUsers(): void {
    if (this.sectionUser.department) {
      this.departmentService.get(this.sectionUser.department.id).subscribe(department => {
        this.showDepartmentUsers = false;
        if (department.manager && department.manager.id == this.selectedUser.id) {
          this.showDepartmentUsers = true;
        }
        this.profilesService.query().subscribe(users => {
          console.log(users)
          this.users = users.filter(
            e => {
              let toReturn = true;
              if (e.inactive && !this.currentPeriod.closed)
                return false;
              if (this.sectionUser.role == 'user') {
                if (!e.department || e.department.id != department.id)
                  return false;
              }    
                return toReturn;
          });
          this.users.sort((a,b)=>a.name.localeCompare(b.name))
        }); 
      })
    } else if (this.selectedUser.role == "admin") {
      this.profilesService.query().subscribe(users => {
        this.users = users;
      });
      this.users.sort((a,b)=>a.name.localeCompare(b.name))
    }
  }

  loadContract(): void {
    this.contractService.get(this.selectedUser.id).subscribe(contract => {
      this.contract = contract;
      if (contract) {
        this.contractService.queryIndicators(this.contract.id).subscribe(contractIndicators => {
          this.contractIndicators = contractIndicators;
          this.loadMeterings();
        })  
      }
    })
  }

  loadMeterings(): void {
    this.totalWeight = 0;
    this.refResult = 0;
    for (var i = 0; i < this.contractIndicators.length; i++) {
      this.totalWeight += this.contractIndicators[i].weight
    }
    this.calcTotalReference();
    this.calcAccumulated();
    this.acordeonSelected = undefined;
    this.acordeonBasketSelected = undefined;
  }

  acordeon(contractIndicator): void {
    if (this.acordeonSelected == contractIndicator) {
      this.acordeonSelected = undefined;
    } else {
      this.acordeonSelected = contractIndicator;
      if (this.acordeonSelected.indicator.basket) {
        this.basketItemsService.get(this.acordeonSelected.indicator.id).subscribe(data => {
          this.basket = data;
          this.calcBasketAccumulated();
        });
      }
    }
  }

  meteringChanged() {
    this.calcTotalReference();
    this.calcAccumulated();
    this.calcTotalAccumulated();
    this.acordeonSelected = undefined;
  }

  calcTotalReference(): void { // calc total percent of indicators
    this.refResult = 0
    for (var i = 0; i < this.contractIndicators.length; i++) {
      this.refResult += (this.contractIndicators[i].indicator.metering[this.reference.refOrder-1].percent * this.contractIndicators[i].weight * 0.01)
    } 
  }

  //
  // Accumulated
  //

  calcAccumulated(): void {
    this.accumulated = this.calcService.calcAccumulated(this.contractIndicators, this.reference);
    this.calcTotalAccumulated();
  }

  calcTotalAccumulated(): void { // calc total percent of accumulated
    this.accumulatedResult = 0;
    for (var j = 0; j < this.accumulated.length; j++) {
      this.accumulatedResult += (this.accumulated[j].percent * this.contractIndicators[j].weight * 0.01)
    }
  }

  //
  // Basket Functions
  //

  acordeonBasket(basketItem): void {
    if (this.acordeonBasketSelected == basketItem) {
      this.acordeonBasketSelected = undefined;
    } else {
      this.acordeonBasketSelected = basketItem;
    }
  }

  meteringChangedBasket() {
    this.loadContract();
    this.calcBasketAccumulated();
    this.calcAccumulated();
    this.calcTotalReference();
    this.calcTotalAccumulated();
    this.acordeonBasketSelected = undefined;
  }

  calcBasketAccumulated(): void {
    this.basketAccumulated = this.calcService.calcAccumulated(this.basket.basketItems, this.reference);
  }

}