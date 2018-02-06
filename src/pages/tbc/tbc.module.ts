import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TbcPage } from '@pages/tbc/tbc';

@NgModule({
  declarations: [
    TbcPage,
  ],
  imports: [
    IonicPageModule.forChild(TbcPage),
  ],
  exports: [ TbcPage ]
})
export class TbcPageModule {}
