import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InvoicePage } from './invoice';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    InvoicePage,
  ],
  imports: [
    IonicPageModule.forChild(InvoicePage),
    TranslateModule.forChild()
  ],
})
export class InvoicePageModule {}
