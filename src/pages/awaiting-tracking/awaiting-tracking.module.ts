import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AwaitingTrackingPage } from './awaiting-tracking';
import { HeaderPageModule } from '@pages/header/header.module';
import { SharedModule } from '@shared/shared.module';
import {SidebarPageModule} from "@pages/sidebar/sidebar.module";

@NgModule({
  declarations: [
    AwaitingTrackingPage,
  ],
  imports: [
    IonicPageModule.forChild(AwaitingTrackingPage),
    HeaderPageModule,
    SidebarPageModule,
    SharedModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AwaitingTrackingPageModule {}
