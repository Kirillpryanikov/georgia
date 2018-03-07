import { Component, OnInit } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import { Globalization } from '@ionic-native/globalization';
import { ScriptMainService } from "@core/script.data/script.main.service";
import { NativeStorage } from "@ionic-native/native-storage";

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit{
  // rootPage:string = 'page-awaiting-tracking';
  rootPage:string = 'arrived-page';
  // private rootPage: string;
  constructor(private platform: Platform,
              private statusBar: StatusBar,
              private splashScreen: SplashScreen,
              private translate: TranslateService,
              private globalization: Globalization,
              private mainService: ScriptMainService,
              private nativeStorage: NativeStorage) {
    platform.ready().then(() => {
      this.initLanguage();
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  ngOnInit() {
    this.initDropdown();
    // this.isAuth();
  }

  ionViewDidLoad() {

  }

  initDropdown() {
    this.mainService.dropdown();
  }

  isAuth() {
    this.nativeStorage.getItem('sessionId')
      .then(res => {
        this.rootPage = 'page-awaiting-tracking'
      })
      .catch(err => {
        this.rootPage = 'authorization-page';
      })

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

