import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AwaitingTrackingPage } from './awaiting-tracking';
import { HeaderPageModule } from '@pages/header/header.module';
import { SharedModule } from '@shared/shared.module';
import {SidebarPageModule} from "@pages/sidebar/sidebar.module";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    AwaitingTrackingPage,
  ],
  imports: [
    IonicPageModule.forChild(AwaitingTrackingPage),
    TranslateModule.forChild(),
    HeaderPageModule,
    SidebarPageModule,
    SharedModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AwaitingTrackingPageModule {}
