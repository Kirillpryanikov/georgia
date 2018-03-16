import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReceivedPage } from './received';
import {SidebarPageModule} from "../sidebar/sidebar.module";
import {HeaderPageModule} from "../header/header.module";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {createTranslateLoader} from "../../app/app.module";
import {HttpClient} from "@angular/common/http";

@NgModule({
  declarations: [
    ReceivedPage,
  ],
  imports: [
    SidebarPageModule,
    HeaderPageModule,
    IonicPageModule.forChild(ReceivedPage),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      },
    })
  ],
})
export class ReceivedPageModule {}
