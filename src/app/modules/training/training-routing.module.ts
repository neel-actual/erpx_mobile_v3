import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrainingPage } from './training.page';

const routes: Routes = [
  {
    path: '',
    component: TrainingPage
  },
  {
    path: ':name',
    loadChildren: () => import('./details/details.module').then( m => m.DetailsPageModule)
  },
  {
    path: 'modal-register',
    loadChildren: () => import('./modal-register/modal-register.module').then( m => m.ModalRegisterPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingPageRoutingModule {}
