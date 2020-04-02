import { Component, OnInit, OnChanges } from '@angular/core';

import { Period, User, CurrentPeriodService, ProfilesService, AuthUserService, ContractsService, Contract, CalcService } from '../core';

@Component({
  templateUrl: 'plr.component.html'
})
export class PlrComponent implements OnInit, OnChanges {
  
  currentPeriod: Period;
  sectionUser: User;
  selectedUser: User;
  users: Array<User> = [];
  contract: Contract;
  plr = 0;
  remunerationSalary = 0;
  companyMultiplier = 0

  constructor(
    private currentPeriodService: CurrentPeriodService,
    private profilesService: ProfilesService,
    private authService: AuthUserService,
    private contractService: ContractsService,
    private calcService: CalcService
  ) {}

  ngOnInit(): void {
    this.currentPeriodService.currentPeriod.subscribe(
      data => {
        this.currentPeriod = data;
        this.companyMultiplier = this.currentPeriod.companyMultiplier;
        this.sectionUser = this.authService.getCurrentUserProfile();
        this.selectedUser = this.sectionUser;
        this.profilesService.query().subscribe(users => {
          this.users = users.filter(
            e => {
              let toReturn = true;
              if (e.inactive && !this.currentPeriod.closed)
                return false;
              return toReturn;
          });
        });
        this.loadContract();
      });
  }

  ngOnChanges(): void{
    this.calcResult();
  }

  loadContract(): void {
    this.contractService.get(this.selectedUser.id).subscribe(contract => {
      this.contract = contract;
      this.contractService.queryIndicators(this.contract.id).subscribe(data => {
        this.contract.quantitative = Math.round(this.calcService.calcQuantitative(data)*100)/100;
        this.calcResult();
      })  
    })
  }

  calcResult(): void {
    this.contract.resultContract = ((this.contract.qualitative * this.contract.qualitativeWeight) + (this.contract.quantitative * this.contract.quantitativeWeight)) / (this.contract.qualitativeWeight + this.contract.quantitativeWeight)
    this.remunerationSalary = ((this.contract.resultContract * this.contract.bonus * this.companyMultiplier * 0.01) / 12) * this.contract.proportionalPeriod;
    this.plr = this.remunerationSalary * this.contract.salary;
  }

}