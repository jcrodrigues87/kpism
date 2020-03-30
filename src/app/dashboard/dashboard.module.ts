import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared';
import { NgSelectModule } from '@ng-select/ng-select';
import { PercentInicatorComponent } from './percent-indicator.component';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  imports: [
    FormsModule,
    DashboardRoutingModule,
    SharedModule,
    NgSelectModule,
    ProgressbarModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule,
    ButtonsModule.forRoot(),
  ],
  declarations: [ DashboardComponent, PercentInicatorComponent ]
})
export class DashboardModule { }
