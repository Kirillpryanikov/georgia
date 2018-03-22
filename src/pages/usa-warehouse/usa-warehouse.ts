import {Component, OnInit} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {CommentPopups} from "@shared/popups/comment-popup-component/comment-popups";
import {InvoicePopups} from "@shared/popups/invoice-popup-component/invoice-popups";
import {WarningPopups} from "@shared/popups/warning-popup-component/warning-popups";
import {AwaitingTrackingService, UsaWarehouseService} from "@core/services";
import {Subscription} from "rxjs/Subscription";
import {ScriptMainService} from "@core/script.data/script.main.service";
import {NativeStorage} from "@ionic-native/native-storage";

/**
 * Generated class for the UsaWarehousePage page.
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
  name: 'usa-warehouse-page'
})
@Component({
  selector: 'page-usa-warehouse',
  templateUrl: 'usa-warehouse.html',
})
export class UsaWarehousePage implements OnInit{
  public active = 'usa-warehouse';
  private sessionId: string;
  public logoWrapper = '_USA_WAREHOUSE';
  private listUsaWarehouse;
  private subscription: Subscription;
  private data;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private modalController: ModalController,
              private usaWarehouseService: UsaWarehouseService,
              private awaitingService: AwaitingTrackingService,
              private mainService: ScriptMainService,
              private nativeStorage: NativeStorage) {
  }

  ngOnInit() {
    this.nativeStorage.getItem('sessionId')
      .then(res => {
        this.sessionId = res;
        this.getWarehouse();
      });
  }

  ionViewDidLoad() {

  }

  initMasonry() {
    this.mainService.initMasonry();
  }

  declaration(e, index) {
    e.preventDefault();
    this.navCtrl.push('declaration-page',{package_id: this.listUsaWarehouse[index].package_id, tracking: this.listUsaWarehouse[index].tracking});
  }

  showWarningPopup(index, checkbox) {
    if(this.listUsaWarehouse[index][checkbox] === '1') {
      if(checkbox === 'insurance')
        return false;
      this.listUsaWarehouse[index][checkbox] = '0';
      this.data = {
        sessionId: this.sessionId,
        packageId: parseInt(this.listUsaWarehouse[index].package_id),
        key: checkbox.toUpperCase(),
        value: this.listUsaWarehouse[index][checkbox]
      };
      this.subscription = this.awaitingService.changePackageSetting('changePackageSetting', this.data).subscribe(data => {
        this.subscription.unsubscribe();
      });
      return false;
    }
    const modal = this.modalController.create(WarningPopups,
      {notice: notice[checkbox], package_id: this.listUsaWarehouse[index].package_id, key: checkbox, value: this.listUsaWarehouse[index][checkbox]});
    modal.onDidDismiss(data => {
      if(data) {
        this.listUsaWarehouse[index][checkbox] = '1';
        this.data = {
          sessionId: this.sessionId,
          packageId: this.listUsaWarehouse[index].package_id,
          key: checkbox.toUpperCase(),
          value: this.listUsaWarehouse[index][checkbox]
        };
        this.subscription = this.awaitingService.changePackageSetting('changePackageSetting', this.data).subscribe(data => {
          this.subscription.unsubscribe();
        });
      } else {
        this.listUsaWarehouse[index][checkbox] = '0';
      }
    });
    modal.present();
  }

  showCommentPopup(index) {
    const modal = this.modalController.create(CommentPopups,{package_id: this.listUsaWarehouse[index].package_id});
    modal.present();
  }

  showInvoicePopup(index) {
    const modal = this.modalController.create(InvoicePopups, {package_id: this.listUsaWarehouse[index].package_id});
    modal.present();
  }

  getWarehouse() {
    this.subscription = this.usaWarehouseService.getUsaWarehouse('getUsaWarehouse', {sessionId: this.sessionId}).subscribe(data => {
      console.log(data);
      this.listUsaWarehouse = data.message.usa_warehouse;
      setTimeout(() => {
        this.initMasonry();
      })
    });
  }

}
