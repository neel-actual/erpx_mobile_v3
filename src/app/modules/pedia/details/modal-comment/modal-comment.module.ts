import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalCommentPageRoutingModule } from './modal-comment-routing.module';

import { ModalCommentPage } from './modal-comment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalCommentPageRoutingModule
  ],
  declarations: [ModalCommentPage]
})
export class ModalCommentPageModule {}
