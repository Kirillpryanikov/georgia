import { Component, ElementRef, ViewChild, Renderer2, OnInit, OnDestroy, HostListener, NgZone } from '@angular/core';
import {IonicPage, LoadingController, NavController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ScriptRegisterService } from '@core/script.data/script.register.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthorizationService } from '@core/services';
import { Subscription } from "rxjs/Subscription";
import { NativeStorage } from "@ionic-native/native-storage";
import { FingerprintAIO } from "@ionic-native/fingerprint-aio";
import {ScriptMainService} from "@core/script.data/script.main.service";

@IonicPage({
  name: 'authorization-page'
})
@Component({
  selector: 'authorization-page',
  templateUrl: 'authorization.component.html',
  styleUrls: ['/authorization.scss']
})
export class Authorization implements OnInit, OnDestroy {
  @ViewChild('jsorganization') jsOrganization: ElementRef;
  private form: FormGroup;
  private lang: string = 'en';
  private msg;
  private authObservable: Subscription;
  private data;
  private hashKey: string;
  private pin: string;
  private load;
  private subscription: Subscription;
  private finger;
  private key;
  public set_finger: boolean;
  is_pin;
  is_finger;
  public changeLanguageFlag: boolean = false;

  constructor(private navCtrl: NavController,
              public zone: NgZone,
              private faio: FingerprintAIO,
              private fb: FormBuilder,
              private render: Renderer2,
              private translate: TranslateService,
              private registerService: ScriptRegisterService,
              private mainService: ScriptMainService,
              private authService: AuthorizationService,
              private loadingCtrl: LoadingController,
              private nativeStorage: NativeStorage) {}

  ngOnInit() {
    console.log('NG ON INIT');


    this.nativeStorage.getItem('is_pin').then(data => {
      this.is_pin = data;
    });
    this.nativeStorage.getItem('is_finger').then(data => {
      this.is_finger = data;
    });
    this.faio.isAvailable()
      .then(data => {
        this.finger = data;
      })
      .catch((err) => {
        console.error(err);
      });
    this.nativeStorage.getItem('hashKey')
      .then(res => {
        this.hashKey = res;
      });
    this.nativeStorage.getItem('set_finger')
      .then(res => {
        this.set_finger = res;
      });
    this.nativeStorage.getItem('pin')
      .then(res => {
        this.pin = res;
      });
    this.initForm();
  }

  ionViewCanEnter(){
    this.initCheckout();
  }

  initCheckout() {
    this.registerService.checkbox();
  }


  initForm() {
    this.form = this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.required],
      checkbox: false
    })
  }

  setLanguageMenu(state: boolean) {
    this.changeLanguageFlag = state;
    console.log('test');
    console.log(this);
  }

  changeLanguage(language: string) {
    this.changeLanguageFlag = false;
    this.lang = language;
    this.translate.use(language);
  }

  login() {
    this.data = {
      secret: '6LcbGCsUAAATUM-mRB1xmIGEAbaSfebzeUlPpsuZ',
      userName: this.form.value.email,
      password: this.form.value.password,
      language: this.lang,
      remember: this.form.value.checkbox
    };
    this.load = this.loadingCtrl.create({
      spinner: 'dots'
    });
    this.load.present();
    this.subscription = this.authService.login('login', this.data).subscribe(data => {
      if(data.message.status === 'OK') {
        this.nativeStorage.setItem('sessionId', data.message.session_id);
        this.nativeStorage.setItem('remember', this.data.remember);
        this.navCtrl.setRoot('page-awaiting-tracking', {lang: this.lang});
        this.subscription.unsubscribe();
      } else {
        this.msg = data.message.message;
      }
      this.load.dismiss();
    })
  }

  loginFinger() {
    this.load = this.loadingCtrl.create({
      spinner: 'dots'
    });
    this.load.present();
    this.nativeStorage.getItem('hashKey')
      .then(res => {
        this.key = res;
        this.data = {
          secret: '6LcbGCsUAAATUM-mRB1xmIGEAbaSfebzeUlPpsuZ',
          key: this.key,
          language: this.lang,
          remember: this.form.value.checkbox
        };
        this.subscription = this.authService.keyLogin('keyLogin', this.data).subscribe(data => {
          this.nativeStorage.setItem('sessionId', data.message.session_id);
          this.nativeStorage.setItem('remember', this.data.remember);
          this.navCtrl.setRoot('page-awaiting-tracking', {lang: this.lang});
          this.load.dismiss();
          this.subscription.unsubscribe();
        })
      });
  }

  goToRegisterPage() {
    this.registerService.offClick();
    this.navCtrl.push('register-page');
  }

  goToPinPage() {
    this.registerService.offClick();
    this.navCtrl.push('page-pin');
  }

  fingerPrint(){
    this.faio.show({
      clientId: 'Fingerprint-Demo',
      clientSecret: 'password', //Only necessary for Android
      disableBackup:true,  //Only for Android(optional)
      localizedFallbackTitle: 'Use Pin', //Only for iOS
      localizedReason: 'Please authenticate' //Only for iOS
    })
      .then(() => {
        this.loginFinger();
      })
      .catch((error) => {
        console.log('err', error);
      });
  }

  ngOnDestroy() {
    if (this.authObservable)
      this.authObservable.unsubscribe();
  }

  @HostListener('document:click', ['$event']) documentClick(e): void {
    if (e.target.classList.contains('u2g-multilang__switcher')) {
      return;
    }
    this.zone.run(() => this.setLanguageMenu(false))
  }
}
