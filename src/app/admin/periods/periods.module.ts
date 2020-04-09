import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';

import { SharedModule } from '../../shared';
import { PeriodsRouting } from './periods-routing.module';
import { PeriodsComponent } from './periods.component';
import { PeriodEditorComponent } from './period-editor.component';
import { PeriodResolver } from './period-resolver.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    SharedModule,
    NgSelectModule,
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