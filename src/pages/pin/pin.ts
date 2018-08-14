import { Component } from '@angular/core';
import {IonicPage, LoadingController, ModalController, NavController, NavParams} from 'ionic-angular';
import {NativeStorage} from "@ionic-native/native-storage";
import {Subscription} from "rxjs/Subscription";
import {AuthorizationService} from "@core/services";
import {TranslateService} from "@ngx-translate/core";
import {ErrorPopups} from "@shared/popups/error-popup-component/error-popups";

@IonicPage({
  name: 'page-pin'
})
@Component({
  selector: 'page-pin',
  templateUrl: 'pin.html',
})
export class PinPage {
  private count: number = 0;
  private pin: string = '';
  private load;
  private data;
  private key;
  public lang: string = '';
  private subscription: Subscription;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public nativeStorage: NativeStorage,
              public modalCtrl: ModalController,
              public translate: TranslateService,
              public authService: AuthorizationService) {
    this.lang = this.translate.currentLang;
  }

  writePin(key){
    switch (key){
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
      case 0:
        const a = document.getElementById(`_${this.count}`);
        if(a){
          this.pin+=key;
          a.style.color = '#666666';
          this.count++;
          if(this.pin.length === 4){
            this.login();
          }
        }
        break;
      case '_CLEAR':
        const b: any = document.getElementsByClassName('input_pin');
        if(b){
          this.pin = '';
          this.count = 0;
          for(let i = 0; i < b.length; i++){
            b[i].style.color = 'rgba(0,0,0,0)';
          }
        }
        break;
      case 'remove':
        if(this.count > 0)
          this.count--;
        const c = document.getElementById(`_${this.count}`);
        if(c){
          this.pin = this.pin.substring(0, this.pin.length - 1);
          c.style.color = 'rgba(0,0,0,0)';
        }
        break;
    }
  }

  login() {
    this.load = this.loadingCtrl.create({
      spinner: 'dots'
    });
    this.load.present();
    this.nativeStorage.getItem('pin')
      .then(res => {
        if(res === this.pin){
          this.nativeStorage.getItem('hashKey')
            .then(res => {
              this.key = res;
              this.data = {
                secret: '6LcbGCsUAAATUM-mRB1xmIGEAbaSfebzeUlPpsuZ',
                key: this.key,
                language: this.lang,
                remember: true
              };
              this.subscription = this.authService.keyLogin('keyLogin', this.data).subscribe(data => {
                this.nativeStorage.setItem('sessionId', data.message.session_id);
                this.nativeStorage.setItem('remember', this.data.remember);
                this.navCtrl.setRoot('page-awaiting-tracking', {lang: this.lang});
                this.load.dismiss();
                this.subscription.unsubscribe();
              })
            });
        } else {
          const b: any = document.getElementsByClassName('input_pin');
          if(b){
            this.pin = '';
            this.count = 0;
            for(let i = 0; i < b.length; i++){
              b[i].style.color = 'rgba(0,0,0,0)';
            }
          }
          const modal = this.modalCtrl.create(ErrorPopups, {notice: "_YOUR_PIN_CODE_NOT_CONFIRMED"});
          modal.present();
          this.load.dismiss();
        }
      });
  }

}

