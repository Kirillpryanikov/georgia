import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PendingPage } from '@pages/pending/pending';
import {SidebarPageModule} from "@pages/sidebar/sidebar.module";
import {HeaderPageModule} from "@pages/header/header.module";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {createTranslateLoader} from "../../app/app.module";
import {HttpClient} from "@angular/common/http";

@NgModule({
  declarations: [
    PendingPage,
  ],
  imports: [
    SidebarPageModule,
    HeaderPageModule,
    IonicPageModule.forChild(PendingPage),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      },
    })
  ],
})
export class PendingPageModule {}
