import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SettingsPage } from './settings';
import {HeaderPageModule} from "../header/header.module";
import {SidebarPageModule} from "../sidebar/sidebar.module";

@NgModule({
  declarations: [
    HeaderPageModule,
    SidebarPageModule,
    SettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(SettingsPage),
  ],
  exports: [  ]
})
export class SettingsPageModule {}
