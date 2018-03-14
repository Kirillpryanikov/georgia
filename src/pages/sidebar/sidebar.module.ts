import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SidebarPage } from './sidebar';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    SidebarPage,
  ],
  imports: [
    IonicPageModule.forChild(SidebarPage),
    TranslateModule.forChild()
  ],
  exports: [
    SidebarPage
  ]
})
export class SidebarPageModule {}
