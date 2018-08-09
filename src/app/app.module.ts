import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Globalization } from '@ionic-native/globalization';
import { PagesModule } from '@pages/pages.module'
import { SharedModule } from '@shared/shared.module';
import { CoreModule } from '@core/core.module';
import { MyApp } from './app.component';
import { FormsModule } from "@angular/forms";
import { Network } from "@ionic-native/network";
import {Keyboard} from "@ionic-native/keyboard";
import { NgxBarcodeModule } from 'ngx-barcode';
import {FingerprintAIO} from "@ionic-native/fingerprint-aio";
import { NgSelectModule } from '@ng-select/ng-select';




export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    NgSelectModule,
    NgxBarcodeModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    CoreModule.forRoot(),
    SharedModule.forRoot(),
    PagesModule.forRoot(),
    IonicModule.forRoot(MyApp),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      },
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    Globalization,
    FingerprintAIO,
    Network,
    StatusBar,
    SplashScreen,
    Keyboard,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
}
