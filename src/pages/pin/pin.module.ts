import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PinPage } from './pin';
import {HttpClient} from "@angular/common/http";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {createTranslateLoader} from "../../app/app.module";

@NgModule({
  declarations: [
    PinPage,
  ],
  imports: [
    IonicPageModule.forChild(PinPage),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      },
    })
  ],
})
export class PinPageModule {}
