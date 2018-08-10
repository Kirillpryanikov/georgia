import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import {IonicPage, NavController, NavParams, ModalController, Platform, LoadingController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { WarningPopups } from '@shared/popups/warning-popup-component/warning-popups';
import { AwaitingTrackingService } from '@core/services/awaiting-tracking';
import { ScriptService } from '@core/script.data/script.scriptjs.service';
import { PopupService } from '@core/services/popup';
import { CommentPopups } from "@shared/popups/comment-popup-component/comment-popups";
import { InvoicePopups } from "@shared/popups/invoice-popup-component/invoice-popups";
import { Subscription } from "rxjs/Subscription";
import { ScriptMainService } from "@core/script.data/script.main.service";
import { NativeStorage } from "@ionic-native/native-storage";
import { debounceTime } from 'rxjs/operators';
import { Subject } from "rxjs/Subject";
import { SuccessPopups} from "@shared/popups/success-popup-component/success-popups";
import { ErrorPopups} from "@shared/popups/error-popup-component/error-popups";
import { HeaderService} from "@core/services";
import { PinPopups } from "@shared/popups/pin-popup-component/pin-popups";
import {TranslateService} from "@ngx-translate/core";

const notice = {
  insurance: '_CHANGE_INSURANCE_CONFIRMATION',
  cut_down: '_CUT_DOWN_CONFIRMATION',
  put_into_bag: '_PUT_INTO_BAG_CONFIRMATION',
  remove_tracking: '_PARCEL_REMOVE_CONFIRMATION'
};

@IonicPage({
  name: "page-awaiting-tracking"
})
@Component({
  selector: 'page-awaiting-tracking',
  templateUrl: 'awaiting-tracking.html',
})
export class AwaitingTrackingPage implements OnInit, OnDestroy{
  @ViewChild('u2ginfo') u2ginfo: ElementRef;
  @ViewChild('addTrackingNumber') addTrackingNumber: ElementRef;
  private sessionId: string;
  public logoWrapper = '_AWAITING_TRACKING_ID';
  public active = 'awaiting-tracking';
  private trackingForm: FormGroup;
  private listAwaitingTracking;
  private isAndroid: boolean;
  private data;
  private ntf;
  private subscription: Subscription;
  private updateNotification;
  private disableCheck: boolean;
  private load;
  private temp;
  private subject = new Subject<any>();

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private fb: FormBuilder,
              private modalController: ModalController,
              private awaitingService: AwaitingTrackingService,
              private scriptService: ScriptService,
              private platform: Platform,
              private popupService: PopupService,
              private mainService: ScriptMainService,
              private nativeStorage: NativeStorage,
              private loadingCtrl: LoadingController,
              private translate: TranslateService,
              private headerService: HeaderService) {
    this.isAndroid= this.platform.is('android');
  }

  ngOnInit() {
    this.nativeStorage.getItem('sessionId')
      .then(res => {
        this.nativeStorage.getItem('pin').catch(() => {
          this.nativeStorage.getItem('set_finger').catch(() => {
            this.nativeStorage.getItem('dontShow').then((data) => {
              if(!data){
                this.nativeStorage.getItem('isAuthorise').catch(() => {
                  setTimeout(() => {
                    const modal = this.modalController.create(PinPopups);
                    modal.present();
                    this.nativeStorage.setItem('isAuthorise', true)
                  }, 100);
                });
              }
            }).catch(() => {
              this.nativeStorage.getItem('isAuthorise').catch(() => {
                this.modalController.create(PinPopups).present();
                this.nativeStorage.setItem('isAuthorise', true)
              });
            })
          })
        });
        this.sessionId = res;
        this.getAwaiting().pipe(debounceTime(0)).subscribe(() => {
          this.initMasonry();
        });
        this.getInfo();
      });
    this.createFormAddTracking();
  }

  initMasonry() {
    this.mainService.initMasonry();
  }

  showWarningPopup(index, checkbox) {
    if(this.listAwaitingTracking[index][checkbox] === '1') {
      if(checkbox === 'insurance'){
        this.disableCheck = true;
        return false;
      }
      this.listAwaitingTracking[index][checkbox] = '0';
      this.data = {
        sessionId: this.sessionId,
        packageId: parseInt(this.listAwaitingTracking[index].package_id),
        key: checkbox.toUpperCase(),
        value: this.listAwaitingTracking[index][checkbox]
      };
      this.subscription = this.awaitingService.changePackageSetting('changePackageSetting', this.data).subscribe(data => {
        this.subscription.unsubscribe();
      });
      return false;
    }
    const modal = this.modalController.create(WarningPopups, {notice: notice[checkbox]});
    modal.onDidDismiss(data => {
      if(data) {
        this.listAwaitingTracking[index][checkbox] = '1';
        this.data = {
          sessionId: this.sessionId,
          packageId: this.listAwaitingTracking[index].package_id,
          key: checkbox.toUpperCase(),
          value: this.listAwaitingTracking[index][checkbox]
        };
        this.subscription = this.awaitingService.changePackageSetting('changePackageSetting', this.data).subscribe(data => {
          this.subscription.unsubscribe();
        });
      } else {
        this.listAwaitingTracking[index][checkbox] = '0';
      }
    });
    modal.present();
  }

  showRemoveTrackingPopup(index) {
    const modal = this.modalController.create(WarningPopups, {notice: notice.remove_tracking});
    modal.onDidDismiss(data => {
      if(!data) {
        return false;
      }
      this.data = {
        sessionId: this.sessionId,
        packageId: this.listAwaitingTracking[index].package_id
      };
      this.listAwaitingTracking.splice(index,1);
      this.subscription = this.awaitingService.removeTracking('removeTracking', this.data).subscribe(data => {
        this.getNotifications();
        this.getInfo();
        this.initMasonry();
        this.subscription.unsubscribe();
      });
    });
    modal.present();
  }

  showCommentPopup(index) {
    const modal = this.modalController.create(CommentPopups,{package_id: this.listAwaitingTracking[index].package_id});
    modal.present();
  }

  showInvoicePopup(index) {
    const modal = this.modalController.create(InvoicePopups, {package_id: this.listAwaitingTracking[index].package_id});
    modal.present();
  }

  declaration(e, index) {
    e.preventDefault();
    this.navCtrl.push('declaration-page', {package_id: this.listAwaitingTracking[index].package_id, tracking: this.listAwaitingTracking[index].tracking});
  }

  createFormAddTracking() {
    this.trackingForm = this.fb.group({
      trackingNumber: ['', Validators.compose([
        Validators.required
      ])]
    })
  }

  getAwaiting() {
    this.load = this.loadingCtrl.create({
      spinner: 'dots'
    });
    this.load.present();
    this.subscription = this.awaitingService.getAwaiting('getAwaiting', {sessionId: this.sessionId}).subscribe(data => {
      this.listAwaitingTracking = data.message.awaiting;
      this.subject.next();
    });
    this.load.dismiss();
    this.temp = true;
    return this.subject.asObservable();
  }

  getInfo() {
    this.subscription = this.headerService.getInfo('getInfo', {sessionId: this.sessionId}).subscribe(data => {
      this.ntf = data.message.counts.awaiting;
    });
  }

  getNotifications() {
    this.headerService.getNotifications('getNotifications', {sessionId: this.sessionId}).subscribe(data => {
      this.updateNotification = data.message.undeclared_trackings.count;
    })
  }

  addTracking() {
    this.data = {
      sessionId: this.sessionId,
      tracking: this.trackingForm.value.trackingNumber
    };
    this.addTrackingNumber.nativeElement.value = '';
    this.subscription = this.awaitingService.addTracking('addTracking', this.data).subscribe(data => {
      if(data.message.status === 'OK') {
        this.getNotifications();
        const modal = this.modalController.create(SuccessPopups);
        modal.present();
        this.subscription.unsubscribe();
      } else {
        const modal = this.modalController.create(ErrorPopups, {notice:data.message.message});
        modal.present();
        this.subscription.unsubscribe();
      }
      this.getAwaiting();
      this.getInfo();
      this.initMasonry();
    });
  }

  ngOnDestroy() {
    if(this.subscription)
      this.subscription.unsubscribe();
  }
}
