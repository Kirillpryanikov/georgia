import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AuthorizationComponent } from './authorization.component';

@NgModule({
  imports: [
    IonicPageModule.forChild(AuthorizationComponent)
  ],
  declarations: [
    AuthorizationComponent
  ]
})
export class AuthorizationModule {}
