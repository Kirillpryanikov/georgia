import {
  Component, OnDestroy, ViewChild, ElementRef, Renderer2, AfterViewInit, Input,
  HostListener, OnInit
} from '@angular/core';
import { Platform, ViewController, NavParams } from 'ionic-angular';
import { ScriptService } from '@core/script.data/script.scriptjs.service';
import { PopupService } from "@core/services";
import { Subscription } from "rxjs/Subscription";
import { NativeStorage} from "@ionic-native/native-storage";

@Component({
  selector: 'comment-popup',
  templateUrl: './comment-popups.html',
  styleUrls: ['/comment-popups.scss'],
})
export class CommentPopups implements OnDestroy, AfterViewInit, OnInit {
  @ViewChild('popup') popup : ElementRef;

  private sessionId: string;
  private comment: string = null;
  private data;
  private subscription: Subscription;

  constructor(private renderer: Renderer2,
              private platform: Platform,
              private scriptService: ScriptService,
              private viewCtrl: ViewController,
              private navParams: NavParams,
              private popupService: PopupService,
              private nativeStorage: NativeStorage) {

  }

  ngOnInit() {
    this.nativeStorage.getItem('sessionId')
      .then(res => {
        this.sessionId = res;
        this.getComment();
      });
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
        sessionId: this.sessionId,
        packageId: this.navParams.data.package_id,
        comment: this.comment
    };
    this.subscription = this.popupService.addTrackingComment('addTrackingComment', this.data).subscribe(data => {
      this.close(true);
    });

  }

  close(data?: boolean) {
    this.scriptService.closePopup();
    this.viewCtrl.dismiss(data);
  }

  getComment() {
    this.data = {
      sessionId: this.sessionId,
      packageId: this.navParams.data.package_id,
      comment: this.comment
    };
    this.subscription = this.popupService.getTrackingComment('getTrackingComment', this.data).subscribe(data => {
      this.comment = data.message.comment;
    })
  }

  ngOnDestroy() {
    if(this.subscription)
      this.subscription.unsubscribe();
  }
}
