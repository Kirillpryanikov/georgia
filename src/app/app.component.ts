import { Component, OnDestroy, OnInit} from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import { Globalization } from '@ionic-native/globalization';
import { ScriptMainService } from "@core/script.data/script.main.service";
import { NativeStorage } from "@ionic-native/native-storage";
import { HeaderService} from "@core/services";

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit{
  private rootPage: string;
  private rememberMe: boolean = true;
  constructor(private platform: Platform,
              private statusBar: StatusBar,
              private splashScreen: SplashScreen,
              private translate: TranslateService,
              private globalization: Globalization,
              private mainService: ScriptMainService,
              private headerService: HeaderService,
              private nativeStorage: NativeStorage) {
    platform.ready().then(() => {
      this.initLanguage();
      statusBar.styleDefault();
      splashScreen.hide();
      this.nativeStorage.getItem('remember').then(res => {
        console.log('res',res);
        this.rememberMe = res;
        if(!this.rememberMe) {
          console.log('remove');
          this.nativeStorage.remove('sessionId');
        }
      });
      setTimeout(() => {
        this.isAuth();
      },100);
    });
  }

  ngOnInit() {
    this.initDropdown();
  }

  ionViewDidLoad() {

  }

  initDropdown() {
    this.mainService.dropdown();
    this.mainService.dropdownLang();
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

