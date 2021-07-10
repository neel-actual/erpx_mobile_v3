import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PediaPage } from './pedia.page';

const routes: Routes = [
	{
		path: '',
		component: PediaPage,
	},
	{
		path: ':name',
		loadChildren: () => import('./details/details.module').then(m => m.DetailsPageModule),
	},
  {
    path: 'modal-add',
    loadChildren: () => import('./modal-add/modal-add.module').then( m => m.ModalAddPageModule)
  },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class PediaPageRoutingModule {}
