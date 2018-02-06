import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DepositePage } from '@pages/deposite/deposite';

@NgModule({
  declarations: [
    DepositePage,
  ],
  imports: [
    IonicPageModule.forChild(DepositePage),
  ],
  exports: [ DepositePage ]
})
export class DepositePageModule {}
