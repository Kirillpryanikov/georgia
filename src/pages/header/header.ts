import { Component, OnInit, OnDestroy } from '@angular/core';
import { ScriptMainService } from "@core/script.data/script.main.service";
import { NavController } from "ionic-angular";

/**
 * Generated class for the HeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'header-page',
  templateUrl: 'header.html'
})
export class HeaderPage implements OnInit, OnDestroy{

  notification: number = 2;
  unpaid_invoice: number = 8;
  undeclared_tracking: number = 4;
  visible: boolean = false;

  constructor(public mainService: ScriptMainService,
              public navCtrl: NavController) {}

  ngOnInit() {
    this.initdropdown();
  }

  initdropdown() {
    this.mainService.dropdown();
  }

  settings(e) {
    e.preventDefault();
    this.navCtrl.push('settings-page');
  }

  hide() {
    this.visible = !this.visible;
    this.mainService.hideDropdown();
  }

  ngOnDestroy() {

  }

}
