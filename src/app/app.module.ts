import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';
import { PagesModule } from '@pages/pages.module'
import { MyApp } from './app.component';
import { HomeComponent } from '@pages/home/home.component';
import { AuthorizationComponent } from '@pages/authorization/authorization.component';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    CoreModule.forRoot(),
    SharedModule.forRoot(),
    PagesModule.forRoot(),
    IonicModule.forRoot(MyApp, {}, {
      links: [
        { component: HomeComponent, name: 'home-page'},
        // { component: AuthorizationComponent, name: 'auth-page'}
      ]
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
