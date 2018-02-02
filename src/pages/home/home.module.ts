import { NgModule, ModuleWithProviders } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [],
  declarations: [
    HomeComponent
  ],
  entryComponents: [
    HomeComponent
  ],
  exports: [ HomeComponent ]
})
export class HomeModule {}
