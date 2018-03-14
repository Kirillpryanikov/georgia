import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArrivedPage } from '@pages/arrived/arrived';
import {HeaderPageModule} from "@pages/header/header.module";
import {SidebarPageModule} from "@pages/sidebar/sidebar.module";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    ArrivedPage,
  ],
  imports: [
    HeaderPageModule,
    SidebarPageModule,
    IonicPageModule.forChild(ArrivedPage),
    TranslateModule.forChild()
  ],
})
export class ArrivedPageModule {}
