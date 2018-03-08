import {
  Component, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit, HostListener,
  EventEmitter
} from '@angular/core';
import { Platform, ViewController, NavParams, NavController } from 'ionic-angular';
import { ScriptService } from '@core/script.data/script.scriptjs.service';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { ScriptMainService } from "@core/script.data/script.main.service";

@Component({
  selector: 'courier-not-success-popup',
  templateUrl: './courier-not-success-popups.html',
  styleUrls: ['/courier-not-success.scss'],
})
export class CourierNotSuccessPopups implements OnInit, AfterViewInit {
  @ViewChild('popup') popup : ElementRef;

  product = {
    code:'',
    description: '',
    unit_price: 0,
    unit_count: 0
  };

  constructor(private renderer: Renderer2,
              private platform: Platform,
              private scriptService: ScriptService,
              private viewCtrl: ViewController,
              private navCtrl: NavController,
              private navParams: NavParams,
              private nativePageTransitions: NativePageTransitions,
              private mainService: ScriptMainService) {

  }

  ngOnInit(): void {

  }

  ionViewWillLeave(): void {
    this.nativePageTransitions.flip({})
      .then(onSuccess => { console.log('onSuccess') })
      .catch(onError => { console.log('onError') });
  }

  close(): void {
    this.scriptService.closePopup();
    this.viewCtrl.dismiss();
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
