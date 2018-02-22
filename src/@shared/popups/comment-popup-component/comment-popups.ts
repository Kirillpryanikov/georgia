import {
  Component, OnDestroy, ViewChild, ElementRef, Renderer2, AfterViewInit, Input,
  HostListener, OnInit
} from '@angular/core';
import { Platform, ViewController, NavParams } from 'ionic-angular';
import { ScriptService } from '@core/script.data/script.scriptjs.service';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import {PopupService} from "@core/services";

@Component({
  selector: 'comment-popup',
  templateUrl: './comment-popups.html',
  styleUrls: ['/comment-popups.scss'],
})
export class CommentPopups implements OnDestroy, AfterViewInit, OnInit {
  @ViewChild('popup') popup : ElementRef;

  private comment: string = null;
  private data;

  constructor(private renderer: Renderer2,
              private platform: Platform,
              private scriptService: ScriptService,
              private viewCtrl: ViewController,
              private navParams: NavParams,
              private nativePageTransitions: NativePageTransitions,
              private popupService: PopupService) {

  }

  ngOnInit() {
    this.getComment();
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

  ok() {
    this.data = {
        sessionId: '9017a521969df545c9e35c391ec89d72',
        packageId: this.navParams.data.package_id,
        comment: this.comment
    };
    this.popupService.addTrackingComment('addTrackingComment', this.data).subscribe(data => {
      console.log(data);
      this.close(true);
    });

  }

  close(data?: boolean) {
    this.scriptService.closePopup();
    this.viewCtrl.dismiss(data);
  }

  getComment() {
    this.data = {
      sessionId: '9017a521969df545c9e35c391ec89d72',
      packageId: this.navParams.data.package_id,
      comment: this.comment
    };
    this.popupService.getTrackingComment('getTrackingComment', this.data).subscribe(data => {
      this.comment = data.message.comment;
      console.log(data);
    })
  }

  ngOnDestroy() {}
}
