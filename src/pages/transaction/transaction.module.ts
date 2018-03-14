import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransactionPage } from '@pages/transaction/transaction';
import { HeaderPageModule } from "@pages/header/header.module";
import { SidebarPageModule } from "@pages/sidebar/sidebar.module";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    TransactionPage,
  ],
  imports: [
    HeaderPageModule,
    SidebarPageModule,
    IonicPageModule.forChild(TransactionPage),
    TranslateModule.forChild()
  ],
})
export class TransactionPageModule {}
