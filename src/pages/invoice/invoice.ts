import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import { InvoiceService } from "@core/services";
import {NativeStorage} from "@ionic-native/native-storage";

/**
 * Generated class for the InvoicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'invoice-page'
})
@Component({
  selector: 'page-invoice',
  templateUrl: 'invoice.html',
})
export class InvoicePage implements OnInit{
  private data;
  private backButton: boolean = false;
  private sessionId: string;
  private discount = {
    amount: 0,
    total: 0,
    vat: 0
  };
  public invoice = {
    address: '',
    date: '',
    email: '',
    full_name: '',
    hawb: '',
    invoice: '',
    mobile: '',
    suite: '',
    total: 0,
    transportation: {
      amount: 0,
      total: 0,
      vat: 0
    },
    weight_lbs: '',
    weight_kg: ''
  };
  constructor(public navCtrl: NavController,
              private platform: Platform,
              public navParams: NavParams,
              private invoiceService: InvoiceService,
              private nativeStorage: NativeStorage) {
  }

  ngOnInit() {
    if(this.platform.is('ios')){
      this.backButton = true;
    }
    this.nativeStorage.getItem('sessionId')
      .then(res => {
        this.sessionId = res;
        this.getInvoice();
      });
  }

  back() {
    this.navCtrl.pop();
  }

  getInvoice() {
    this.data = {
      sessionId: this.sessionId,
      invoice: this.navParams.data.invoice
    };
    this.invoiceService.getInvoice('getInvoice', this.data).subscribe(data => {
      this.invoice = data.message.invoice;
      this.discount.amount = Math.round(data.message.invoice.transportation.amount * 0.1 * 100) / 100;
      this.discount.total = Math.round(data.message.invoice.transportation.total * 0.1 * 100) / 100;
      this.discount.vat = Math.round(data.message.invoice.transportation.vat * 0.1 * 100) / 100;
    })
  }

}
