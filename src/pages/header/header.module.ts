import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HeaderPage } from '@pages/header/header';

@NgModule({
  declarations: [
    HeaderPage,
  ],
  imports: [
    IonicPageModule.forChild(HeaderPage),
  ],
  exports: [ HeaderPage ]
})
export class HeaderPageModule {}
