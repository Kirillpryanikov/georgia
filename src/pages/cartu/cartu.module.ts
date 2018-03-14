import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CartuPage } from '@pages/cartu/cartu';
import {HeaderPageModule} from "@pages/header/header.module";
import {SidebarPageModule} from "@pages/sidebar/sidebar.module";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    CartuPage,
  ],
  imports: [
    HeaderPageModule,
    SidebarPageModule,
    IonicPageModule.forChild(CartuPage),
    TranslateModule.forChild()
  ],
  exports: [ CartuPage ]
})
export class CartuPageModule {}
