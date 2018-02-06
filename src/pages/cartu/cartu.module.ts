import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CartuPage } from '@pages/cartu/cartu';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    CartuPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(CartuPage),
  ],
  exports: [ CartuPage ]
})
export class CartuPageModule {}
