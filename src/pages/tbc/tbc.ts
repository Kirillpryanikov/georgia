import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ScriptMainService } from "@core/script.data/script.main.service";
import {PopupService, TbcService} from "@core/services";
import {NativeStorage} from "@ionic-native/native-storage";

/**
 * Generated class for the TbcPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'tbc-page'
})
@Component({
  selector: 'page-tbc',
  templateUrl: 'tbc.html',
})
export class TbcPage implements OnInit, OnDestroy{

  private data;
  public logoWrapper = 'TBC';
  private amount;
  private unpaid_invoice: string;
  private sessionId: string;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public mainService: ScriptMainService,
              private tbcService: TbcService,
              private popupService: PopupService,
              private nativeStorage: NativeStorage) {
  }

  ngOnInit() {
    this.nativeStorage.getItem('sessionId')
      .then(res => {
        this.sessionId = res;
        this.getUnpaidInvoices();
      });
  }

  generateTBCBankTransaction() {
    this.data = {
      sessionId: this.sessionId,
      amount: this.amount * 100
    };
    this.tbcService.generateTBCBankTransaction('generateTBCBankTransaction', this.data).subscribe(data => {
      if(data.message.status === 'OK') {
        this.data = {
          trans_id: data.message.tbcbank_transaction_id,
          pay_amount: this.amount * 100
        };
        this.tbcService.pay(this.data).subscribe(data => {
        });
      }
    })
  }

  navTo(e, page) {
    e.preventDefault();
    if(this.navCtrl.getActive().id !== page)
      this.navCtrl.setRoot(page);
  }

  getUnpaidInvoices() {
    this.popupService.getUnpaidInvoices('getUnpaidInvoices', {sessionId: this.sessionId}).subscribe(data => {
      this.unpaid_invoice = data.message.total_unpaid;
    });
  }

  ngOnDestroy() {

  }
}
