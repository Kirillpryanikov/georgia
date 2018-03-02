import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ScriptMainService } from "@core/script.data/script.main.service";
import { TbcService } from "@core/services";

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
  private amount;
  private sessionId = '707d235b00280e693eab0496acb2690d';
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public mainService: ScriptMainService,
              private tbcService: TbcService) {
  }

  ngOnInit() {

  }

  generateTBCBankTransaction() {
    this.data = {
      sessionId: this.sessionId,
      amount: this.amount * 100
    };
    this.tbcService.generateTBCBankTransaction('generateTBCBankTransaction', this.data).subscribe(data => {
      console.log(data);
      if(data.message.status === 'OK') {
        this.data = {
          trans_id: data.message.tbcbank_transaction_id,
          pay_amount: this.amount * 100
        };
        this.tbcService.pay(this.data).subscribe(data => {
          console.log(data);
        });
      }
    })
  }

  ngOnDestroy() {

  }
}
