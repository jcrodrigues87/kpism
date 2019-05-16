import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DepartmentsComponent } from './departments.component';
import { DepartmentEditorComponent } from './department-editor.component';
import { DepartmentResolver } from './department-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: DepartmentsComponent,
    data: {
      title: 'Departmentos'
    }
  },
  {
    path: ':departmentId',
    component: DepartmentEditorComponent,
    resolve: {
      department: DepartmentResolver
    },
    data: {
      title: 'Departamento'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentsRouting { }