import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ScriptMainService } from "@core/script.data/script.main.service";
import {CartuService, PopupService} from "@core/services";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import {Subscription} from "rxjs/Subscription";
import {NativeStorage} from "@ionic-native/native-storage";

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
  public logoWrapper = 'Cartu';
  private data: string;
  private unpaid_invoice: string;
  private amount: string;
  private sessionId: string;
  private subscription: Subscription;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public mainService: ScriptMainService,
              private cartuService: CartuService,
              private iab: InAppBrowser,
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

  getCartuDescriptor() {
    this.subscription = this.cartuService.getCartuDescriptor('getCartuDescriptor', {sessionId: this.sessionId})
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
        this.data = this.body.toString();
        this.iab.create(`https://e-commerce.cartubank.ge/servlet/Process3DSServlet/3dsproxy_init.jsp?${this.data}`);
        this.subscription.unsubscribe();
    })
  }

  getUnpaidInvoices() {
    this.popupService.getUnpaidInvoices('getUnpaidInvoices', {sessionId: this.sessionId}).subscribe(data => {
      this.unpaid_invoice = data.message.total_unpaid;
    });
  }

  ngOnDestroy() {

  }
}
