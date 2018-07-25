import {
  Component, OnDestroy, ViewChild, ElementRef, Renderer2, AfterViewInit, Input,
  HostListener
} from '@angular/core';
import { Platform, ViewController, NavParams } from 'ionic-angular';
import { ScriptService } from '@core/script.data/script.scriptjs.service';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import {PopupService} from "@core/services";

@Component({
  selector: 'error-popup',
  templateUrl: './error-popups.html',
  styleUrls: ['/pin-popups.scss'],
})
export class ErrorPopups implements OnDestroy, AfterViewInit {
  @ViewChild('popup') popup : ElementRef;

  constructor(private renderer: Renderer2,
              private platform: Platform,
              private scriptService: ScriptService,
              private viewCtrl: ViewController,
              private navParams: NavParams,
              private nativePageTransitions: NativePageTransitions,
              private popupService: PopupService) {

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

  close(data?: boolean) {
    this.scriptService.closePopup();
    this.viewCtrl.dismiss(data);
  }

  ngOnDestroy() {}
}
