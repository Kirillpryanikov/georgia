import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Authorization } from '@pages/authorization/authorization';

@NgModule({
  declarations: [
    Authorization
  ],
  imports: [
    IonicPageModule.forChild(Authorization)
  ],
  exports: [ Authorization ]
})
export class AuthorizationModule {}
