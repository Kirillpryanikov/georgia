import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TbcPage } from '@pages/tbc/tbc';
import {HeaderPageModule} from "@pages/header/header.module";
import {SidebarPageModule} from "@pages/sidebar/sidebar.module";


@NgModule({
  declarations: [
    TbcPage,
  ],
  imports: [
    HeaderPageModule,
    SidebarPageModule,
    IonicPageModule.forChild(TbcPage),
  ],
  exports: [ TbcPage ]
})
export class TbcPageModule {}
