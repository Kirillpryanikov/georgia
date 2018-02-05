import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ScriptDataModule } from '@core/script.data/script.data.module';

const CORE_PROVIDERS = [ ];
const MODULES = [ ScriptDataModule ];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MODULES
  ],
  providers: []
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders> {
      ngModule: CoreModule,
      providers: [ ...CORE_PROVIDERS ]
    }
  }
}
