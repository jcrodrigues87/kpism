import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { ChartsModule } from 'ng2-charts/ng2-charts';

import { ListErrorsComponent } from "./list-errors.component";
import { MessageAlertComponent } from "./message-alert.component";
import { MeteringsEditorComponent } from "./meterings-editor.component";
import { DynamicTableComponent } from './tables';
import { IndicatorChartComponent } from './charts';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  declarations: [
    ListErrorsComponent,
    MessageAlertComponent,
    DynamicTableComponent,
    IndicatorChartComponent,
    MeteringsEditorComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    ListErrorsComponent,
    MessageAlertComponent,
    DynamicTableComponent,
    IndicatorChartComponent,
    MeteringsEditorComponent
  ]
})
export class SharedModule {

}