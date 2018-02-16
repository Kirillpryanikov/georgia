import {
  Component, OnDestroy, ViewChild, ElementRef, Renderer2, AfterViewInit, Input,
  HostListener
} from '@angular/core';
import { Platform, ViewController, NavParams } from 'ionic-angular';
import { ScriptService } from '@core/script.data/script.scriptjs.service';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';

@Component({
  selector: 'warning-popup',
  templateUrl: './warning-popups.html',
  styleUrls: ['/warning-popups.scss'],
})
export class WarningPopups implements OnDestroy, AfterViewInit {
  @ViewChild('popup') popup : ElementRef;

  constructor(private renderer: Renderer2,
              private platform: Platform,
              private scriptService: ScriptService,
              private viewCtrl: ViewController,
              private navParams: NavParams,
              private nativePageTransitions: NativePageTransitions) {}

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

  ok() {
    this.close(true);
  }

  close(data?: boolean) {
    this.scriptService.closePopup();
    this.viewCtrl.dismiss(data);
  }

  ngOnDestroy() {}
}
