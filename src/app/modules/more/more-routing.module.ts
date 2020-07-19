import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MorePage } from './more.page';

const routes: Routes = [
  {
    path: '',
    component: MorePage
  },
  {
    path: 'news',
    loadChildren: () => import('../news/news.module').then( m => m.NewsPageModule)
  },
  {
    path: 'partner',
    loadChildren: () => import('../partner/partner.module').then( m => m.PartnerPageModule)
  },
  {
    path: 'book',
    loadChildren: () => import('../book/book.module').then( m => m.BookPageModule)
  },
  {
    path: 'feedback',
    loadChildren: () => import('../feedback/feedback.module').then( m => m.FeedbackPageModule)
  },
  {
    path: 'help',
    loadChildren: () => import('../help/help.module').then( m => m.HelpPageModule)
  },
  {
    path: 'achievements',
    loadChildren: () => import('../achievements/achievements.module').then( m => m.AchievementsPageModule)
  },
  {
    path: 'wikipedia',
    loadChildren: () => import('../wikipedia/wikipedia.module').then( m => m.WikipediaPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MorePageRoutingModule {}
