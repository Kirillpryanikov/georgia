import {Component, OnInit} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {ArrivedService, TransactionService} from "@core/services";
import {NativeStorage} from "@ionic-native/native-storage";
import {CourierSuccessPopups} from "@shared/popups/courier-success-popup-component/courier-success-popups";
import {CourierNotSuccessPopups} from "@shared/popups/courier-not-success-popup-component/courier-not-success-popups";
import {Subscription} from "rxjs/Subscription";
import {ErrorPopups} from "@shared/popups/error-popup-component/error-popups";

/**
 * Generated class for the TransactionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'transaction-page'
})
@Component({
  selector: 'page-transaction',
  templateUrl: 'transaction.html',
})
export class TransactionPage implements OnInit{
  private listTransaction;
  public logoWrapper = '_TRANSACTIONS';
  private data;
  private block;
  private subscription: Subscription;
  private sessionId: string;
  private active = 'transaction';
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private transactionService: TransactionService,
              private modalController: ModalController,
              private arrivedService: ArrivedService,
              private nativeStorage: NativeStorage) {
  }

  ngOnInit() {
    this.nativeStorage.getItem('sessionId')
      .then(res => {
        this.sessionId = res;
        this.getTransactions();
      });
  }

  navTo(e, page) {
    e.preventDefault();
    if(this.navCtrl.getActive().id !== page)
      this.navCtrl.setRoot(page);
  }

  getTransactions() {
    this.transactionService.getTransactions('getTransactions', {sessionId: this.sessionId}).subscribe(data => {
      this.listTransaction = data.message.data;
    })
  }

  expressCourier() {
    this.block = true;
    this.data = {
      sessionId: this.sessionId,
      action: 'CHECK'
    };
    this.subscription = this.arrivedService.retrieveCourier('retrieveCourier', this.data).subscribe(data => {
      if(data.error){
        const modal = this.modalController.create(ErrorPopups);
        modal.present();
        this.block = false;
      } else {
        if(data.message.status === 'FAIL') {
          const modal = this.modalController.create(CourierNotSuccessPopups, {msg: data.message.message});
          modal.present();
          this.block = false;
        } else if(data.message.status === 'PROCESS'){
          const modal = this.modalController.create(CourierSuccessPopups, {msg: data.message.address, chargeable: data.message.chargeable});
          modal.present();
          this.block = false;
        } else {
          const modal = this.modalController.create(ErrorPopups, {notice: data.message.message});
          modal.present();
          this.block = false;
        }
      }
      this.subscription.unsubscribe();
    });
  }

  invoice(e, invoice) {
    e.preventDefault();
    this.navCtrl.push('invoice-page',{invoice: invoice});
  }

  // goTo(e) {
  //   switch (e){
  //     case 'INVOICE_PAYMENT':
  //       this.navCtrl.setRoot('deposite-page');
  //       break;
  //     case 'EXPRESS_COURIER_SERVICE_CHARGE':
  //     case 'COURIER_SERVICE_CHARGE':
  //       this.expressCourier();
  //       break;
  //     case 'ADD_FUND':
  //       this.navCtrl.setRoot('page-awaiting-tracking');
  //       break;
  //   }
  // }
}
