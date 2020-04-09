import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgSelectModule } from '@ng-select/ng-select';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { SharedModule } from '../../shared';
import { IndicatorsRouting } from './indicators-routing.module';
import { IndicatorsComponent } from './indicators.component';
import { IndicatorEditorComponent } from './indicator-editor.component';
import { IndicatorResolver } from './indicator-resolver.service';
import { BasketItemsEditorComponent } from './basket-items-editor.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    NgSelectModule,
    TabsModule,
    SharedModule,
    IndicatorsRouting,
    ModalModule.forRoot()
  ],
  declarations: [
    IndicatorsComponent,
    IndicatorEditorComponent,
    BasketItemsEditorComponent
  ],
  providers: [
    IndicatorResolver
  ]
})
export class IndicatorsModule { }