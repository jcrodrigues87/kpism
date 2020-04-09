import { Component, OnInit, OnChanges } from '@angular/core';

import { registerLocaleData } from '@angular/common';
import localeBr from '@angular/common/locales/br';
registerLocaleData(localeBr, 'br');

import { Period, User, CurrentPeriodService, ProfilesService, AuthUserService, ContractsService, Contract, CalcService, DepartmentsService } from '../core';

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
  showDepartmentUsers: boolean = false;
  role: string;

  constructor(
    private currentPeriodService: CurrentPeriodService,
    private profilesService: ProfilesService,
    private authService: AuthUserService,
    private contractService: ContractsService,
    private calcService: CalcService,
    private departmentService: DepartmentsService
  ) {}

  ngOnInit(): void {
    this.currentPeriodService.currentPeriod.subscribe(
      data => {
        this.currentPeriod = data;
        this.companyMultiplier = this.currentPeriod.companyMultiplier;
        this.sectionUser = this.authService.getCurrentUserProfile();
        this.selectedUser = this.sectionUser;
        if (this.currentPeriod.id) {
          this.loadUsers();
          this.loadContract();
        }
      });
  }

  ngOnChanges(): void{
    this.calcResult();
  }

  loadUsers(): void {
    if (this.sectionUser.department) {
      this.departmentService.get(this.sectionUser.department.id).subscribe(department => {
        this.showDepartmentUsers = false;
        if (department.manager && department.manager.id == this.selectedUser.id) {
          this.showDepartmentUsers = true;
        }
        this.profilesService.query().subscribe(users => {
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
    } else if (this.selectedUser.role == "admin" || this.selectedUser.role == "supervisor") {
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
        this.contractService.queryIndicators(this.contract.id).subscribe(data => {
          this.contract.quantitative = Math.round(this.calcService.calcQuantitative(data)*100)/100;
          this.calcResult();
        })  
      }
    })
  }

  calcResult(): void {
    if (this.contract.bonus == 1) 
      this.role = "Colaborador";
    else if (this.contract.bonus == 1.25)
      this.role = "Assistente";
    else if (this.contract.bonus == 1.5)
      this.role = "Analista";
    else if (this.contract.bonus == 1.75)
      this.role = "Coordenador";
    else if (this.contract.bonus == 2)
      this.role = "Gerente";
    else if (this.contract.bonus == 2.2)
      this.role = "Diretor";
    else
      this.role = "Cargo Inexistente";
    this.contract.resultContract = ((this.contract.qualitative * this.contract.qualitativeWeight) + (this.contract.quantitative * this.contract.quantitativeWeight)) / (this.contract.qualitativeWeight + this.contract.quantitativeWeight)
    this.remunerationSalary = ((this.contract.resultContract * this.contract.bonus * this.companyMultiplier * 0.01) / 12) * this.contract.proportionalPeriod;
    this.plr = this.remunerationSalary * this.contract.salary;
    for (var i = 0; i < this.currentPeriod.tax.length; i++) {
      if (this.plr <= this.currentPeriod.tax[i].ceiling) {
        //
        // COLOCAR AQUI O NUMERO DE DEPENDENTES
        //
        this.contract.tax = (this.plr * this.currentPeriod.tax[i].percent * 0.01) - (this.currentPeriod.tax[i].deduction * this.contract.dependent);
        if (this.contract.tax < 0)
          this.contract.tax = 0
        break;
      }
    }
    this.contract.finalPlr = this.plr - this.contract.tax;
  }

}