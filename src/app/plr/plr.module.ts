import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { PlrComponent } from './plr.component';
import { PlrRoutingModule } from './plr-routing.module';
import { SharedModule } from '../shared';
import { NgSelectModule } from '@ng-select/ng-select';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  imports: [
    FormsModule,
    PlrRoutingModule,
    SharedModule,
    TabsModule,
    NgSelectModule,
    ProgressbarModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule,
    ButtonsModule.forRoot()
  ],
  declarations: [ PlrComponent ]
})
export class PlrModule { }
