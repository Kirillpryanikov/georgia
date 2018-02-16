import { Component, OnDestroy, OnInit, ViewChild, HostListener, ElementRef, Renderer2, AfterViewInit, Input } from '@angular/core';
import { Platform, ViewController, NavParams } from 'ionic-angular';
import { ScriptService } from '@core/script.data/script.scriptjs.service';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import {ScriptMainService} from "@core/script.data/script.main.service";

@Component({
  selector: 'invoice-popup',
  templateUrl: './invoice-popups.html',
  styleUrls: ['/invoice-popups.scss'],
})
export class InvoicePopups implements OnDestroy, OnInit, AfterViewInit {
  @ViewChild('popup') popup : ElementRef;

  constructor(private renderer: Renderer2,
              private platform: Platform,
              private scriptService: ScriptService,
              private viewCtrl: ViewController,
              private navParams: NavParams,
              private nativePageTransitions: NativePageTransitions,
              private mainService: ScriptMainService) {}

  ngOnInit() {
    this.mainService.invoiceFileAdd();
    this.mainService.invoiceFileRemove();
  }

  @HostListener('document:click', ['$event.target.tagName'])
  public documentClick(e) {
    if(e === 'ION-CONTENT')
      this.close();
    if(e === 'ION-BACKDROP')
      this.scriptService.closePopup();
  }

  ionViewWillLeave() {
    this.nativePageTransitions.flip({})
      .then(onSuccess => { console.log('onSuccess') })
      .catch(onError => { console.log('onError') });
  }

  ngAfterViewInit() {
    this.scriptService.setPositionCenter(this.popup);
  }

  ok() {
    this.close(true);
  }

  close(data?: boolean) {
    this.scriptService.closePopup();
    this.viewCtrl.dismiss(data);
  }

  ngOnDestroy() {}
}
