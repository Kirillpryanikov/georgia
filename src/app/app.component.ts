import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import { Globalization } from '@ionic-native/globalization';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:string = 'page-awaiting-tracking';

  constructor(private platform: Platform,
              private statusBar: StatusBar,
              private splashScreen: SplashScreen,
              private translate: TranslateService,
              private globalization: Globalization) {
    platform.ready().then(() => {
      this.initLanguage();
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  initLanguage() {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    /**
     * Get language device
     */
    this.globalization.getPreferredLanguage()
      .then(res => {
        const countryCode = res.value.split('-')[0] !== 'ge' ? 'en': 'ge';
        this.translate.use(countryCode);
      })
      .catch(e => console.log('language app.component err --> ', e));
  }
}

