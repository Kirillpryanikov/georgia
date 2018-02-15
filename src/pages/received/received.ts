import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ScriptMainService} from "@core/script.data/script.main.service";

/**
 * Generated class for the ReceivedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'received-page'
})
@Component({
  selector: 'page-received',
  templateUrl: 'received.html',
})
export class ReceivedPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private mainService: ScriptMainService) {
  }

  ionViewDidLoad() {
    this.initMasonry();
  }

  initMasonry() {
    this.mainService.initMasonry();
  }

  invoice(e) {
    e.preventDefault();
    this.navCtrl.push('invoice-page');
  }

}
