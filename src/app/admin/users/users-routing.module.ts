import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './users.component';
import { UserEditorComponent } from './user-editor.component';
import { UserResolver } from './user-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    data: {
      title: 'Usuários'
    }
  },
  {
    path: ':userId',
    component: UserEditorComponent,
    resolve: {
      user: UserResolver
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
export class UsersRouting { }