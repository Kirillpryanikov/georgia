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
  private sessionId = '707d235b00280e693eab0496acb2690d';
  private listArrived;
  private ListCities = {};

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private mainService: ScriptMainService,
              private modalController: ModalController,
              private arrivedService: ArrivedService,
              private nativeStorage: NativeStorage) {
  }

  ionViewDidLoad() {
    this.nativeStorage.getItem('sessionid').then(res => {
      this.sessionId = res;
      this.getArrived();
    });
  }

  initMasonry() {
    this.mainService.initMasonry();
  }

  showCommentPopup(index) {
    const modal = this.modalController.create(CommentPopups);
    modal.present();
  }

  showInvoicePopup(index) {
    const modal = this.modalController.create(InvoicePopups);
    modal.present();
  }

  showInvoiceInfoPopup(index) {
    const modal = this.modalController.create(InvoiceInfoPopups);
    modal.present();
  }

  getArrived() {
    this.subscription = this.arrivedService.getArrived('getArrived', {sessionId: this.sessionId}).subscribe(data => {

      data.message.arrived = {
        NONE: {
          12412412: {
            hawb: 'H1'
          },
          12451235: {
            hawb: 'H2'
          }
        },
        ARRIVED: {
          124: {
            hawb: 'H#'
          }
        },
        PREPARING_ABASA: {
          124124: {
            hawb: 'H4'
          },
          214124: {
            hawb: 'H5'
          }
        },
        PREPARING_TEST: {
          4124: {
            hawb: 'H7'
          }
        }
      };

      const keys = Object.keys(data.message.arrived);

      const tmp1_2 = keys.filter(key => !key.match('PREPARING')).map(key => data.message.arrived[key]);

      const tmp2 = tmp1_2.map(val => Object.keys(val).map(key => val[key]));

      this.listArrived = [].concat(...tmp2);

      this.ListCities = keys.filter(key => key.match('PREPARING_')).reduce((obj, city) => {obj[city.split('_')[1]] = []; return obj}, {});
      Object.keys(this.ListCities).forEach(city => {
        const tmp = `PREPARING_${city}`;
        this.ListCities[city].push(...Object.keys(data.message.arrived[tmp]).map(key => data.message.arrived[tmp][key]))
      });
      this.ListCities['keys'] = Object.keys(this.ListCities);

      console.log(this.ListCities);

      setTimeout(() => {
        this.initMasonry();
      });

      console.log(data);
    });
  }

}
