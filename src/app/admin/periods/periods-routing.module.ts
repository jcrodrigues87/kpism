import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PeriodsComponent } from './periods.component';
import { PeriodEditorComponent } from './period-editor.component';
import { PeriodResolver } from './period-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: PeriodsComponent,
    data: {
      title: 'Períodos'
    }
  },
  {
    path: ':periodId',
    component: PeriodEditorComponent,
    resolve: {
      period: PeriodResolver
    },
    data: {
      title: 'Períodos'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeriodsRouting { }