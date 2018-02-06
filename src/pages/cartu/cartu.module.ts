import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CartuPage } from '@pages/cartu/cartu';

@NgModule({
  declarations: [
    CartuPage,
  ],
  imports: [
    IonicPageModule.forChild(CartuPage),
  ],
  exports: [ CartuPage ]
})
export class CartuPageModule {}
