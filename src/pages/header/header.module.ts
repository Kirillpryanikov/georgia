import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HeaderPage } from '@pages/header/header';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {createTranslateLoader} from "../../app/app.module";
import {HttpClient} from "@angular/common/http";
import { NgxBarcodeModule } from 'ngx-barcode';


@NgModule({
  declarations: [
    HeaderPage,
  ],
  imports: [
    NgxBarcodeModule,
    IonicPageModule.forChild(HeaderPage),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      },
    })
  ],
  exports: [ HeaderPage ]
})
export class HeaderPageModule {}
