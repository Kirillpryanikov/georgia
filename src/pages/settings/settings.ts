import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ScriptMainService } from "@core/script.data/script.main.service";

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'settings-page'
})
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage implements OnInit, OnDestroy{

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private mainService: ScriptMainService) {
  }

  ngOnInit() {

  }

  tabsSetting() {
    this.mainService.tabsSetting();
  }

  ionViewDidLoad() {
    this.tabsSetting();
  }

  ngOnDestroy() {

  }

}
