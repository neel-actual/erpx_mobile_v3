import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalCommentPage } from './modal-comment.page';

const routes: Routes = [
  {
    path: '',
    component: ModalCommentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalCommentPageRoutingModule {}
