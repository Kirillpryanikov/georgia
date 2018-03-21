import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransactionPage } from '@pages/transaction/transaction';
import { HeaderPageModule } from "@pages/header/header.module";
import { SidebarPageModule } from "@pages/sidebar/sidebar.module";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {createTranslateLoader} from "../../app/app.module";
import {HttpClient} from "@angular/common/http";
import {NgxPaginationModule} from "ngx-pagination";

@NgModule({
  declarations: [
    TransactionPage,
  ],
  imports: [
    HeaderPageModule,
    NgxPaginationModule,
    SidebarPageModule,
    IonicPageModule.forChild(TransactionPage),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      },
    })
  ],
})
export class TransactionPageModule {}
