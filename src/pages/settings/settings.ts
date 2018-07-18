import { Component, OnInit, OnDestroy } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import { ScriptMainService } from "@core/script.data/script.main.service";
import { AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import { IUserSetings } from "@IFolder/IUserSettings";
import { IPassword } from "@IFolder/IPassword";
import { SettingService } from "@core/services/setting";
import 'rxjs/add/operator/map';
import {INotificationSettings} from "@IFolder/INotificationSettings";
import {Subscription} from "rxjs/Subscription";
import {NativeStorage} from "@ionic-native/native-storage";

import {HeaderService} from "@core/services";

import {WarningPopups} from "@shared/popups/warning-popup-component/warning-popups";
import {SuccessPopups} from "@shared/popups/success-popup-component/success-popups";
import {ErrorPopups} from "@shared/popups/error-popup-component/error-popups";
import {FingerprintAIO} from "@ionic-native/fingerprint-aio";
const notice = {
  change_psw: '_CHANGE_PASSWORD_CONFIRM'
};
/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'settings-page'
})
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage implements OnInit, OnDestroy{
  public logoWrapper = '_SETTINGS';
  private hashKey: string;
  private sessionId: string;
  private data: Object;
  private streetsList: Array<string>;
  private subscription: Subscription;
  private branch: string;
  private extention: string = '';
  userForm: FormGroup;
  passwordForm: FormGroup;
  notificationForm: FormGroup;
  pinForm: FormGroup;
  file: any;
  is_pin: boolean;
  is_finger: boolean;
  finger;
  is_image;
  private active = 'setting';

  user: IUserSetings = {
    address_1: 'string',
    address_2: 'tring',
    cellPhone: 'string',
    checkbox1: false,
    checkbox2: true,
    city: 'string',
    country: 'string',
    email: 'string',
    firstName: '',
    firstNameGeorgian: 'string',
    lastName: "string",
    lastNameGeorgian: 'string',
    userPhoto: 'img/placeholder_user.png'
  };
  password: IPassword = {
    currentPassword: '456',
    newPassword: '4587'
  };
  notification: INotificationSettings = {
    receivingOfPackageInUsa: true,
    invoicePayments: true,
    packageSent: true,
    insufficientFunds: true,
    packageDelivered: true,
    companyNewsAndPromotions: true,
    addFunds: true,
    receivingOfPackageInUsaSms: true
  };
  userPhoto: string = this.user.userPhoto;

  constructor(public navCtrl: NavController,
              public faio: FingerprintAIO,
              public navParams: NavParams,
              private mainService: ScriptMainService,
              private fb: FormBuilder,
              private reader: FileReader,
              private settingService: SettingService,
              private nativeStorage: NativeStorage,
              private headerService: HeaderService,
              private modalController: ModalController) {
  }

  ngOnInit() {
    this.faio.isAvailable()
      .then(data => {
        this.finger = data;
      })
      .catch((err) => {
        console.error(err);
      });
    this.nativeStorage.getItem('is_pin').then(data => {
      this.is_pin = data;
    });
    this.nativeStorage.getItem('is_finger').then(data => {
      this.is_finger = data;
    });
    this.nativeStorage.getItem('sessionId')
      .then(res => {
        this.sessionId = res;
        this.getStreets();
        this.getAvatar();
        this.getCustomerSettings();
        this.getHashKey();
      });
    this.createFormChangePin();
    this.createFormChangeCustomer();
    this.createFormChangePassword();
    this.createFormChangeNotification();
  }

  tabsSetting() {
    this.mainService.tabsSetting();
  }

  navTo(e, page) {
    e.preventDefault();
    if(this.navCtrl.getActive().id !== page)
      this.navCtrl.setRoot(page);
  }

  ionViewDidLoad() {
    this.tabsSetting();
  }

  getHashKey(){
    this.headerService.getInfo('getInfo', {sessionId: this.sessionId}).subscribe(data => {
      this.hashKey = data.message.profile.key;
    })
  }

  uploadPhoto(e) {
    if(e.target.files[0]) {
      this.file = e.target.files[0];
      this.reader.readAsDataURL(this.file);
      this.reader.onloadend = () => {
        this.userPhoto = this.reader.result;
        this.extention = this.userPhoto.split(',')[0].split(/,|\/|:|;/)[2];
        this.data = {
          sessionId: this.sessionId,
          base64data: this.userPhoto.split(',')[1],
          extention: this.userPhoto.split(',')[0].split(/,|\/|:|;/)[2]
        };
        localStorage.setItem('userAvatar', 'data:image/png;base64,' + this.userPhoto.split(',')[1],);
        if(this.extention === 'jpg' || this.extention === 'jpeg' || this.extention === 'png'){
          this.is_image = true;
          this.subscription = this.settingService.uploadAvatar('uploadAvatar', this.data).subscribe(data => {
          })
        }
      }
    }
  }

  removePhoto() {
    const modal = this.modalController.create(WarningPopups, {notice: "_DELETE_IMAGE"});
    modal.onDidDismiss((data) => {
      if(data) {
        localStorage.removeItem('userAvatar');
        if(this.userPhoto) {
          this.settingService.removeAvatar('removeAvatar', {sessionId: this.sessionId}).subscribe(data => {
            this.is_image = false;
            this.userPhoto = 'img/placeholder_user.png';
          })
        }
      }
    });
    modal.present();
  }

  private comparePassword(AC: AbstractControl) {
    if(AC.get('new_password').value != AC.get('retry_new_password').value) {
      AC.get('retry_new_password').setErrors({MatchPassword: true})
    } else {
      return null;
    }
  }

  private comparePin(pin, confirm_pin) {
    return (group: FormGroup) => {
      if(group.controls[pin].value === group.controls[confirm_pin].value) {
        return null;
      } else {
        return {'comparePin': true}
      }
    }
  }

  createFormChangeCustomer() {
    this.userForm = this.fb.group({
      userPhoto: [this.user.userPhoto],
      first_name: ['', Validators.compose([
        Validators.required
      ])],
      last_name: ['', Validators.compose([
        Validators.required
      ])],
      first_name_loc: ['', Validators.compose([
        Validators.required
      ])],
      last_name_loc: ['', Validators.compose([
        Validators.required
      ])],
      mobile: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^\d+$/),
        Validators.minLength(6)
      ])],
      email: ['', Validators.compose([
        Validators.email
      ])],
      country: ['', Validators.compose([
        Validators.required
      ])],
      city: ['', Validators.compose([
        Validators.required
      ])],
      street: ['', Validators.compose([
        Validators.required
      ])],
      extra_address: ['', Validators.compose([
        Validators.required
      ])],
      no_courier: false,
      non_georgian_citizen: false,
      language: ['']
    });
  }

  createFormChangePassword() {
    this.passwordForm = this.fb.group({
      current_password: ['', Validators.compose([
        Validators.required
      ])],
      new_password: ['', Validators.compose([
        Validators.required
      ])],
      retry_new_password: ['', Validators.compose([
        Validators.required
      ])]
    }, {
      validator: this.comparePassword
    });
  }

  createFormChangeNotification() {
    this.notificationForm = this.fb.group({
      newpackage: false,
      invoicepay: false,
      sent: false,
      invoicenotpay: false,
      shipped: false,
      companynews: false,
      addfund: false,
      newpackage_sms: false
    });
  }

  createFormChangePin() {
    this.pinForm = this.fb.group({
      pin: ['', Validators.compose([
        Validators.maxLength(4),
        Validators.pattern(/\d{4}/)
      ])],
      confirm_pin: ['', Validators.compose([
        Validators.required
      ])]
    }, {
      validator: this.comparePin('pin', 'confirm_pin')
    });
  }

  submit(e) {
    if(e === 'user'){
      this.data = {
        sessionId: this.sessionId,
        data: JSON.stringify({profile: this.userForm.value})
      };
      this.subscription = this.settingService.changeCustomerSettings('changeCustomerSettings', this.data).subscribe(data => {
        if(data.message.status === 'FAIL') {
          const modal = this.modalController.create(ErrorPopups, {notice: data.message.message});
          modal.present();
          this.subscription.unsubscribe();
        }
        if(data.message.status === 'OK') {
          const modal = this.modalController.create(SuccessPopups);
          modal.present();
          this.subscription.unsubscribe();
        }
      });
    }
    if(e === 'psw'){
      const modal = this.modalController.create(WarningPopups, {notice: notice.change_psw});
      modal.onDidDismiss(data => {
        if(!data) {
          return false;
        }
        this.data = {
          sessionId: this.sessionId,
          data: JSON.stringify({password_change: this.passwordForm.value})
        };
        this.subscription = this.settingService.changeCustomerSettings('changeCustomerSettings', this.data).subscribe(data => {
          this.nativeStorage.remove('sessionId');
          this.navCtrl.setRoot('authorization-page');
        })
      });
      modal.present();
    }
    if(e === 'ntf'){
      this.data = {
        sessionId: this.sessionId,
        data: JSON.stringify({
          notification_settings: {
            email: this.notificationForm.value,
            sms: this.notificationForm.value
          }
        })
      };
      this.subscription = this.settingService.changeCustomerSettings('changeCustomerSettings', this.data).subscribe(data => {
      })
    }
    if(e === 'pin'){
      this.nativeStorage.setItem('hashKey', this.hashKey);
      this.nativeStorage.setItem('pin', this.pinForm.value.pin);
      this.modalController.create(SuccessPopups).present();
    }
  }

  getAvatar() {
    if(localStorage.getItem('userAvatar') !== null){
      this.userPhoto = localStorage.getItem('userAvatar');
      this.subscription = this.settingService.getAvatar('getAvatar', {sessionId: this.sessionId}).subscribe(data => {
        if(data.message.extention === 'jpg' || data.message.extention === 'jpeg' || data.message.extention === 'png') {
          this.userPhoto = 'data:image/png;base64,' + data.message.file;
          if(data.message.file)
            this.is_image = true;
          localStorage.setItem('userAvatar', 'data:image/png;base64,' + data.message.file);
        }
        else
          this.userPhoto = './img/placeholder_user.png';
      });
    } else {
      this.subscription = this.settingService.getAvatar('getAvatar', {sessionId: this.sessionId}).subscribe(data => {
        if(data.message.extention === 'jpg' || data.message.extention === 'jpeg' || data.message.extention === 'png') {
          this.userPhoto = 'data:image/png;base64,' + data.message.file;
          if(data.message.file)
            this.is_image = true;
          localStorage.setItem('userAvatar', 'data:image/png;base64,' + data.message.file);
        }
        else
          this.userPhoto = './img/placeholder_user.png';
      });
    }
  }

  getCustomerSettings() {
    this.subscription = this.settingService.getCustomerSettings('getCustomerSettings', {sessionId: this.sessionId}).subscribe(data => {
      this.userForm.patchValue({
        first_name: data.message.data.profile.first_name,
        last_name: data.message.data.profile.last_name,
        first_name_loc: data.message.data.profile.first_name_loc,
        last_name_loc: data.message.data.profile.last_name_loc,
        country: data.message.data.profile.country,
        city: data.message.data.profile.city,
        mobile: data.message.data.profile.mobile,
        email: data.message.data.profile.email,
        street: data.message.data.profile.street,
        extra_address: data.message.data.profile.extra_address,
        no_courier: -data.message.data.profile.no_courier,
        non_georgian_citizen: -data.message.data.profile.non_georgian_citizen,
        language: this.navParams.data.language
      });
      this.notificationForm.patchValue({
        newpackage: data.message.notifications.newpackage,
        invoicepay: data.message.notifications.invoicepay,
        sent: data.message.notifications.sent,
        invoicenotpay: data.message.notifications.invoicenotpay,
        shipped: data.message.notifications.shipped,
        companynews: data.message.notifications.companynews,
        addfund: data.message.notifications.addfund,
        newpackage_sms: data.message.notifications.newpackage_sms
      });
      this.branch = data.message.data.branch_settings.default_branch;
      this.subscription.unsubscribe();
    })
  }

  getStreets() {
    this.settingService.getStreets('getStreets', {language: this.navParams.data.language}).subscribe(data => {
      this.streetsList = Object.keys(data.message.data).map(key => data.message.data[key]);
    })
  }

  autocomplete(): void {
    this.mainService.autocomplete(this.streetsList, this.getValue.bind(this));
  }

  getValue(event, ui): void {
    if(ui.item)
      this.userForm.patchValue({street: ui.item.value});
  }

  changeBranch(e) {
    this.data = {
      sessionId: this.sessionId,
      data: JSON.stringify({
        branch_settings: {
          default_branch: e.target.value
        }
      })
    };
    this.subscription = this.settingService.changeCustomerSettings('changeCustomerSettings', this.data).subscribe(data => {
    })
  }

  hide() {
    this.mainService.hide();
  }

  setPin(e) {
    this.nativeStorage.setItem('is_pin', e.target.checked);
    this.nativeStorage.setItem('is_finger', false);
  }

  setFinger(e) {
    this.nativeStorage.setItem('is_finger', e.target.checked);
    this.nativeStorage.setItem('is-pin', false);
  }

  ngOnDestroy() {
    if(this.subscription)
      this.subscription.unsubscribe();
  }

}
