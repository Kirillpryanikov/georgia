import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReceivedPage } from './received';
import {SidebarPageModule} from "../sidebar/sidebar.module";
import {HeaderPageModule} from "../header/header.module";

@NgModule({
  declarations: [
    ReceivedPage,
  ],
  imports: [
    SidebarPageModule,
    HeaderPageModule,
    IonicPageModule.forChild(ReceivedPage),
  ],
})
export class ReceivedPageModule {}
