import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ScriptDataModule } from '@core/script.data/script.data.module';
import {
  AuthorizationService,
  RegistrationService,
  AwaitingTrackingService,
  PopupService } from '@core/services';

const CORE_PROVIDERS = [
  AuthorizationService,
  RegistrationService,
  AwaitingTrackingService,
  PopupService
];
const MODULES = [ ScriptDataModule ];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MODULES
  ],
  providers: [ ...CORE_PROVIDERS ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders> {
      ngModule: CoreModule,
      providers: [ ...CORE_PROVIDERS ]
    }
  }
}
