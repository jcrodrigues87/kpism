import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { ModalModule } from 'ngx-bootstrap/modal';
import { DateValueAccessorModule } from 'angular-date-value-accessor';

import { SharedModule } from '../../shared';
import { PeriodsRouting } from './periods-routing.module';
import { PeriodsComponent } from './periods.component';
import { PeriodEditorComponent } from './period-editor.component';
import { PeriodResolver } from './period-resolver.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    PeriodsRouting,
    ModalModule.forRoot()
  ],
  declarations: [
    PeriodsComponent,
    PeriodEditorComponent
  ],
  providers: [
    PeriodResolver
  ]
})
export class PeriodsModule { }