import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DepositePage } from '@pages/deposite/deposite';
import { HeaderPageModule } from "@pages/header/header.module";
import {SidebarPageModule} from "@pages/sidebar/sidebar.module";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {createTranslateLoader} from "../../app/app.module";
import {HttpClient} from "@angular/common/http";


@NgModule({
  declarations: [
    DepositePage,
  ],
  imports: [
    HeaderPageModule,
    SidebarPageModule,

    IonicPageModule.forChild(DepositePage),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      },
    })
  ],
  exports: [ DepositePage ]
})
export class DepositePageModule {}
