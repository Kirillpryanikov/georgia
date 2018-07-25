import {
  Component, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit, HostListener,
  EventEmitter
} from '@angular/core';
import {Platform, ViewController, NavParams, NavController, ModalController} from 'ionic-angular';
import { ScriptService } from '@core/script.data/script.scriptjs.service';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { ScriptMainService } from "@core/script.data/script.main.service";
import {PopupService} from "@core/services";
import {CourierNotSuccessPopups} from "@shared/popups/courier-not-success-popup-component/courier-not-success-popups";
import {SuccessPopups} from "@shared/popups/success-popup-component/success-popups";
import {NativeStorage} from "@ionic-native/native-storage";

@Component({
  selector: 'courier-success-popup',
  templateUrl: './courier-success-popups.html',
  styleUrls: ['/courier-success.scss'],
})
export class CourierSuccessPopups implements OnInit, AfterViewInit {
  @ViewChild('popup') popup : ElementRef;

  product = {
    code:'',
    description: '',
    unit_price: 0,
    unit_count: 0
  };

  private data;
  private sessionId: string;
  constructor(private renderer: Renderer2,
              private platform: Platform,
              private scriptService: ScriptService,
              private viewCtrl: ViewController,
              private navCtrl: NavController,
              private navParams: NavParams,
              private nativePageTransitions: NativePageTransitions,
              private popupService: PopupService,
              private mainService: ScriptMainService,
              private modalController: ModalController,
              private nativeStorage: NativeStorage) {

  }

  ngOnInit(): void {
    this.nativeStorage.getItem('sessionId')
      .then(res => {
        this.sessionId = res;
      });
  }

  close(): void {
    this.scriptService.closePopup();
    this.viewCtrl.dismiss();
  }

  retrieveCourier() {
    this.data = {
      sessionId: this.sessionId,
      action: 'RETRIEVE'
    };
    this.popupService.retrieveCourier('retrieveCourier', this.data).subscribe(data => {
      if(data.message.status !== 'FAIL') {
        const modal = this.modalController.create(SuccessPopups);
        modal.present();
        this.close();
      }
    })
  }

  @HostListener('document:click', ['$event.target.tagName'])
  documentClick(e: string): void {
    if(e === 'ION-CONTENT')
      this.close();
    if(e === 'ION-BACKDROP')
      this.scriptService.closePopup();
  }

  ngAfterViewInit(): void {
    this.scriptService.setPositionCenter(this.popup);
  }

}
