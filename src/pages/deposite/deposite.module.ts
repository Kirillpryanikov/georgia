import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DepositePage } from '@pages/deposite/deposite';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    DepositePage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(DepositePage),
  ],
  exports: [ DepositePage ]
})
export class DepositePageModule {}
