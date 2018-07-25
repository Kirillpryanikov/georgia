import {
  Component, OnDestroy, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit, Input,
  HostListener
} from '@angular/core';
import { Platform, ViewController, NavParams } from 'ionic-angular';
import { ScriptService } from '@core/script.data/script.scriptjs.service';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import {ScriptMainService} from "@core/script.data/script.main.service";
import {NativeStorage} from "@ionic-native/native-storage";
import {InvoiceService} from "@core/services";

@Component({
  selector: 'invoice-info-popup',
  templateUrl: './invoice-info-popups.html',
  styleUrls: ['/invoice-info-popups.scss'],
})
export class InvoiceInfoPopups implements OnDestroy, OnInit, AfterViewInit {
  @ViewChild('popup') popup : ElementRef;


  private data;
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
  constructor(private renderer: Renderer2,
              private platform: Platform,
              private scriptService: ScriptService,
              private viewCtrl: ViewController,
              private navParams: NavParams,
              private nativePageTransitions: NativePageTransitions,
              private mainService: ScriptMainService,
              private nativeStorage: NativeStorage,
              private invoiceService: InvoiceService) {}

  ngOnInit() {
    this.nativeStorage.getItem('sessionId')
      .then(res => {
        this.sessionId = res;
        this.getInvoice();
      });
  }

  @HostListener('document:click', ['$event.target.tagName'])
  public documentClick(e) {
    if(e === 'ION-CONTENT')
      this.close();
    if(e === 'ION-BACKDROP')
      this.scriptService.closePopup();
  }

  ngAfterViewInit() {
    this.scriptService.setPositionCenter(this.popup);
  }

  close() {
    this.scriptService.closePopup();
    this.viewCtrl.dismiss();
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

  ngOnDestroy() {}
}
