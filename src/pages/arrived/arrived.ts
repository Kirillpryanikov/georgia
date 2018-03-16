import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {ScriptMainService} from "@core/script.data/script.main.service";
import {CommentPopups} from "@shared/popups/comment-popup-component/comment-popups";
import {InvoicePopups} from "@shared/popups/invoice-popup-component/invoice-popups";
import {InvoiceInfoPopups} from "@shared/popups/invoice-info-popup-component/invoice-info-popups";
import {Subscription} from "rxjs/Subscription";
import {ArrivedService, HeaderService} from "@core/services";
import {NativeStorage} from "@ionic-native/native-storage";
import {CourierSuccessPopups} from "@shared/popups/courier-success-popup-component/courier-success-popups";
import {CourierNotSuccessPopups} from "@shared/popups/courier-not-success-popup-component/courier-not-success-popups";
import {TranslateService} from "@ngx-translate/core";
import {el} from "@angular/platform-browser/testing/src/browser_util";

/**
 * Generated class for the ArrivedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'arrived-page'
})
@Component({
  selector: 'page-arrived',
  templateUrl: 'arrived.html',
})
export class ArrivedPage {

  private subscription: Subscription;
  private data;
  private lang: string;
  private sessionId: string;
  private listArrived;
  private keys = [];
  private ListCities = {};

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private mainService: ScriptMainService,
              private translate: TranslateService,
              private modalController: ModalController,
              private arrivedService: ArrivedService,
              private headerService: HeaderService,
              private nativeStorage: NativeStorage) {
  }

  ionViewDidLoad() {
    this.nativeStorage.getItem('sessionId')
      .then(res => {
        this.sessionId = res;
        this.getInfo();
      });
  }

  initMasonry() {
    this.mainService.initMasonry();
  }

  showCommentPopup(city, index, _index) {
    console.log(city);
    if(city){
      const modal = this.modalController.create(CommentPopups, {package_id: this.ListCities[city][index].trackings[_index].id});
      modal.present();
    }
    else{
      const modal = this.modalController.create(CommentPopups, {package_id: this.listArrived[index].trackings[_index].id});
      modal.present();
    }
  }

  showInvoicePopup(city, index, _index) {
    if(city){
      const modal = this.modalController.create(InvoicePopups, {package_id: this.ListCities[city][index].trackings[_index].id});
      modal.present();
    }else{
      const modal = this.modalController.create(InvoicePopups, {package_id: this.listArrived[index].trackings[_index].id});
      modal.present();
    }
  }

  getInfo() {
    this.subscription = this.headerService.getInfo('getInfo', {sessionId: this.sessionId}).subscribe(data => {
      this.lang = data.message.profile.panel_language;
      this.subscription.unsubscribe();
      this.getArrived();
    })
  }

  showInvoiceInfoPopup(city, index) {
    if(city){
      const modal = this.modalController.create(InvoiceInfoPopups,{invoice: this.ListCities[city][index].invoice});
      modal.present();
    }else{
      const modal = this.modalController.create(InvoiceInfoPopups,{invoice: this.listArrived[index].invoice});
      modal.present();
    }
  }

  expressCourier() {
    this.data = {
      sessionId: this.sessionId,
      action: 'CHECK'
    };
    this.subscription = this.arrivedService.retrieveCourier('retrieveCourier', this.data).subscribe(data => {
      if(data.message.status === 'FAIL') {
        const modal = this.modalController.create(CourierNotSuccessPopups);
        modal.present();
      } else{
        const modal = this.modalController.create(CourierSuccessPopups);
        modal.present();
      }
      this.subscription.unsubscribe();
    });
  }

  getArrived() {
    this.subscription = this.arrivedService.getArrived('getArrived', {sessionId: this.sessionId}).subscribe(data => {
      const keys = Object.keys(data.message.arrived);

      const tmp1_2 = keys.filter(key => !key.match('PREPARING')).map(key => data.message.arrived[key]);

      const tmp2 = tmp1_2.map(val => Object.keys(val).map(key => val[key]));

      this.listArrived = [].concat(...tmp2);

      this.ListCities = keys.filter(key => key.match('PREPARING_')).reduce((obj, city) => {obj[city.split('_')[1]] = []; return obj}, {});

      Object.keys(this.ListCities).forEach(city => {
        const tmp = `PREPARING_${city}`;
        this.ListCities[city].push(...Object.keys(data.message.arrived[tmp]).map(key => data.message.arrived[tmp][key]));
      });

      this.keys = Object.keys(this.ListCities);

      setTimeout(() => {
        this.initMasonry();
      });
    });
  }

}
