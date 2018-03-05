import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ScriptMainService } from "@core/script.data/script.main.service";
import { CartuService } from "@core/services";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

/**
 * Generated class for the CartuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'cartu-page'
})
@Component({
  selector: 'page-cartu',
  templateUrl: 'cartu.html',
})
export class CartuPage implements OnInit, OnDestroy{

  private body = new URLSearchParams();
  private amount;
  private sessionId = '707d235b00280e693eab0496acb2690d';
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public mainService: ScriptMainService,
              private cartuService: CartuService) {
  }

  ngOnInit() {

  }

  getCartuDescriptor() {
    this.cartuService.getCartuDescriptor('getCartuDescriptor', {sessionId: this.sessionId})
      .subscribe(data => {
        this.body.append('PurchaseAmt', this.amount);
        this.body.append('PurchaseDesc', data.message.descriptor);
        this.body.append('CountryCode', '268');
        this.body.append('CurrencyCode', '981');
        this.body.append('MerchantName', 'Usa2Georgia');
        this.body.append('MerchantURL', 'https://www.usa2georgia.com/shipping_new/awaiting');
        this.body.append('MerchantCity', 'Tbilisi');
        this.body.append('MerchantID', '000000008000308-00000001');
        this.body.append('xDDDSProxy.Language', '01');
        this.cartuService.pay(this.body.toString())
          .subscribe(data => {
            console.log(data);
        })
    })
  }

  ngOnDestroy() {

  }
}
