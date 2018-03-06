import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TransactionService} from "@core/services";
import {NativeStorage} from "@ionic-native/native-storage";

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
  private sessionId: string;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private transactionService: TransactionService,
              private nativeStorage: NativeStorage) {
  }

  ngOnInit() {
    this.nativeStorage.getItem('sessionId')
      .then(res => {
        this.sessionId = res;
        this.getTransactions();
      });
  }

  ionViewDidLoad() {

  }

  getTransactions() {
    this.transactionService.getTransactions('getTransactions', {sessionId: this.sessionId}).subscribe(data => {
      this.listTransaction = data.message.data;
      console.log(data)
    })
  }

}
