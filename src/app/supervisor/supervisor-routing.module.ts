import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupervisorGuard } from '../core';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Supervisor'
    },
    canActivate: [ SupervisorGuard ],
    children: [
      {
        path: 'contracts',
        loadChildren: './contracts/contracts.module#ContractsModule'
      },
      {
        path: 'indicators',
        loadChildren: './indicators/indicators.module#IndicatorsModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupervisorRoutingModule { }