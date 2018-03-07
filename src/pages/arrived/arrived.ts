import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {ScriptMainService} from "@core/script.data/script.main.service";
import {CommentPopups} from "@shared/popups/comment-popup-component/comment-popups";
import {InvoicePopups} from "@shared/popups/invoice-popup-component/invoice-popups";
import {InvoiceInfoPopups} from "@shared/popups/invoice-info-popup-component/invoice-info-popups";
import {Subscription} from "rxjs/Subscription";
import {ArrivedService} from "@core/services";
import {NativeStorage} from "@ionic-native/native-storage";

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
  private sessionId: string;
  private listArrived;
  private keys = [];
  private ListCities = {};

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private mainService: ScriptMainService,
              private modalController: ModalController,
              private arrivedService: ArrivedService,
              private nativeStorage: NativeStorage) {
  }

  ionViewDidLoad() {
    this.nativeStorage.getItem('sessionId')
      .then(res => {
        this.sessionId = res;
        this.getArrived();
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

  showInvoiceInfoPopup(city, index) {
    if(city){
      const modal = this.modalController.create(InvoiceInfoPopups,{invoice: this.ListCities[city][index].invoice});
      modal.present();
    }else{
      const modal = this.modalController.create(InvoiceInfoPopups,{invoice: this.listArrived[index].invoice});
      modal.present();
    }
  }

  getArrived() {
    this.subscription = this.arrivedService.getArrived('getArrived', {sessionId: this.sessionId}).subscribe(data => {

      const keys = Object.keys(data.message.arrived);

      const tmp1_2 = keys.filter(key => !key.match('PREPARING')).map(key => data.message.arrived[key]);

      const tmp2 = tmp1_2.map(val => Object.keys(val).map(key => val[key]));

      this.listArrived = [].concat(...tmp2);
      for(let i in this.listArrived) {
        switch (this.listArrived[i].branch){
          case 'OFFICE_1':
            this.listArrived[i].branch = 'Mickevichi Branch';
            break;
          case 'OFFICE_2':
            this.listArrived[i].branch = 'Digomi Branch';
            break;
          case 'OFFICE_3':
            this.listArrived[i].branch = 'Vaja-Pshavela Branch';
            break;
          case 'OFFICE_4':
            this.listArrived[i].branch = 'Gldani Branch';
            break;
          case 'OFFICE_5':
            this.listArrived[i].branch = 'Isani Branch';
            break;
          case 'OFFICE_6':
            this.listArrived[i].branch = 'Vake Branch';
            break;
        }
      }

      this.ListCities = keys.filter(key => key.match('PREPARING_')).reduce((obj, city) => {obj[city.split('_')[1]] = []; return obj}, {});

      Object.keys(this.ListCities).forEach(city => {
        const tmp = `PREPARING_${city}`;
        this.ListCities[city].push(...Object.keys(data.message.arrived[tmp]).map(key => data.message.arrived[tmp][key]));
        for(let i in this.ListCities[city]) {
          switch (this.ListCities[city][i].branch){
            case 'OFFICE_1':
              this.ListCities[city][i].branch = 'Mickevichi Branch';
              break;
            case 'OFFICE_2':
              this.ListCities[city][i].branch = 'Digomi Branch';
              break;
            case 'OFFICE_3':
              this.ListCities[city][i].branch = 'Vaja-Pshavela Branch';
              break;
            case 'OFFICE_4':
              this.ListCities[city][i].branch = 'Gldani Branch';
              break;
            case 'OFFICE_5':
              this.ListCities[city][i].branch = 'Isani Branch';
              break;
            case 'OFFICE_6':
              this.ListCities[city][i].branch = 'Vake Branch';
              break;
          }
        }
      });

      this.keys = Object.keys(this.ListCities);

      setTimeout(() => {
        this.initMasonry();
      });
    });
  }

}
