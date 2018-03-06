import {Component, OnInit} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {ScriptMainService} from "@core/script.data/script.main.service";
import {CommentPopups} from "@shared/popups/comment-popup-component/comment-popups";
import {InvoicePopups} from "@shared/popups/invoice-popup-component/invoice-popups";
import {WarningPopups} from "@shared/popups/warning-popup-component/warning-popups";
import {AwaitingTrackingService, PendingService} from "@core/services";
import {Subject} from "rxjs/Subject";
import {debounceTime} from 'rxjs/operators';
import {NativeStorage} from "@ionic-native/native-storage";

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
export class PendingPage implements OnInit{
  private sessionId: string;
  private listPending;
  private data;
  private branch = [];
  private subject = new Subject<any>();
  private branch_selection;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private mainService: ScriptMainService,
              private modalController: ModalController,
              private pendingService: PendingService,
              private awaitingService: AwaitingTrackingService,
              private nativeStorage: NativeStorage) {
  }

  ngOnInit() {

  }

  ionViewDidLoad() {
    this.nativeStorage.getItem('sessionId')
      .then(res => {
        this.sessionId = res;
        console.log(res);
        this.getPending().pipe(debounceTime(0)).subscribe(() => {
          this.initMasonry();
        });
      });
  }

  initMasonry() {
    this.mainService.initMasonry();
  }

  declaration(e, index, _index) {
    e.preventDefault();
    this.navCtrl.push('declaration-page', {package_id: this.listPending[index].trackings[_index].id, tracking: this.listPending[index].trackings[_index].tracking});
  }

  branchSelection(data) {
    this.branch_selection = data.message.branch_selection;
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
      const obj = data.message.in_transit.reduce((object, value) => {
        object[value.hawb] = value; return object
      }, {});
      this.branch_selection.forEach(val => {obj[val.hawb].locked = val.locked});
      this.branch_selection.forEach(val => {obj[val.hawb].branch = val.branch});
      this.listPending = Object.keys(obj).map(key => obj[key]);
      for(let i in this.listPending) {
        switch (this.listPending[i].branch){
          case 'OFFICE_1':
            this.listPending[i].branch = 'Mickevichi Branch';
            break;
          case 'OFFICE_2':
            this.listPending[i].branch = 'Digomi Branch';
            break;
          case 'OFFICE_3':
            this.listPending[i].branch = 'Vaja-Pshavela Branch';
            break;
          case 'OFFICE_4':
            this.listPending[i].branch = 'Gldani Branch';
            break;
          case 'OFFICE_5':
            this.listPending[i].branch = 'Isani Branch';
            break;
          case 'OFFICE_6':
            this.listPending[i].branch = 'Vake Branch';
            break;
        }
      }
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
    })
  }

}
