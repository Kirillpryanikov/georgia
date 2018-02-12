import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ScriptMainService} from "@core/script.data/script.main.service";

/**
 * Generated class for the TbcPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'tbc-page'
})
@Component({
  selector: 'page-tbc',
  templateUrl: 'tbc.html',
})
export class TbcPage implements OnInit, OnDestroy{

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public mainService: ScriptMainService) {
  }

  ngOnInit() {

  }

  ngOnDestroy() {

  }
}
