import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const EXPORTS = [];
const DECLARATIONS = [];

@NgModule({
  imports: [ CommonModule ],
  declarations: [ ...DECLARATIONS ],
  exports: [ ...EXPORTS ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders> {
      ngModule: SharedModule
    }
  }
}
