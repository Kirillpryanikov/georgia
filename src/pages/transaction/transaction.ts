import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TransactionService} from "@core/services";

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
export class TransactionPage {
  private data;
  private listTransaction;
  private sessionId: string = '707d235b00280e693eab0496acb2690d';
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private transactionService: TransactionService) {
  }

  ionViewDidLoad() {
    this.getTransactions();
  }

  getTransactions() {
    this.transactionService.getTransactions('getTransactions', {sessionId: this.sessionId}).subscribe(data => {
      this.listTransaction = data.message.data;
      console.log(data)
    })
  }

}
