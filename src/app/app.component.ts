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
import {debounceTime} from "rxjs/operators";

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit{
  private sessionId: string;
  private subscription: Subscription;
  private rootPage: string;
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
    this.nativeStorage.getItem('sessionId')
      .then(res => {
        this.sessionId = res;
        this.getInfo();
      });


    this.initDropdown();
    this.isAuth();
  }

  ionViewDidLoad() {

  }

  initDropdown() {
    this.mainService.dropdown();
  }

  getInfo() {
    this.subscription = this.headerService.getInfo('getInfo', {sessionId: this.sessionId}).subscribe(data => {
      console.log(data);
      this.translate.setDefaultLang(data.message.profile.panel_language || 'en');
      this.translate.use(data.message.profile.panel_language || 'en');
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

