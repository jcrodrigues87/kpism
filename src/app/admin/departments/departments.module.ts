import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { ModalModule } from 'ngx-bootstrap/modal';
import { NgSelectModule } from '@ng-select/ng-select'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '../../shared';
import { DepartmentsRouting } from './departments-routing.module';
import { DepartmentsComponent } from './departments.component';
import { DepartmentEditorComponent } from './department-editor.component';
import { DepartmentResolver } from './department-resolver.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    SharedModule,
    NgbModule,
    DepartmentsRouting,
    ModalModule.forRoot()
  ],
  declarations: [
    DepartmentsComponent,
    DepartmentEditorComponent
  ],
  providers: [
    DepartmentResolver
  ]
})
export class DepartmentsModule { }