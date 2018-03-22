import {Component, OnInit} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {ScriptMainService} from "@core/script.data/script.main.service";
import {CommentPopups} from "@shared/popups/comment-popup-component/comment-popups";
import {InvoicePopups} from "@shared/popups/invoice-popup-component/invoice-popups";
import {WarningPopups} from "@shared/popups/warning-popup-component/warning-popups";
import {AwaitingTrackingService, HeaderService, PendingService} from "@core/services";
import {Subject} from "rxjs/Subject";
import {debounceTime} from 'rxjs/operators';
import {NativeStorage} from "@ionic-native/native-storage";
import {TranslateService} from "@ngx-translate/core";
import {Subscription} from "rxjs/Subscription";
import {el} from "@angular/platform-browser/testing/src/browser_util";

/**
 * Generated class for the PendingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
const notice = {
  insurance: '_CHANGE_INSURANCE_CONFIRMATION',
  cut_down: '_CUT_DOWN_CONFIRMATION',
  put_into_bag: '_PUT_INTO_BAG_CONFIRMATION',
  remove_tracking: '_PARCEL_REMOVE_CONFIRMATION'
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
  public logoWrapper = '_PENDING';
  public active = 'pending';
  private listPending;
  private data;
  private branch = [];
  private subject = new Subject<any>();
  private branch_selection;
  private lang: string;
  private subscription: Subscription;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private mainService: ScriptMainService,
              private modalController: ModalController,
              private pendingService: PendingService,
              private awaitingService: AwaitingTrackingService,
              private headerService: HeaderService,
              private nativeStorage: NativeStorage) {
  }

  ngOnInit() {

  }

  ionViewDidLoad() {
    this.nativeStorage.getItem('sessionId')
      .then(res => {
        this.sessionId = res;
        this.getPending().pipe(debounceTime(0)).subscribe(() => {
          this.initMasonry();
        });
        this.getInfo();
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
    const modal = this.modalController.create(InvoicePopups, {package_id: this.listPending[index].trackings[_index].id});
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

  getInfo() {
    this.subscription = this.headerService.getInfo('getInfo', {sessionId: this.sessionId}).subscribe(data => {
      this.lang = data.message.profile.panel_language;
      this.subscription.unsubscribe();
    })
  }

  getPending() {
    this.pendingService.getPending('getPending', {sessionId: this.sessionId}).subscribe(data => {
      const obj = data.message.in_transit.reduce((object, value) => {
        object[value.hawb] = value; return object
      }, {});
      this.branch_selection.forEach(val => {obj[val.hawb].locked = val.locked});
      this.branch_selection.forEach(val => {obj[val.hawb].branch = val.branch});
      this.listPending = Object.keys(obj).map(key => obj[key]);

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
