import {Component, OnInit, OnDestroy} from '@angular/core';
import { ScriptMainService } from "@core/script.data/script.main.service";
import {
  ArrivedService, AwaitingTrackingService, HeaderService, PendingService, ReceivedService,
  UsaWarehouseService
} from "@core/services";

import { ISidebarNotification }  from "@IFolder/ISidebarNotification";
import { NavController } from "ionic-angular";

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
  notifications: ISidebarNotification = {
    awaitingPackages: 0,
    usaWarehouse: 0,
    pending: 0,
    arrived: 0,
    received: 0
  };

  sessionId: string;

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
    this.headerService.getInfo('getInfo', {sessionId: '9017a521969df545c9e35c391ec89d72'}).subscribe(data => {
      this.notifications.awaitingPackages = data.message.counts.awaiting;
      this.notifications.arrived = data.message.counts.arrived;
      this.notifications.pending = data.message.counts.pending;
      this.notifications.received = data.message.counts.received;
      this.notifications.usaWarehouse = data.message.counts.usa_warehouse;
    });
  }

  ngOnDestroy() {

  }
}
