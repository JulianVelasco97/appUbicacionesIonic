import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevasedePageRoutingModule } from './nuevasede-routing.module';

import { NuevasedePage } from './nuevasede.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NuevasedePageRoutingModule
  ],
  declarations: [NuevasedePage]
})
export class NuevasedePageModule {}
