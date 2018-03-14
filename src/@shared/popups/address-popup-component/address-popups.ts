import {
  Component, OnDestroy, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit, Input,
  HostListener
} from '@angular/core';
import { Platform, ViewController, NavParams, NavController } from 'ionic-angular';
import { ScriptService } from '@core/script.data/script.scriptjs.service';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { ScriptMainService } from "@core/script.data/script.main.service";
import { PopupService } from "@core/services";
import {NativeStorage} from "@ionic-native/native-storage";

@Component({
  selector: 'address-popup',
  templateUrl: './address-popups.html',
  styleUrls: ['/address-popups.scss'],
})
export class AddressPopups implements OnDestroy, OnInit, AfterViewInit {
  @ViewChild('popup') popup : ElementRef;
  private sessionId: string = '707d235b00280e693eab0496acb2690d';
  private user: Object = {
    first_name: '',
    last_name: '',
    suite: ''
  };
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
    // this.nativeStorage.getItem('sessionId')
    //   .then(res => {
    //     this.sessionId = res;
        this.getInfo();
      // });
    this.mainService.invoiceFileAdd();
    this.mainService.invoiceFileRemove();
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
    this.scriptService.closePopup();
    this.viewCtrl.dismiss();
  }

  getInfo() {
    this.popupService.getInfo('getInfo', {sessionId: this.sessionId}).subscribe(data => {
      this.user = data.message.profile;
      console.log(data);
    })
  }

  ngOnDestroy() {}
}
