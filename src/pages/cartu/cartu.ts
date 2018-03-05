import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ScriptMainService } from "@core/script.data/script.main.service";
import { CartuService } from "@core/services";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { map } from "rxjs/operators";

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

  protected form: FormGroup;
  private data = '&PurchaseAmt=1.00&PurchaseDesc=' + 'U00540T1520259438' + '&CountryCode=268&CurrencyCode=981&MerchantName=Usa2Georgia&MerchantURL=https%3A%2F%2Fwww.usa2georgia.com%2Fshipping_new%2Fawaiting&MerchantCity=Tbilisi&MerchantID=000000008000308-00000001&xDDDSProxy.Language=01&cartupayment=Payment&';
  private amount;
  private sessionId = '707d235b00280e693eab0496acb2690d';
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public mainService: ScriptMainService,
              private cartuService: CartuService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    // this.initForm();
  }

  // initForm() {
  //   this.form = this.fb.group({
  //     PurchaseAmt: ['12.45'],
  //     PurchaseDesc: ['U00540T1520259438'],
  //     CountryCode: ['268'],
  //     CurrencyCode: ['981'],
  //     MerchantName:Usa2Georgia
  //     MerchantURL:https://www.usa2georgia.com/shipping_new/awaiting
  //   MerchantCity:Tbilisi
  //   MerchantID:000000008000308-00000001
  //   ['xDDDSProxy.Language']:['01']
  //   })
  // }

  getCartuDescriptor() {
    this.cartuService.getCartuDescriptor('getCartuDescriptor', {sessionId: this.sessionId})
      .subscribe(data => {
        this.cartuService.pay(this.data)
          .subscribe(data => {
            console.log(data);
          })
    })
  }

  ngOnDestroy() {

  }
}
