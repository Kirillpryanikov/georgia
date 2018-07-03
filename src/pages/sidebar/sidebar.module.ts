import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SidebarPage } from './sidebar';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {createTranslateLoader} from "../../app/app.module";
import {HttpClient} from "@angular/common/http";
import { NgxBarcodeModule } from 'ngx-barcode';


@NgModule({
  declarations: [
    SidebarPage,
  ],
  imports: [
    NgxBarcodeModule,
    IonicPageModule.forChild(SidebarPage),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      },
    })
  ],
  exports: [
    SidebarPage
  ]
})
export class SidebarPageModule {}
