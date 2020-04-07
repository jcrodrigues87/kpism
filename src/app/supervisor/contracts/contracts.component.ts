import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";

import { ProfilesService, User, CurrentPeriodService, Period, ContractsService, Contract } from '../../core';

@Component({
  templateUrl: 'contracts.component.html'
})
export class ContractsComponent implements OnInit {
  contract: Contract;
  users: Array<User> = [];
  currentPeriod: Period;
  plrForm: FormGroup;
  selectedUser: User;

  errors: Object = {};
  isSubmitting = false;
  message: string;

  constructor(
    private profilesService: ProfilesService,
    private currentPeriodService: CurrentPeriodService,
    private contractService: ContractsService,
    private fb: FormBuilder

  ) {
    this.plrForm = this.fb.group({
      salary: '',
      proportionalPeriod: '',
      bonus: '',
      dependent: '',
      qualitative: '',
      qualitativeWeight: '',
      quantitativeWeight: '',
    }); 
  }

  ngOnInit(): void {
    this.currentPeriodService.currentPeriod.subscribe(
      data => {
        this.currentPeriod = data;
        this.profilesService.query().subscribe(users => {
          this.users = users.filter(
            e => {
              let toReturn = true;
              if (e.inactive && !this.currentPeriod.closed)
                return false;
              return toReturn;
          });
          this.users.sort((a,b)=>a.name.localeCompare(b.name))
        });
    });
  }

  loadContract() {
    if (this.selectedUser) {
      this.contractService.get(this.selectedUser.id).subscribe(
        data => {
          this.contract = data;
          if (this.contract)
            this.plrForm.patchValue(data);
      });
    }
  }

  submitForm() {
    this.isSubmitting = true;
    this.errors = {};

    this.update(this.plrForm.value);
    this.contractService.save(this.selectedUser.id, this.contract).subscribe(
      indicator => {
        this.contract = this.contract;
        this.isSubmitting = false;
        this.message = "Salvo com sucesso!"
      },
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }

  update(values: Object) {
    Object.assign(this.contract, values);
  }

  closeMessage() {
    this.message = undefined;
  }

}