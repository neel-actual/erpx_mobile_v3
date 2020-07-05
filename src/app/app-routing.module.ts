import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./modules/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'more',
    loadChildren: () => import('./modules/more/more.module').then( m => m.MorePageModule)
  },
  {
    path: 'book',
    loadChildren: () => import('./modules/book/book.module').then( m => m.BookPageModule)
  },
  {
    path: 'feedback',
    loadChildren: () => import('./modules/feedback/feedback.module').then( m => m.FeedbackPageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
