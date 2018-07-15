import {
  Component, OnDestroy, ViewChild, ElementRef, Renderer2, AfterViewInit, HostListener,
  OnInit
} from '@angular/core';
import { Platform, ViewController, NavParams, NavController } from 'ionic-angular';
import { ScriptService } from '@core/script.data/script.scriptjs.service';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { NativeStorage } from "@ionic-native/native-storage";
import {FingerprintAIO} from "@ionic-native/fingerprint-aio";
import {HeaderService} from "@core/services";

@Component({
  selector: 'pin-popup',
  templateUrl: './pin-popups.html',
  styleUrls: ['/pin-popups.scss'],
})
export class PinPopups implements OnDestroy, AfterViewInit, OnInit {
  @ViewChild('popup') popup : ElementRef;

  dontShow: boolean = false;
  finger;
  hashKey;
  sessionId;
  constructor(private renderer: Renderer2,
              private faio: FingerprintAIO,
              private headerService: HeaderService,
              private platform: Platform,
              private scriptService: ScriptService,
              private viewCtrl: ViewController,
              private navParams: NavParams,
              private navCtrl: NavController,
              private nativePageTransitions: NativePageTransitions,
              private nativeStorage: NativeStorage) {

  }

  ngOnInit() {
    this.nativeStorage.getItem('sessionId')
      .then(res => {
        this.sessionId = res;
        this.getHashKey();
      });
    this.faio.isAvailable()
      .then(data => {
        this.finger = data;
      })
      .catch((err) => {
        console.error(err);
      });
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
    this.navCtrl.push('page-set-pin');
  }

  fingerPrint() {
    this.nativeStorage.setItem('set_finger', true);
    this.close();
  }

  getHashKey(){
    this.headerService.getInfo('getInfo', {sessionId: this.sessionId}).subscribe(data => {
      this.hashKey = data.message.profile.key;
      this.nativeStorage.setItem('hashKey', this.hashKey);
    })
  }

  ngOnDestroy() {}
}
