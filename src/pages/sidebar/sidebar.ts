import {Component, OnInit, OnDestroy} from '@angular/core';
import { ScriptMainService } from "@core/script.data/script.main.service";
import {
  ArrivedService, AwaitingTrackingService, HeaderService, PendingService, ReceivedService,
  UsaWarehouseService
} from "@core/services";

import { ISidebarNotification }  from "@IFolder/ISidebarNotification";
import { NavController } from "ionic-angular";
import {Subscription} from "rxjs/Subscription";

/**
 * Generated class for the SidebarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'sidebar-page',
  templateUrl: 'sidebar.html'
})
export class SidebarPage implements OnInit, OnDestroy{
  sessionId = '707d235b00280e693eab0496acb2690d';
  private subscription: Subscription;
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
              private headerService: HeaderService) {}

  ngOnInit() {
    this.getInfo();
  }

  awaitingPackages(e) {
    e.preventDefault();
    this.navCtrl.setRoot('page-awaiting-tracking');
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

  getInfo() {
    this.subscription = this.headerService.getInfo('getInfo', {sessionId: this.sessionId}).subscribe(data => {
      this.notifications.awaitingPackages = data.message.counts.awaiting;
      this.notifications.arrived = data.message.counts.arrived;
      this.notifications.pending = data.message.counts.pending;
      this.notifications.received = data.message.counts.received;
      this.notifications.usaWarehouse = data.message.counts.usa_warehouse;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
