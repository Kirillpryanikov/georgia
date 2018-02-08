import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AwaitingTrackingPage } from './awaiting-tracking';
import { HeaderPageModule } from '@pages/header/header.module';

@NgModule({
  declarations: [
    AwaitingTrackingPage,
  ],
  imports: [
    IonicPageModule.forChild(AwaitingTrackingPage),
    HeaderPageModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AwaitingTrackingPageModule {}
