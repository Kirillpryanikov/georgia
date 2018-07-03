import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SetPincodePage } from './set-pincode';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {createTranslateLoader} from "../../app/app.module";
import {HeaderPageModule} from "../header/header.module";
import {SidebarPageModule} from "../sidebar/sidebar.module";
import {HttpClient} from "@angular/common/http";

@NgModule({
  declarations: [
    SetPincodePage,
  ],
  imports: [
    HeaderPageModule,
    SidebarPageModule,
    IonicPageModule.forChild(SetPincodePage),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      },
    })
  ],
})
export class SetPincodePageModule {}
