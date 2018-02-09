import { ModuleWithProviders, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { RiskFreeShipping } from '@shared/popups/risk-free-shipping.component/risk-free-shipping';

const DECLARATIONS = [
  RiskFreeShipping
];

@NgModule({
  imports: [ CommonModule ],
  declarations: [ ...DECLARATIONS ],
  entryComponents: [ ...DECLARATIONS ],
  exports: [ ...DECLARATIONS ],
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
