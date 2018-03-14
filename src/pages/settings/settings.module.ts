import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SettingsPage } from '@pages/settings/settings';
import { HeaderPageModule } from "@pages/header/header.module";
import { SidebarPageModule } from "@pages/sidebar/sidebar.module";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    SettingsPage,
  ],
  imports: [
    HeaderPageModule,
    SidebarPageModule,
    IonicPageModule.forChild(SettingsPage),
    TranslateModule.forChild()
  ],
  exports: [  ]
})
export class SettingsPageModule {}
