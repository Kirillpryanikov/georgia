import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ScriptMainService} from "@core/script.data/script.main.service";

/**
 * Generated class for the DepositePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'deposite-page'
})
@Component({
  selector: 'page-deposite',
  templateUrl: 'deposite.html',
})
export class DepositePage implements OnInit, OnDestroy{

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public registerService: ScriptMainService) {
  }

  ngOnInit() {
    this.initDropdown();
  }

  initDropdown() {
    this.registerService.dropdown();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DepositePage');
  }

  ngOnDestroy(){

  }

}
