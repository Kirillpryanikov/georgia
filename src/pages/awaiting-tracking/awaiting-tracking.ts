import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
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

/**
 * Временное решение, пока не получил ответа по поводу языков/
 * @type {{insurance: string; cut_down: string}}
 */
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
  private sessionId: string;
  private trackingForm: FormGroup;
  private listAwaitingTracking;
  private data;
  private subscription: Subscription;
  private subject = new Subject<any>();

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private fb: FormBuilder,
              private modalController: ModalController,
              private awaitingService: AwaitingTrackingService,
              private scriptService: ScriptService,
              private popupService: PopupService,
              private mainService: ScriptMainService,
              private nativeStorage: NativeStorage) {

  }

  ngOnInit() {
    this.nativeStorage.getItem('sessionId')
      .then(res => {
        this.sessionId = res;
        this.getAwaiting().pipe(debounceTime(0)).subscribe(() => {
          this.initMasonry();
        });
      });
    this.createFormAddTracking();
  }

  ionViewDidLoad() {
    // window.location.reload();
  }

  initMasonry() {
    this.mainService.initMasonry();
  }

  showWarningPopup(index, checkbox) {
    if(this.listAwaitingTracking[index][checkbox] === '1') {
      if(checkbox === 'insurance')
        return false;
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
        Validators.required,
        Validators.minLength(10)
      ])]
    })
  }

  getAwaiting() {
    this.subscription = this.awaitingService.getAwaiting('getAwaiting', {sessionId: this.sessionId}).subscribe(data => {
      this.listAwaitingTracking = data.message.awaiting;
      this.subject.next();
    });
    return this.subject.asObservable();
  }

  addTracking() {
    this.data = {
      sessionId: this.sessionId,
      tracking: this.trackingForm.value.trackingNumber
    };
    this.subscription = this.awaitingService.addTracking('addTracking', this.data).subscribe(data => {
      this.subscription.unsubscribe();
    });
    this.getAwaiting();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
