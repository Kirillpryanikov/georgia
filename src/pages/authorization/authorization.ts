import { Component, ElementRef, ViewChild, Renderer2, OnInit, OnDestroy } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { ScriptRegisterService } from '@core/script.data/script.register.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthorizationService } from '@core/services';
import { Subscription } from "rxjs/Subscription";
import {NativeStorage} from "@ionic-native/native-storage";

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
  private authObservable: Subscription;
  private data;
  private subscription: Subscription;

  constructor(private navCtrl: NavController,
              private fb: FormBuilder,
              private render: Renderer2,
              private translate: TranslateService,
              private registerService: ScriptRegisterService,
              private authService: AuthorizationService,
              private nativeStorage: NativeStorage) {}

  ngOnInit() {
    this.initForm();
  }

  ionViewCanEnter(){
    this.initCheckout();
  }

  initCheckout() {
    this.registerService.checkbox();
  }

  initDropdown() {
    this.registerService.dropdown();
  }

  initForm() {
    this.form = this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.required],
      checkbox: false
    })
  }

  changeLanguage(language: string) {
    this.registerService.hideDropdown();
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
    this.subscription = this.authService.login('login', this.data).subscribe(data => {
      console.log()
      if(data.message.status === 'OK') {
        this.nativeStorage.setItem('sessionId', data.message.session_id);
        this.nativeStorage.setItem('remember', this.data.remember);
        this.navCtrl.setRoot('page-awaiting-tracking', {lang: this.lang});
        this.subscription.unsubscribe();
      }
    })
  }

  goToRegisterPage() {
    this.registerService.offClick();

    this.navCtrl.setRoot('register-page');
  }

  ngOnDestroy() {
    if (this.authObservable)
      this.authObservable.unsubscribe();
  }
}
