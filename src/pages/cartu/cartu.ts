import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ScriptMainService } from "@core/script.data/script.main.service";
import {CartuService} from "@core/services";

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

  private data ={};
  private amount;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public mainService: ScriptMainService,
              private cartuService: CartuService) {
  }

  ngOnInit() {

  }

  pay() {
    this.data['PurchaseAmt'] = parseFloat(this.amount);
    this.data['PurchaseDesc'] = null;
    this.data['CountryCode'] = 268;
    this.data['CurrencyCode'] = 981;
    this.data['MerchantName'] = 'Usa2Georgia';
    this.data['MerchantURL'] = 'https://www.usa2georgia.com/shipping_new/awaiting';
    this.data['MerchantCity'] = 'Tbilisi';
    this.data['MerchantID'] = '000000008000308-00000001';
    this.data['xDDDSProxy.Language'] = '01';

    console.log(this.data);
    this.cartuService.pay(this.data).subscribe(data => {
      console.log(data);
    })
  }

  ngOnDestroy() {

  }
}
