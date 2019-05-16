import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { SupervisorRoutingModule } from './supervisor-routing.module';
import { SupervisorGuard } from '../core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SupervisorRoutingModule
  ],
  providers: [
    SupervisorGuard
  ]
})
export class SupervisorModule { }