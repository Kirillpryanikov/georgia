import {Component, OnInit, OnDestroy} from '@angular/core';
import { ScriptMainService } from "@core/script.data/script.main.service";
import {
  ArrivedService, AwaitingTrackingService, HeaderService, PendingService, ReceivedService,
  UsaWarehouseService
} from "@core/services";

import { ISidebarNotification }  from "@IFolder/ISidebarNotification";
import {ModalController, NavController} from "ionic-angular";
import {Subscription} from "rxjs/Subscription";
import {NativeStorage} from "@ionic-native/native-storage";
import {AddressPopups} from "@shared/popups/address-popup-component/address-popups";
import {DetailsPopups} from "@shared/popups/details-popup-component/details-popups";
import {BarcodePopups} from "@shared/popups/barcode-popup-component/barcode-popups";

/**
 * Generated class for the SidebarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'sidebar-page',
  templateUrl: 'sidebar.html',
  inputs: ['active', 'ntf']
})
export class SidebarPage implements OnInit, OnDestroy{
  private sessionId: string;
  private subscription: Subscription;
  public active: string;
  public ntf;
  public userBalance;
  public sms_code;
  notifications: ISidebarNotification = {
    awaitingPackages: 0,
    usaWarehouse: 0,
    pending: 0,
    arrived: 0,
    received: 0
  };

  constructor(public mainService: ScriptMainService,
              private navCtrl: NavController,
              private awaitingTrackingService: AwaitingTrackingService,
              private usaWarehouseService: UsaWarehouseService,
              private receivedService: ReceivedService,
              private arrivedService: ArrivedService,
              private pendingSevice: PendingService,
              private headerService: HeaderService,
              private nativeStorage: NativeStorage,
              private modalController: ModalController) {}

  ngOnInit() {
    this.nativeStorage.getItem('sessionId')
      .then(res => {
        this.sessionId = res;
        this.getInfo();
      });
  }

  awaitingPackages(e) {
    e.preventDefault();
    this.navCtrl.setRoot('page-awaiting-tracking');
  }

  details() {
    this.mainService.hideDropdown();
    const modal = this.modalController.create(DetailsPopups);
    modal.present();
  }

  usaWarehouse(e) {
    e.preventDefault();
    this.navCtrl.setRoot('usa-warehouse-page');
  }

  pending(e) {
    e.preventDefault();
    this.navCtrl.setRoot('pending-page');
  }

  arrived(e) {
    e.preventDefault();
    this.navCtrl.setRoot('arrived-page');
  }

  received(e) {
    e.preventDefault();
    this.navCtrl.setRoot('received-page');
  }

  usaAddress(e) {
    this.mainService.hideDropdown();
    const modal = this.modalController.create(AddressPopups);
    modal.present();  }

  transactions(e) {
    e.preventDefault();
    this.navCtrl.setRoot('transaction-page')
  }

  settings(e) {
    e.preventDefault();
    this.navCtrl.setRoot('settings-page')
  }

  logout(e) {
    e.preventDefault();
    this.nativeStorage.remove('sessionId');
    this.navCtrl.setRoot('authorization-page');
  }

  isActive(item) {
    return this.active === item;
  };

  getInfo() {
    this.subscription = this.headerService.getInfo('getInfo', {sessionId: this.sessionId}).subscribe(data => {
      this.notifications.awaitingPackages = data.message.counts.awaiting;
      this.notifications.arrived = data.message.counts.arrived;
      this.notifications.pending = data.message.counts.pending;
      this.notifications.received = data.message.counts.received;
      this.notifications.usaWarehouse = data.message.counts.usa_warehouse;
      this.userBalance = data.message.profile.balance;
      this.sms_code = data.message.profile.sms_code;
    });
  }

  showBarcode() {
    this.mainService.hideDropdown();
    const modal = this.modalController.create(BarcodePopups, {sms_code: this.sms_code});
    modal.present();
  }

  ngOnDestroy() {
    if(this.subscription)
      this.subscription.unsubscribe();
  }
}
