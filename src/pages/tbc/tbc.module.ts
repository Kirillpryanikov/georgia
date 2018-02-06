import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TbcPage } from '@pages/tbc/tbc';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    TbcPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(TbcPage),
  ],
  exports: [ TbcPage ]
})
export class TbcPageModule {}
