import {Component, OnInit, OnDestroy, EventEmitter} from '@angular/core';
import { ScriptMainService } from "@core/script.data/script.main.service";
import { ModalController, NavController } from "ionic-angular";
import { TranslateService } from "@ngx-translate/core";
import {HeaderService, SettingService} from "@core/services";

import { IUserHeader } from "@IFolder/IUserHeader";
import { INotification }  from "@IFolder/INotification";
import { DetailsPopups } from "@shared/popups/details-popup-component/details-popups";
import { AddressPopups } from "@shared/popups/address-popup-component/address-popups";
import { Subscription } from "rxjs/Subscription";
import {NativeStorage} from "@ionic-native/native-storage";

/**
 * Generated class for the HeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'header-page',
  templateUrl: 'header.html',
  outputs: ['branchSelection']
})
export class HeaderPage implements OnInit, OnDestroy{
  private sessionId;
  private data;
  private subscription: Subscription;
  private user: IUserHeader = {
    userId: '',
    userPhoto: '',
    userName: '',
    email: '',
    userCode: '',
    userBalance: ''
  };
  private notification: INotification = {
    notifications: 0,
    unpaid_invoice: 0,
    undeclared_tracking: 0
  };
  private lang: string;
  public branchSelection = new EventEmitter<any>();

  constructor(public mainService: ScriptMainService,
              public navCtrl: NavController,
              private translate: TranslateService,
              private headerService: HeaderService,
              private modalController: ModalController,
              private settingService: SettingService,
              private nativeStorage: NativeStorage) {}

  ngOnInit() {
    this.nativeStorage.getItem('sessionId')
      .then(res => {
        this.sessionId = res;
        this.getAvatar();
        this.getInfo();
        this.getNotifications();
      });
  }

  getAvatar() {
    this.subscription = this.settingService.getAvatar('getAvatar', {sessionId: this.sessionId}).subscribe(data => {
      this.user.userPhoto = 'data:image/png;base64,' + data.message.file;
    });
  }

  getBranchSelection(data) {
    this.branchSelection.emit(data);
  }

  getInfo() {
    this.subscription = this.headerService.getInfo('getInfo', {sessionId: this.sessionId}).subscribe(data => {
      this.getBranchSelection(data);
      this.user.userName = data.message.profile.first_name + ' ' + data.message.profile.last_name;
      this.user.email = data.message.profile.email;
      this.user.userCode = data.message.profile.suite;
      this.user.userBalance = data.message.profile.balance;
      this.lang = data.message.profile.panel_language;
      this.subscription.unsubscribe();
    })
  }

  getNotifications() {
    this.headerService.getNotifications('getNotifications', {sessionId: this.sessionId}).subscribe(data => {
      this.notification.unpaid_invoice = data.message.un_uploaded_invoices.count;
      this.notification.undeclared_tracking = data.message.undeclared_trackings.count;
      this.notification.notifications = parseInt(data.message.un_uploaded_invoices.count) + parseInt(data.message.undeclared_trackings.count);
    })
  }

  settings(e) {
    e.preventDefault();
    this.navCtrl.setRoot('settings-page', {language: this.lang});
  }

  changeLanguage(language:string) {
    this.mainService.hideDropdown();
    this.lang = language;
    this.translate.use(language);
    this.data = {
      sessionId: this.sessionId,
      language: language
    };
    this.headerService.changeLanguage('changeLanguage', this.data).subscribe(data => {
      this.getInfo();
    })
  }

  arrived(e) {
    e.preventDefault();
    this.navCtrl.setRoot('arrived-page');
  }

  awaiting(e) {
    e.preventDefault();
    this.navCtrl.setRoot('page-awaiting-tracking')
  }

  transaction(e) {
    e.preventDefault();
    this.navCtrl.setRoot('transaction-page')
  }

  details() {
    this.mainService.hideDropdown();
    const modal = this.modalController.create(DetailsPopups);
    modal.present();
  }

  usaAddress() {
    this.mainService.hideDropdown();
    const modal = this.modalController.create(AddressPopups);
    modal.present();
  }

  logout(e) {
    e.preventDefault();
    this.nativeStorage.remove('sessionId');
    this.navCtrl.setRoot('authorization-page');
  }

  ngOnDestroy() {

  }

}
