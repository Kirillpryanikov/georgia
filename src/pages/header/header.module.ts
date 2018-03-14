import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HeaderPage } from '@pages/header/header';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    HeaderPage,
  ],
  imports: [
    IonicPageModule.forChild(HeaderPage),
    TranslateModule.forChild()
  ],
  exports: [ HeaderPage ]
})
export class HeaderPageModule {}
