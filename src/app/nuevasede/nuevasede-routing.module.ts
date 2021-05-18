import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuevasedePage } from './nuevasede.page';

const routes: Routes = [
  {
    path: '',
    component: NuevasedePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuevasedePageRoutingModule {}
