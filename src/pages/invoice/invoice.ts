import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InvoiceService } from "@core/services";
import { IInvoice } from "@IFolder/IInvoice";

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
  private sessionId = '707d235b00280e693eab0496acb2690d';
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
              public navParams: NavParams,
              private invoiceService: InvoiceService) {
  }

  ngOnInit() {
    this.getInvoice();
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
