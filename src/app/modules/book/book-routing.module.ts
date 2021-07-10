import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookPage } from './book.page';

const routes: Routes = [
	{
		path: '',
		component: BookPage,
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
export class BookPageRoutingModule {}
