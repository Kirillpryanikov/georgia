import { Component, OnDestroy, ViewChild, ElementRef, Renderer2, AfterViewInit, HostListener } from '@angular/core';
import { Platform, ViewController, NavParams, NavController } from 'ionic-angular';
import { ScriptService } from '@core/script.data/script.scriptjs.service';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { NativeStorage } from "@ionic-native/native-storage";

@Component({
  selector: 'pin-popup',
  templateUrl: './pin-popups.html',
  styleUrls: ['/pin-popups.scss'],
})
export class PinPopups implements OnDestroy, AfterViewInit {
  @ViewChild('popup') popup : ElementRef;

  dontShow: boolean = false;
  constructor(private renderer: Renderer2,
              private platform: Platform,
              private scriptService: ScriptService,
              private viewCtrl: ViewController,
              private navParams: NavParams,
              private navCtrl: NavController,
              private nativePageTransitions: NativePageTransitions,
              private nativeStorage: NativeStorage) {

  }

  ionViewWillLeave() {
    this.nativePageTransitions.flip({})
      .then(onSuccess => { console.log('onSuccess') })
      .catch(onError => { console.log('onError') });
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
    this.nativeStorage.setItem('dontShow', this.dontShow);
    this.scriptService.closePopup();
    this.viewCtrl.dismiss();
  }

  setup() {
    this.scriptService.closePopup();
    this.viewCtrl.dismiss();
    this.navCtrl.push('settings-page');
  }

  ngOnDestroy() {}
}
