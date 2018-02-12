import { ModuleWithProviders, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { WarningPopups } from '@shared/popups/warning-popup-component/warning-popups';
import { SharedComponentModule } from '@shared/components/shared-component.module';

const MODULES = [
  SharedComponentModule
];
const DECLARATIONS = [
  WarningPopups
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
