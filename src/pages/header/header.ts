import { Component, OnInit, OnDestroy } from '@angular/core';
import { ScriptMainService } from "@core/script.data/script.main.service";
import {ModalController, NavController} from "ionic-angular";
import { TranslateService } from "@ngx-translate/core";
import { HeaderService } from "@core/services";

import { IUserHeader } from "@IFolder/IUserHeader";
import { INotification }  from "@IFolder/INotification";
import {DetailsPopups} from "@shared/popups/details-popup-component/details-popups";

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
  private user: IUserHeader = {
    userId: '1',
    userPhoto: '/img/Grey-Mens-Hair-WE.png',
    userName: 'Konstantin Dugladze',
    email: 'dugladze@gmail.com',
    userCode: 'U00100',
    userBalance: '-1224.05 GEL'
  };
  private notification: INotification = {
    notifications: 18,
    unpaid_invoice: 23,
    undeclared_tracking: 104
  };
  private lang: string;

  constructor(public mainService: ScriptMainService,
              public navCtrl: NavController,
              private translate: TranslateService,
              private headerService: HeaderService,
              private modalController: ModalController) {}

  ngOnInit() {
    // this.getInfo();
    // this.getNotification();
    // Todo run this functions after create API
  }

  getInfo() {
    this.headerService.getInfo().subscribe(data => {
      this.user = data;
    })
  }

  getNotification() {
    this.headerService.getNotification().subscribe(data => {
      this.notification = data;
    })
  }

  loadLanguagePack() {
    this.headerService.loadLanguagePack().subscribe(data => {
      this.lang = data
    })
  }

  settings(e) {
    e.preventDefault();
    this.navCtrl.setRoot('settings-page');
  }

  changeLanguage(language:string) {
    this.mainService.hideDropdown();
    this.lang = language;
    this.translate.use(language);
    // this.loadLanguagePack();
  }

  arrived(e) {
    e.preventDefault();
    this.navCtrl.setRoot('arrived-page');
  }

  transaction(e) {
    e.preventDefault();
    this.navCtrl.setRoot('transaction-page')
  }

  details() {
    this.mainService.hideDropdown();
    const modal = this.modalController.create(DetailsPopups);
    modal.present();
  }

  ngOnDestroy() {

  }

}
