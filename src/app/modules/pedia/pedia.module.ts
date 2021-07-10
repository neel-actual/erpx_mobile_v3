import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PediaPageRoutingModule } from './pedia-routing.module';

import { PediaPage } from './pedia.page';

@NgModule({
	imports: [CommonModule, FormsModule, IonicModule, PediaPageRoutingModule],
	declarations: [PediaPage],
})
export class PediaPageModule {}
