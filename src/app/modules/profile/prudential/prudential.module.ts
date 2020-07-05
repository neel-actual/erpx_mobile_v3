import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrudentialPageRoutingModule } from './prudential-routing.module';

import { PrudentialPage } from './prudential.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrudentialPageRoutingModule
  ],
  declarations: [PrudentialPage]
})
export class PrudentialPageModule {}
