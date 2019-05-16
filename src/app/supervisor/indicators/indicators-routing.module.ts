import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndicatorsComponent } from './indicators.component';
import { IndicatorEditorComponent } from './indicator-editor.component';
import { IndicatorResolver } from './indicator-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: IndicatorsComponent,
    data: {
      title: 'Indicadores'
    }
  },
  {
    path: ':indicatorId',
    component: IndicatorEditorComponent,
    resolve: {
      indicator: IndicatorResolver
    },
    data: {
      title: 'Usuário'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndicatorsRouting { }