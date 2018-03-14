import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Authorization } from '@pages/authorization/authorization';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    Authorization
  ],
  imports: [
    IonicPageModule.forChild(Authorization),
    TranslateModule.forChild()
  ],
  exports: [ Authorization ]
})
export class AuthorizationModule {}
