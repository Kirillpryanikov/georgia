import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AwaitingTrackingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: "page-awaiting-tracking"
})
@Component({
  selector: 'page-awaiting-tracking',
  templateUrl: 'awaiting-tracking.html',
})
export class AwaitingTrackingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AwaitingTrackingPage');
  }

}
