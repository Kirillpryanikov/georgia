import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PendingPage } from '@pages/pending/pending';
import {SidebarPageModule} from "@pages/sidebar/sidebar.module";
import {HeaderPageModule} from "@pages/header/header.module";

@NgModule({
  declarations: [
    PendingPage,
  ],
  imports: [
    SidebarPageModule,
    HeaderPageModule,
    IonicPageModule.forChild(PendingPage),
  ],
})
export class PendingPageModule {}
