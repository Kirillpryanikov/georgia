import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ScriptMainService } from "@core/script.data/script.main.service";
import { AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import { IUserSetings } from "@IFolder/IUserSettings";
import { IPassword } from "@IFolder/IPassword";
import { SettingService } from "@core/services/setting";
import 'rxjs/add/operator/map';
import {INotificationSettings} from "@IFolder/INotificationSettings";

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
    email: 'tring',
    firstName: 'string',
    firstNameGeorgian: 'string',
    lastName: "van",
    lastNameGeorgian: 'GOgi',
    userPhoto: 'img/settings-profile-photo.png'
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
    this.createFormChangeCustomer();
    this.createFormChangePassword();
    this.createFormChangeNotification();
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
        console.log(this.userPhoto)
      }
    }
  }

  removePhoto() {
    if(this.userPhoto) {
      this.userPhoto = null;
    }

  }

  private comparePassword(AC: AbstractControl) {
    if(AC.get('newPassword').value != AC.get('confirmPassword').value) {
      AC.get('confirmPassword').setErrors({MatchPassword: true})
    } else {
      return null;
    }
  }

  createFormChangeCustomer() {
    this.userForm = this.fb.group({
      userPhoto: [this.user.userPhoto],
      firstName: ['', Validators.compose([
        Validators.required
      ])],
      lastName: ['', Validators.compose([
        Validators.required
      ])],
      firstNameGeorgian: ['', Validators.compose([
        Validators.required
      ])],
      lastNameGeorgian: ['', Validators.compose([
        Validators.required
      ])],
      cellPhone: ['', Validators.compose([
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
      address_1: ['', Validators.compose([
        Validators.required
      ])],
      address_2: ['', Validators.compose([
        Validators.required
      ])],
      checkbox1: false,
      checkbox2: false
    });
  }

  createFormChangePassword() {
    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.compose([
        Validators.required
      ])],
      newPassword: ['', Validators.compose([
        Validators.required
      ])],
      confirmPassword: ['', Validators.compose([
        Validators.required
      ])]
    }, {
      validator: this.comparePassword
    });
  }

  createFormChangeNotification() {
    this.notificationForm = this.fb.group({
      receivingOfPackageInUsa: true,
      invoicePayments: true,
      packageSent: true,
      insufficientFunds: true,
      packageDelivered: true,
      companyNewsAndPromotions: true,
      addFunds: true,
      receivingOfPackageInUsaSms: true
    });
  }

  submit(e) {
    if(e === 'user'){
      this.user = this.userForm.value;
      this.user.userPhoto = this.userPhoto;
      console.log(this.user);
      // this.settingService.changeCustomerSettings(this.user).subscribe(data => {
      //
      // })
    }
    if(e === 'psw'){
      this.password = this.passwordForm.value;
      console.log(this.password);
      // this.settingService.changeCustomerSettings(this.password).subscribe(data => {
      //
      // })
    }
    if(e === 'ntf'){
      this.notification = this.notificationForm.value;
      console.log(this.notification);
      // this.settingService.changeCustomerSettings(this.notification).subscribe(data => {
      //
      // })
    }
  }

  ngOnDestroy() {

  }

}
