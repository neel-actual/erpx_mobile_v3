import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrudentialPage } from './prudential.page';

const routes: Routes = [
  {
    path: '',
    component: PrudentialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrudentialPageRoutingModule {}
