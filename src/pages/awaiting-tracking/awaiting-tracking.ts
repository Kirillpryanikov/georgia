import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { WarningPopups } from '@shared/popups/warning-popup-component/warning-popups';
import { AwaitingTrackingService } from '@core/services/awaiting-tracking';
import { ScriptService } from '@core/script.data/script.scriptjs.service';
import { PopupService } from '@core/services/popup';
import { CommentPopups } from "@shared/popups/comment-popup-component/comment-popups";
import { InvoicePopups } from "@shared/popups/invoice-popup-component/invoice-popups";
import {Subscription} from "rxjs/Subscription";

/**
 * Временное решение, пока не получил ответа по поводу языков/
 * @type {{insurance: string; cut_down: string}}
 */
const notice = {
  insurance: 'Please confirm you\'d like to enable Risk Free shipping service for your packages.',
  cut_down: 'Please note, that by unchecking Cut Down service, you may get a huge box that stores usually send ' +
            'to us in USA, which will result into dramatical increase of shipping price to Tbilisi. See Cut Down servic' +
            ' terms under Agreement, Paragraph 3.',
  put_into_bag: 'Please note, there is a risk of product damage and USA2GEORGIA takes no responsibility ' +
            'in case you choose shoes to be repacked in plastic bag. Please Confirm or Cancel the request!',
  remove_tracking: 'Do you really want to remove tracking from awaiting list?'
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
  private sessionId = '9017a521969df545c9e35c391ec89d72';
  private arrRiskFree: ElementRef[];
  private arrDownPackage: ElementRef[];
  private trackingForm: FormGroup;
  private listAwaitingTracking;
  private data;
  private subscription: Subscription;

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private fb: FormBuilder,
              private modalController: ModalController,
              private awaitingService: AwaitingTrackingService,
              private scriptService: ScriptService,
              private popupService: PopupService) {}

  ngOnInit() {
    this.getAwaiting();
    this.createFormAddTracking();
  }

  showWarningPopup(index, checkbox) {
    if(this.listAwaitingTracking[index][checkbox] === '1') {
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
    const modal = this.modalController.create(InvoicePopups);
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
    console.log(this.sessionId)
    this.subscription = this.awaitingService.getAwaiting('getAwaiting', {sessionId: this.sessionId}).subscribe(data => {
      this.listAwaitingTracking = data.message.awaiting;
    });
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
