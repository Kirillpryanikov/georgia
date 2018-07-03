import { ModuleWithProviders, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { WarningPopups } from '@shared/popups/warning-popup-component/warning-popups';
import { SharedComponentModule } from '@shared/components/shared-component.module';
import { CommentPopups } from "@shared/popups/comment-popup-component/comment-popups";
import { InvoicePopups } from "@shared/popups/invoice-popup-component/invoice-popups";
import { InvoiceInfoPopups } from "@shared/popups/invoice-info-popup-component/invoice-info-popups";
import { DetailsPopups } from "@shared/popups/details-popup-component/details-popups";
import { AddressPopups } from "@shared/popups/address-popup-component/address-popups";
import { AddProductPopups } from "@shared/popups/add-product-popup-component/add-product-popups";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SuccessPopups } from "@shared/popups/success-popup-component/success-popups";
import { CourierSuccessPopups } from "@shared/popups/courier-success-popup-component/courier-success-popups";
import { CourierNotSuccessPopups } from "@shared/popups/courier-not-success-popup-component/courier-not-success-popups";
import {TranslateModule} from "@ngx-translate/core";
import {ErrorPopups} from "@shared/popups/error-popup-component/error-popups";
import {PinPopups} from "@shared/popups/pin-popup-component/pin-popups";
import {BarcodePopups} from "@shared/popups/barcode-popup-component/barcode-popups";
import { NgxBarcodeModule } from 'ngx-barcode';


const MODULES = [
  NgxBarcodeModule,
  SharedComponentModule
];
const DECLARATIONS = [
  WarningPopups,
  CommentPopups,
  InvoicePopups,
  InvoiceInfoPopups,
  DetailsPopups,
  AddressPopups,
  AddProductPopups,
  SuccessPopups,
  CourierSuccessPopups,
  CourierNotSuccessPopups,
  ErrorPopups,
  PinPopups,
  BarcodePopups
];

@NgModule({
  imports: [ ...MODULES, CommonModule, FormsModule, ReactiveFormsModule, TranslateModule ],
  declarations: [ ...DECLARATIONS ],
  entryComponents: [ ...DECLARATIONS ],
  exports: [
    ...DECLARATIONS,
    ...MODULES
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [ NativePageTransitions ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders> {
      ngModule: SharedModule
    }
  }
}
