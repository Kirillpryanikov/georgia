import {Component, OnInit, ViewChild} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ErrorPopups} from "@shared/popups/error-popup-component/error-popups";
import {SuccessPopups} from "@shared/popups/success-popup-component/success-popups";
import {HeaderService} from "@core/services";
import {NativeStorage} from "@ionic-native/native-storage";

@IonicPage({
  name: 'page-confirm-pincode'
})
@Component({
  selector: 'page-confirm-pincode',
  templateUrl: 'confirm-pincode.html',
})
export class ConfirmPincodePage implements OnInit{

  @ViewChild('inputConfirmPin') inputConfirmPin;

  private hashKey: string;
  private sessionId: string;
  private pin: string = '';
  private count: number = 0;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public headerService: HeaderService,
              public nativeStorage: NativeStorage
              ) {
  }

  ngOnInit() {
    this.nativeStorage.getItem('sessionId')
      .then(res => {
        this.sessionId = res;
        this.getHashKey();
      });
  }

  getHashKey(){
    this.headerService.getInfo('getInfo', {sessionId: this.sessionId}).subscribe(data => {
      this.hashKey = data.message.profile.key;
    })
  }


  awaitingPage(){
    if(this.confirmPin()){
      this.nativeStorage.setItem('hashKey', this.hashKey);
      this.nativeStorage.setItem('pin', this.pin);
      this.nativeStorage.setItem('is_pin', true);
      const modal = this.modalCtrl.create(SuccessPopups);
      modal.onDidDismiss(() => {
        this.navCtrl.setRoot('page-awaiting-tracking');
      });
      modal.present();
    }
    else {
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
    }

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
        const a = document.getElementById(`__${this.count}`);
        if(a){
          this.pin+=key;
          a.style.color = '#666666';
          this.count++;
          if(this.pin.length === 4){
            this.awaitingPage();
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
        const c = document.getElementById(`__${this.count}`);
        if(c){
          this.pin = this.pin.substring(0, this.pin.length - 1);
          c.style.color = 'rgba(0,0,0,0)';
        }
        break;
    }
  }

  confirmPin(){
    if(this.pin === this.navParams.data.pin)
      return true;
    else
      return false;
  }

}
