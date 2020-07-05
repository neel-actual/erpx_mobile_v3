import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonalPageRoutingModule } from './personal-routing.module';

import { PersonalPage } from './personal.page';
import {NgxMaskIonicModule} from "ngx-mask-ionic";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonalPageRoutingModule,
    NgxMaskIonicModule
  ],
  declarations: [PersonalPage]
})
export class PersonalPageModule {}
