import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AwaitingTrackingPage } from './awaiting-tracking';
import { HeaderPageModule } from '@pages/header/header.module';
import { SharedModule } from '@shared/shared.module';
import {SidebarPageModule} from "@pages/sidebar/sidebar.module";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {createTranslateLoader} from "../../app/app.module";
import {HttpClient} from "@angular/common/http";

@NgModule({
  declarations: [
    AwaitingTrackingPage,
  ],
  imports: [
    IonicPageModule.forChild(AwaitingTrackingPage),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      },
    }),
    HeaderPageModule,
    SidebarPageModule,
    SharedModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AwaitingTrackingPageModule {}
