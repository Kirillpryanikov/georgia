import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AwaitingTrackingPage } from './awaiting-tracking';

@NgModule({
  declarations: [
    AwaitingTrackingPage,
  ],
  imports: [
    IonicPageModule.forChild(AwaitingTrackingPage),
  ],
})
export class AwaitingTrackingPageModule {}
