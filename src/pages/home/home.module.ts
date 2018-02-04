import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Home } from '@pages/home/home';

@NgModule({
  declarations: [ Home ],
  imports: [IonicPageModule.forChild(Home)],
  exports: [ Home ]
})
export class HomeModule {}
