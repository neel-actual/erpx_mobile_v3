import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WikipediaPage } from './wikipedia.page';

const routes: Routes = [
  {
    path: '',
    component: WikipediaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WikipediaPageRoutingModule {}
