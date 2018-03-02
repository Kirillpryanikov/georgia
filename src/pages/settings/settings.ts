import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ScriptMainService } from "@core/script.data/script.main.service";
import { AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import { IUserSetings } from "@IFolder/IUserSettings";
import { IPassword } from "@IFolder/IPassword";
import { SettingService } from "@core/services/setting";
import 'rxjs/add/operator/map';
import {INotificationSettings} from "@IFolder/INotificationSettings";
import {Subscription} from "rxjs/Subscription";

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
  private sessionId = '707d235b00280e693eab0496acb2690d';
  private data: Object;
  private streetsList: Array<string>;
  private subscription: Subscription;
  private branch: string;
  userForm: FormGroup;
  passwordForm: FormGroup;
  notificationForm: FormGroup;
  file: any;

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
    userPhoto: ''
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
              public navParams: NavParams,
              private mainService: ScriptMainService,
              private fb: FormBuilder,
              private reader: FileReader,
              private settingService: SettingService) {
  }

  ngOnInit() {
    this.getStreets();
    this.createFormChangeCustomer();
    this.createFormChangePassword();
    this.createFormChangeNotification();
    this.getAvatar();
    this.getCustomerSettings();
  }

  tabsSetting() {
    this.mainService.tabsSetting();
  }

  ionViewDidLoad() {
    this.tabsSetting();
  }

  uploadPhoto(e) {
    if(e.target.files[0]) {
      this.file = e.target.files[0];
      this.reader.readAsDataURL(this.file);
      this.reader.onloadend = () => {
        this.userPhoto = this.reader.result;
        this.data = {
          sessionId: this.sessionId,
          base64data: this.userPhoto.split(',')[1],
          extention: this.userPhoto.split(',')[0].split(/,|\/|:|;/)[2]
        };
        this.subscription = this.settingService.uploadAvatar('uploadAvatar', this.data).subscribe(data => {
        })
      }
    }
  }

  removePhoto() {
    if(this.userPhoto) {
      this.settingService.removeAvatar('removeAvatar', {sessionId: this.sessionId}).subscribe(data => {
        this.userPhoto = null;
      })
    }

  }

  private comparePassword(AC: AbstractControl) {
    if(AC.get('new_password').value != AC.get('retry_new_password').value) {
      AC.get('retry_new_password').setErrors({MatchPassword: true})
    } else {
      return null;
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

  submit(e) {
    if(e === 'user'){
      this.data = {
        sessionId: this.sessionId,
        data: JSON.stringify({profile: this.userForm.value})
      };
      this.subscription = this.settingService.changeCustomerSettings('changeCustomerSettings', this.data).subscribe(data => {
      });
    }
    if(e === 'psw'){
      this.data = {
        sessionId: this.sessionId,
        data: JSON.stringify({password_change: this.passwordForm.value})
      };
      this.subscription = this.settingService.changeCustomerSettings('changeCustomerSettings', this.data).subscribe(data => {
        this.subscription.unsubscribe();
      })
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
        this.subscription.unsubscribe();
      })
    }
  }

  getAvatar() {
    this.subscription = this.settingService.getAvatar('getAvatar', {sessionId: this.sessionId}).subscribe(data => {
      this.userPhoto = 'data:image/' + data.message.extention + ';base64,' + data.message.file;
    });
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

  ngOnDestroy() {

  }

}
