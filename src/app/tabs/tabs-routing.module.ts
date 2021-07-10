import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
	{
		path: 'app',
		component: TabsPage,
		children: [
			{
				path: 'home',
				loadChildren: () => import('../modules/home/home.module').then(m => m.HomePageModule),
			},
			{
				path: 'profile',
				loadChildren: () =>
					import('../modules/profile/profile.module').then(m => m.ProfilePageModule),
			},
			{
				path: 'event',
				loadChildren: () =>
					import('../modules/event/event.module').then(m => m.EventPageModule),
			},
			{
				path: 'training',
				loadChildren: () =>
					import('../modules/training/training.module').then(m => m.TrainingPageModule),
			},
			{
				path: 'more',
				loadChildren: () => import('../modules/more/more.module').then(m => m.MorePageModule),
			},
			{
				path: '',
				redirectTo: '/app/home',
				pathMatch: 'full',
			},
		],
	},
	{
		path: '',
		redirectTo: '/app/home',
		pathMatch: 'full',
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class TabsPageRoutingModule {}
