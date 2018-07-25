import {
  Component, OnDestroy, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit, Input,
  HostListener
} from '@angular/core';
import {Platform, ViewController, NavParams, NavController} from 'ionic-angular';
import { ScriptService } from '@core/script.data/script.scriptjs.service';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import {ScriptMainService} from "@core/script.data/script.main.service";
import {PopupService} from "@core/services";
import {NativeStorage} from "@ionic-native/native-storage";

@Component({
  selector: 'details-popup',
  templateUrl: './details-popups.html',
  styleUrls: ['/barcode-popups.scss'],
})
export class DetailsPopups implements OnDestroy, OnInit, AfterViewInit {
  @ViewChild('popup') popup : ElementRef;

  private sessionId: string;
  private unused_credits: number;
  private amount_due: number;
  private total_invoice: number;
  constructor(private renderer: Renderer2,
              private platform: Platform,
              private scriptService: ScriptService,
              private viewCtrl: ViewController,
              private navCtrl: NavController,
              private navParams: NavParams,
              private nativePageTransitions: NativePageTransitions,
              private mainService: ScriptMainService,
              private popupService: PopupService,
              private nativeStorage: NativeStorage) {}

  ngOnInit() {
    this.nativeStorage.getItem('sessionId')
      .then(res => {
        this.sessionId = res;
        this.getInfo();
      });
    this.mainService.invoiceFileAdd();
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

  payNow(e) {
    e.preventDefault();
    this.close();
    this.navCtrl.setRoot('deposite-page');
  }

  getInfo() {
    this.popupService.getInfo('getInfo', {sessionId: this.sessionId}).subscribe(data => {
      this.unused_credits = parseFloat(data.message.profile.balance);
      this.getUnpaidInvoices();
    })
  }

  getUnpaidInvoices() {
    this.popupService.getUnpaidInvoices('getUnpaidInvoices', {sessionId: this.sessionId}).subscribe(data => {
      if(parseFloat(data.message.total_unpaid) > 0)
        this.amount_due = -parseFloat(data.message.total_unpaid);
      else
        this.amount_due = parseFloat(data.message.total_unpaid);
      this.total_invoice = Math.abs(this.amount_due) + this.unused_credits;
    });
  }

  ngOnDestroy() {}
}
