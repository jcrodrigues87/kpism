import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminGuard } from '../core';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Admin'
    },
    canActivate: [ AdminGuard ],
    children: [
      {
        path: 'users',
        loadChildren: './users/users.module#UsersModule'
      },
      {
        path: 'departments',
        loadChildren: './departments/departments.module#DepartmentsModule'
      },
      {
        path: 'periods',
        loadChildren: './periods/periods.module#PeriodsModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }