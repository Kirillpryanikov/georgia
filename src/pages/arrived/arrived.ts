import {Component, OnDestroy} from '@angular/core';
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
import {ErrorPopups} from "@shared/popups/error-popup-component/error-popups";

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
export class ArrivedPage implements OnDestroy{

  private subscription: Subscription;
  public logoWrapper = '_ARRIVED';
  public active = 'arrived';
  private data;
  private lang: string;
  private sessionId: string;
  private listArrived;
  private block: boolean = false;
  private keys = [];
  private listCourier = [];

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

  showCommentPopup(courier, index, _index) {
    if(courier){
      const modal = this.modalController.create(CommentPopups, {package_id: this.listCourier[index].trackings[_index].id});
      modal.present();
    }
    else{
      const modal = this.modalController.create(CommentPopups, {package_id: this.listArrived[index].trackings[_index].id});
      modal.present();
    }
  }

  showInvoicePopup(courier, index, _index) {
    if(courier){
      const modal = this.modalController.create(InvoicePopups, {package_id: this.listCourier[index].trackings[_index].id});
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

  showInvoiceInfoPopup(courier, index) {
    if(courier){
      const modal = this.modalController.create(InvoiceInfoPopups,{invoice: this.listCourier[index].invoice});
      modal.present();
    }else{
      const modal = this.modalController.create(InvoiceInfoPopups,{invoice: this.listArrived[index].invoice});
      modal.present();
    }
  }

  expressCourier() {
    this.block = true;
    this.data = {
      sessionId: this.sessionId,
      action: 'CHECK'
    };
    this.subscription = this.arrivedService.retrieveCourier('retrieveCourier', this.data).subscribe(data => {
      console.log(data);
      if(data.error){
        const modal = this.modalController.create(ErrorPopups);
        modal.present();
        this.block = false;
      } else {
        if(data.message.status === 'FAIL') {
          const modal = this.modalController.create(CourierNotSuccessPopups);
          modal.present();
          this.block = false;
        } else{
          const modal = this.modalController.create(CourierSuccessPopups);
          modal.present();
          this.block = false;
        }
      }
      this.subscription.unsubscribe();
    });
  }

  getArrived() {
    this.subscription = this.arrivedService.getArrived('getArrived', {sessionId: this.sessionId}).subscribe(data => {
      const keys = Object.keys(data.message.arrived);
      for (let i in keys){
        if(keys[i] === "COURIER")
          this.keys.push(keys[i])
      }

      this.listArrived = Object.keys(data.message.arrived.NONE).map(key => data.message.arrived.NONE[key]);
      this.listCourier = Object.keys(data.message.arrived.COURIER).map(key => data.message.arrived.COURIER[key]);

      setTimeout(() => {
        this.initMasonry();
      });
    });
  }

  ngOnDestroy() {
    if(this.subscription)
      this.subscription.unsubscribe();
  }

}
