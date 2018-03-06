import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ScriptDataModule } from '@core/script.data/script.data.module';
import {
  AuthorizationService, RegistrationService, AwaitingTrackingService, HeaderService, UsaWarehouseService,
  PendingService, ArrivedService, ReceivedService, PopupService, SettingService, TransactionService, TbcService,
  CartuService
} from '@core/services';
import { DeclarationService } from "@core/services/declaration";
import { NgxSoapModule } from "ngx-soap";
import { InvoiceService } from "@core/services/invoice";
import { NativeStorage } from "@ionic-native/native-storage";
import {InAppBrowser} from "@ionic-native/in-app-browser";

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
  TransactionService,
  InvoiceService,
  TbcService,
  CartuService,
  NativeStorage,
  InAppBrowser
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
