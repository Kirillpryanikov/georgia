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

  private form: FormGroup;
  private hashKey: string;
  private sessionId: string;
  private pin: string;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public headerService: HeaderService,
              public nativeStorage: NativeStorage,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.nativeStorage.getItem('sessionId')
      .then(res => {
        this.sessionId = res;
        this.getHashKey();
      });
    this.initForm();
  }

  ionViewDidLoad() {
    console.log('121212',this.inputConfirmPin);
    setTimeout(() => {
      if (this.inputConfirmPin) {
        this.inputConfirmPin.nativeElement.focus();
      }
    }, 800);
  }

  initForm() {
    this.form = this.fb.group({
      first:['', Validators.compose([
        Validators.required
      ])],
      second:['', Validators.compose([
        Validators.required
      ])],
      third:['', Validators.compose([
        Validators.required
      ])],
      fourth:['', Validators.compose([
        Validators.required
      ])]
    })
  }

  confirmPin() {
    if(this.form.value.first === this.navParams.data.pin.first){
      if(this.form.value.second === this.navParams.data.pin.second){
        if(this.form.value.third === this.navParams.data.pin.third){
          if(this.form.value.fourth === this.navParams.data.pin.fourth){
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      } else {
        return false
      }
    } else {
      return false;
    }
  }

  getHashKey(){
    this.headerService.getInfo('getInfo', {sessionId: this.sessionId}).subscribe(data => {
      this.hashKey = data.message.profile.key;
    })
  }

  awaitingPage(){
    if(this.confirmPin()){
      this.pin = this.form.value.first + this.form.value.second + this.form.value.third + this.form.value.fourth;
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
      this.form.patchValue({
        first:'',
        second:'',
        third:'',
        fourth:''
      });
      const modal = this.modalCtrl.create(ErrorPopups, {notice: "_YOUR_PIN_CODE_NOT_CONFIRMED"});
      modal.present();
    }

  }

}
