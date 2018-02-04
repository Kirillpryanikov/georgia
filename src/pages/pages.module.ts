import { NgModule, ModuleWithProviders } from '@angular/core';

const IMPORTS = [];

@NgModule({
  imports: [...IMPORTS ],
  declarations: [],
  exports: [ ...IMPORTS ]
})
export class PagesModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders> {
      ngModule: PagesModule
    }
  }
}
