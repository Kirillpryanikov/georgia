import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';

/**
 * Generated class for the SetPincodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'page-set-pin'
})
@Component({
  selector: 'page-set-pincode',
  templateUrl: 'set-pincode.html',
})
export class SetPincodePage {
  @ViewChild('slider') slider: Slides;
  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SetPincodePage');
  }

}
