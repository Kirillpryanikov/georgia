import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfirmPincodePage } from './confirm-pincode';
import { SidebarPageModule } from "../sidebar/sidebar.module";
import { HeaderPageModule } from "../header/header.module";
import { TranslateLoader, TranslateModule} from "@ngx-translate/core";
import { createTranslateLoader} from "../../app/app.module";
import { HttpClient} from "@angular/common/http";

@NgModule({
  declarations: [
    ConfirmPincodePage,
  ],
  imports: [
    HeaderPageModule,
    SidebarPageModule,
    IonicPageModule.forChild(ConfirmPincodePage),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      },
    })
  ],
})
export class ConfirmPincodePageModule {}
