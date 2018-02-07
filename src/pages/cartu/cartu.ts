import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ScriptMainService } from "@core/script.data/script.main.service";

/**
 * Generated class for the CartuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'cartu-page'
})
@Component({
  selector: 'page-cartu',
  templateUrl: 'cartu.html',
})
export class CartuPage implements OnInit, OnDestroy{

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public mainService: ScriptMainService) {
  }

  ngOnInit() {
    this.initdropdown()
  }

  initdropdown() {
    this.mainService.dropdown();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartuPage');
  }

  ngOnDestroy() {

  }
}
