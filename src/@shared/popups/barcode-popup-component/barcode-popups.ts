import {
  Component, OnDestroy, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit, Input,
  HostListener
} from '@angular/core';
import { Platform, ViewController, NavParams, NavController } from 'ionic-angular';
import { ScriptService } from '@core/script.data/script.scriptjs.service';


@Component({
  selector: 'barcode-popup',
  templateUrl: './barcode-popups.html',
  styleUrls: ['/barcode-popups.scss'],
})
export class BarcodePopups implements OnDestroy, OnInit, AfterViewInit {
  @ViewChild('popup') popup : ElementRef;

  constructor(private renderer: Renderer2,
              private platform: Platform,
              private scriptService: ScriptService,
              private viewCtrl: ViewController,
              private navCtrl: NavController,
              private navParams: NavParams) {}

  ngOnInit() {

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

  ngOnDestroy() {}
}
