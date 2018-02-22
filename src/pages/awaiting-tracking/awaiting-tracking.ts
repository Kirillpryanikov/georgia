import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { WarningPopups } from '@shared/popups/warning-popup-component/warning-popups';
import { AwaitingTrackingService } from '@core/services/awaiting-tracking';
import { ScriptService } from '@core/script.data/script.scriptjs.service';
import { PopupService } from '@core/services/popup';
import { CommentPopups } from "@shared/popups/comment-popup-component/comment-popups";
import { InvoicePopups } from "@shared/popups/invoice-popup-component/invoice-popups";

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
export class AwaitingTrackingPage implements OnInit, OnDestroy {
  @ViewChild('u2ginfo') u2ginfo: ElementRef;
  private arrRiskFree: ElementRef[];
  private arrDownPackage: ElementRef[];
  private trackingForm: FormGroup;
  private listAwaitingTracking;
  private data;

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
        sessionId: '9017a521969df545c9e35c391ec89d72',
        packageId: parseInt(this.listAwaitingTracking[index].package_id),
        key: checkbox.toUpperCase(),
        value: this.listAwaitingTracking[index][checkbox]
      };
      this.awaitingService.changePackageSetting('changePackageSetting', this.data).subscribe(data => {
        console.log(data);
      });
      return false;
    }
    const modal = this.modalController.create(WarningPopups, {notice: notice[checkbox]});
    modal.onDidDismiss(data => {
      if(data) {
        this.listAwaitingTracking[index][checkbox] = '1';
        this.data = {
          sessionId: '9017a521969df545c9e35c391ec89d72',
          packageId: this.listAwaitingTracking[index].package_id,
          key: checkbox.toUpperCase(),
          value: this.listAwaitingTracking[index][checkbox]
        };
        this.awaitingService.changePackageSetting('changePackageSetting', this.data).subscribe(data => {
          console.log(data);
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
        sessionId: '9017a521969df545c9e35c391ec89d72',
        packageId: this.listAwaitingTracking[index].package_id
      };
      this.listAwaitingTracking.splice(index,1);
      this.awaitingService.removeTracking('removeTracking', this.data).subscribe(data => {
        console.log(data);
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
    this.navCtrl.push('declaration-page', {package_id: this.listAwaitingTracking[index].package_id});
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
    this.awaitingService.getAwaiting('getAwaiting', {sessionId: '9017a521969df545c9e35c391ec89d72'}).subscribe(data => {
      console.log(data.message.awaiting);
      this.listAwaitingTracking = data.message.awaiting;
    });
  }

  addTracking() {
    this.data = {
      sessionId: '9017a521969df545c9e35c391ec89d72',
      tracking: this.trackingForm.value.trackingNumber
    };
    this.awaitingService.addTracking('addTracking', this.data).subscribe(data => {
      console.log(data);
    });
    this.getAwaiting();
  }

  ngOnDestroy() {}
}
