import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ScriptDataModule } from '@core/script.data/script.data.module';
import {
  AuthorizationService, RegistrationService, AwaitingTrackingService, HeaderService, UsaWarehouseService,
  PendingService, ArrivedService, ReceivedService, PopupService, SettingService, TransactionService
} from '@core/services';
import { DeclarationService } from "@core/services/declaration";
import { NgxSoapModule } from "ngx-soap";
import {TransactionPageModule} from "@pages/transaction/transaction.module";

const CORE_PROVIDERS = [
  AuthorizationService,
  RegistrationService,
  DeclarationService,
  AwaitingTrackingService,
  HeaderService,
  UsaWarehouseService,
  PendingService,
  ArrivedService,
  ReceivedService,
  AwaitingTrackingService,
  PopupService,
  FileReader,
  SettingService,
  TransactionService
];
const MODULES = [ ScriptDataModule, NgxSoapModule ];

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
