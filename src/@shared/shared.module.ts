import { ModuleWithProviders, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { WarningPopups } from '@shared/popups/warning-popup-component/warning-popups';
import { SharedComponentModule } from '@shared/components/shared-component.module';
import { CommentPopups } from "@shared/popups/comment-popup-component/comment-popups";
import { InvoicePopups } from "@shared/popups/invoice-popup-component/invoice-popups";
import {InvoiceInfoPopups} from "@shared/popups/invoice-info-popup-component/invoice-info-popups";
import {DetailsPopups} from "@shared/popups/details-popup-component/details-popups";
import {AddressPopups} from "@shared/popups/address-popup-component/address-popups";

const MODULES = [
  SharedComponentModule
];
const DECLARATIONS = [
  WarningPopups,
  CommentPopups,
  InvoicePopups,
  InvoiceInfoPopups,
  DetailsPopups,
  AddressPopups
];

@NgModule({
  imports: [ ...MODULES, CommonModule ],
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
