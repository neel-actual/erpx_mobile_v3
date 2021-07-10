import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilePage } from './profile.page';

const routes: Routes = [
	{
		path: '',
		component: ProfilePage,
	},
	{
		path: 'personal',
		loadChildren: () => import('./personal/personal.module').then(m => m.PersonalPageModule),
	},
	{
		path: 'prudential',
		loadChildren: () =>
			import('./prudential/prudential.module').then(m => m.PrudentialPageModule),
	},
	{
		path: 'partner',
		loadChildren: () => import('./partner/partner.module').then(m => m.PartnerPageModule),
	},
	{
		path: 'event',
		loadChildren: () => import('./event/event.module').then(m => m.EventPageModule),
	},
	{
		path: 'password',
		loadChildren: () => import('./password/password.module').then(m => m.PasswordPageModule),
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
