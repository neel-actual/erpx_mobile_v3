import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PartnerPage } from './partner.page';

const routes: Routes = [
	{
		path: '',
		component: PartnerPage,
	},
	{
		path: ':name',
		loadChildren: () => import('./details/details.module').then(m => m.DetailsPageModule),
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class PartnerPageRoutingModule {}
