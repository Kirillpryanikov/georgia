import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NativeStorage} from "@ionic-native/native-storage";
import {AuthorizationService} from "@core/services";
import {Subscription} from "rxjs/Subscription";
import {TranslateService} from "@ngx-translate/core";
import {ScriptRegisterService} from "@core/script.data/script.register.service";

/**
 * Generated class for the PinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: "page-pin"
})
@Component({
  selector: 'page-pin',
  templateUrl: 'pin.html',
})
export class PinPage implements OnInit{

  private form: FormGroup;
  private lang: string = 'en';
  private data;
  private msg: string;
  private key;
  private subscription: Subscription;

  constructor(public navCtrl: NavController,
              private translate: TranslateService,
              public navParams: NavParams,
              private registerService: ScriptRegisterService,
              private fb: FormBuilder,
              private nativeStorage: NativeStorage,
              private authService: AuthorizationService) {
  }

  ngOnInit() {
    this.initForm();
  }

  changeLanguage(language: string) {
    this.registerService.hideDropdown();
    this.lang = language;
    this.translate.use(language);
  }

  login() {
    this.nativeStorage.getItem('pin')
      .then(res => {
        if(res === this.form.value.pin){
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
                console.log(data);
                this.nativeStorage.setItem('sessionId', data.message.session_id);
                this.nativeStorage.setItem('remember', this.data.remember);
                this.navCtrl.setRoot('page-awaiting-tracking', {lang: this.lang});
                this.subscription.unsubscribe();
              })
            });
        } else {
          this.msg = 'Wrong PIN Code'
        }
      });
  }

  initForm() {
    this.form = this.fb.group({
      pin: ['', Validators.compose([
        Validators.maxLength(4),
        Validators.minLength(4),
        Validators.required
      ])],
      checkbox: false
    })
  }
}
