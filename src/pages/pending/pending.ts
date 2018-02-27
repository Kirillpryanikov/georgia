import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {ScriptMainService} from "@core/script.data/script.main.service";
import {CommentPopups} from "@shared/popups/comment-popup-component/comment-popups";
import {InvoicePopups} from "@shared/popups/invoice-popup-component/invoice-popups";
import {WarningPopups} from "@shared/popups/warning-popup-component/warning-popups";
import {AwaitingTrackingService, PendingService} from "@core/services";
import {Subject} from "rxjs/Subject";
import {debounceTime} from 'rxjs/operators';

/**
 * Generated class for the PendingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
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
  name: 'pending-page'
})
@Component({
  selector: 'page-pending',
  templateUrl: 'pending.html',
})
export class PendingPage {
  private sessionId = '707d235b00280e693eab0496acb2690d';
  private listPending;
  private data;
  private branch = [];
  private subject = new Subject<any>();
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private mainService: ScriptMainService,
              private modalController: ModalController,
              private pendingService: PendingService,
              private awaitingService: AwaitingTrackingService) {
  }

  ionViewDidLoad() {
    this.getPending().pipe(debounceTime(0)).subscribe(() => {
      this.initMasonry();
    });
  }

  initMasonry() {
    this.mainService.initMasonry();
  }

  declaration(e, index, _index) {
    e.preventDefault();
    this.navCtrl.push('declaration-page', {package_id: this.listPending[index].trackings[_index].id, tracking: this.listPending[index].trackings[_index].tracking});
  }

  showCommentPopup(index, _index) {
    const modal = this.modalController.create(CommentPopups, {package_id: this.listPending[index].trackings[_index].id});
    modal.present();
  }

  showInvoicePopup(index, _index) {

    const modal = this.modalController.create(InvoicePopups);
    modal.present();
  }

  showWarningPopup(index, _index, checkbox) {
    if(this.listPending[index].trackings[_index][checkbox] === '1') {
      if(checkbox === 'insurance')
        return false;
      this.listPending[index].trackings[_index][checkbox] = '0';
      this.data = {
        sessionId: this.sessionId,
        packageId: this.listPending[index].trackings[_index].id,
        key: checkbox.toUpperCase(),
        value: this.listPending[index].trackings[_index][checkbox]
      };
      this.awaitingService.changePackageSetting('changePackageSetting', this.data).subscribe(data => {

      });
      return false;
    }
    const modal = this.modalController.create(WarningPopups, {notice: notice[checkbox]});
    modal.onDidDismiss(data => {
      if(data) {
        this.listPending[index].trackings[_index][checkbox] = '1';
        this.data = {
          sessionId: this.sessionId,
          packageId: this.listPending[index].trackings[_index].id,
          key: checkbox.toUpperCase(),
          value: this.listPending[index].trackings[_index][checkbox]
        };
        this.awaitingService.changePackageSetting('changePackageSetting', this.data).subscribe(() => {

        });
      } else {
        this.listPending[index].trackings[_index][checkbox] = '0';
      }
    });
    modal.present();
  }

  getPending() {
    this.pendingService.getPending('getPending', {sessionId: this.sessionId}).subscribe(data => {
      console.log(data.message);
      this.listPending = data.message.in_transit;
      this.subject.next();
    });
    return this.subject.asObservable();
  }

  changeHawbBranch(hawb, index) {
    this.data = {
      sessionId: this.sessionId,
      hawb: hawb,
      branch: this.branch[index]
    };
    this.pendingService.changeHawbBranch('changeHawbBranch', this.data).subscribe((data) => {
      console.log(data);
    })
  }

}
