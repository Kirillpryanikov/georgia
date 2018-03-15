import { Component, OnInit } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import { Globalization } from '@ionic-native/globalization';
import { ScriptMainService } from "@core/script.data/script.main.service";
import { NativeStorage } from "@ionic-native/native-storage";
import {Subscription} from "rxjs/Subscription";
import {HeaderService} from "@core/services";

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit{
  private sessionId: string = '707d235b00280e693eab0496acb2690d';
  private subscription: Subscription;
  rootPage:string = 'cartu-page';
  // private rootPage: string;
  constructor(private platform: Platform,
              private statusBar: StatusBar,
              private splashScreen: SplashScreen,
              private translate: TranslateService,
              private globalization: Globalization,
              private mainService: ScriptMainService,
              private headerService: HeaderService,
              private nativeStorage: NativeStorage) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  ngOnInit() {
    this.initDropdown();
    this.getInfo();
    // this.isAuth();
  }

  ionViewDidLoad() {

  }

  initDropdown() {
    this.mainService.dropdown();
  }

  getInfo() {
    this.subscription = this.headerService.getInfo('getInfo', {sessionId: this.sessionId}).subscribe(data => {
      this.translate.setDefaultLang(data.message.profile.panel_language);
      this.translate.use(data.message.profile.panel_language);
      this.subscription.unsubscribe();
    })
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
}

