import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Authorization } from '@pages/authorization/authorization';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {createTranslateLoader} from "../../app/app.module";
import {HttpClient} from "@angular/common/http";

@NgModule({
  declarations: [
    Authorization
  ],
  imports: [
    IonicPageModule.forChild(Authorization),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      },
    })
  ],
  exports: [ Authorization ]
})
export class AuthorizationModule {}
