import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArrivedPage } from '@pages/arrived/arrived';
import {HeaderPageModule} from "@pages/header/header.module";
import {SidebarPageModule} from "@pages/sidebar/sidebar.module";

@NgModule({
  declarations: [
    ArrivedPage,
  ],
  imports: [
    HeaderPageModule,
    SidebarPageModule,
    IonicPageModule.forChild(ArrivedPage),
  ],
})
export class ArrivedPageModule {}
