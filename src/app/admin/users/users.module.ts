import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { ModalModule } from 'ngx-bootstrap/modal';
import { NgSelectModule } from '@ng-select/ng-select';

import { SharedModule } from '../../shared';
import { UsersRouting } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UserEditorComponent } from './user-editor.component';
import { UserResolver } from './user-resolver.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    SharedModule,
    UsersRouting,
    ModalModule.forRoot()
  ],
  declarations: [
    UsersComponent,
    UserEditorComponent
  ],
  providers: [
    UserResolver
  ]
})
export class UsersModule { }