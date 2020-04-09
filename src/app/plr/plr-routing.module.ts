import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlrComponent } from './plr.component';

const routes: Routes = [
  {
    path: '',
    component: PlrComponent,
    data: {
      title: 'Participação nos Lucros e Resultados'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlrRoutingModule {}
