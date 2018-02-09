import { Component, OnInit, OnDestroy } from '@angular/core';
import { ScriptMainService } from "@core/script.data/script.main.service";
import { NavController } from "ionic-angular";
import {TranslateService} from "@ngx-translate/core";

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
  private lang: string;

  constructor(public mainService: ScriptMainService,
              public navCtrl: NavController,
              private translate: TranslateService,) {}

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

  changeLanguage(language:string) {
    this.mainService.hideDropdown();
    this.lang = language;
    this.translate.use(language)
  }

  ngOnDestroy() {

  }

}
