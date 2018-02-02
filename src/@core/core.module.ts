import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

const CORE_PROVIDERS = [ ];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders> {
      ngModule: CoreModule,
      providers: [ ...CORE_PROVIDERS ]
    }
  }
}
