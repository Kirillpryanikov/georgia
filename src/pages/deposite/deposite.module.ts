import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DepositePage } from '@pages/deposite/deposite';
import { HeaderPageModule } from "@pages/header/header.module";
import {SidebarPageModule} from "@pages/sidebar/sidebar.module";
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [
    DepositePage,
  ],
  imports: [
    HeaderPageModule,
    SidebarPageModule,

    IonicPageModule.forChild(DepositePage),
    TranslateModule.forChild()
  ],
  exports: [ DepositePage ]
})
export class DepositePageModule {}
