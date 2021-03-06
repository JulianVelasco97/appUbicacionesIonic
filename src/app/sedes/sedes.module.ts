import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SedesPageRoutingModule } from './sedes-routing.module';

import { SedesPage } from './sedes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SedesPageRoutingModule
  ],
  declarations: [SedesPage]
})
export class SedesPageModule {}
