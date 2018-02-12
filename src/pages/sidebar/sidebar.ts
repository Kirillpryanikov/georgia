import { Component, OnInit, OnDestroy } from '@angular/core';
import { ScriptMainService } from "@core/script.data/script.main.service";
import {
  ArrivedService, AwaitingTrackingService, PendingService, ReceivedService,
  UsaWarehouseService
} from "@core/services";

import { ISidebarNotification }  from "@IFolder/ISidebarNotification";

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
    awaitingPackages: 13,
    usaWarehouse: 8,
    pending: 6,
    arrived: 5,
    received: 9
  };

  sessionId: string;

  constructor(public mainService: ScriptMainService,
              private awaitingTrackingService: AwaitingTrackingService,
              private usaWarehouseService: UsaWarehouseService,
              private receivedService: ReceivedService,
              private arrivedService: ArrivedService,
              private pendingSevice: PendingService) {}

  ngOnInit() {
    this.initdropdown();
    // this.getAwaiting();
    // this.getReceived();
    // this.getUsaWarehouse();
    // this.getArrived();
    // this.getPending();
    // Todo run this functions after create API
  }

  initdropdown() {
    this.mainService.dropdown();
  }

  getAwaiting() {
    this.awaitingTrackingService.getAwaiting(this.sessionId).subscribe(data => {
      this.notifications.awaitingPackages = data.length();
    })
  }

  getUsaWarehouse() {
    this.usaWarehouseService.getUsaWarehouse().subscribe(data => {
      this.notifications.usaWarehouse = data.length();
    })
  }

  getReceived() {
    this.receivedService.getReceived().subscribe(data => {
      this.notifications.received = data.length();
    })
  }

  getArrived() {
    this.arrivedService.getArrived().subscribe(data => {
      this.notifications.arrived = data.length();
    })
  }

  getPending() {
    this.pendingSevice.getPending().subscribe(data => {
      this.notifications.pending = data.length();
    })
  }

  ngOnDestroy() {

  }
}
