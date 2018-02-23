import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {CommentPopups} from "@shared/popups/comment-popup-component/comment-popups";
import {InvoicePopups} from "@shared/popups/invoice-popup-component/invoice-popups";
import {WarningPopups} from "@shared/popups/warning-popup-component/warning-popups";
import {UsaWarehouseService} from "@core/services";
import {Subscription} from "rxjs/Subscription";

/**
 * Generated class for the UsaWarehousePage page.
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
  name: 'usa-warehouse-page'
})
@Component({
  selector: 'page-usa-warehouse',
  templateUrl: 'usa-warehouse.html',
})
export class UsaWarehousePage {
  private sessionId = '707d235b00280e693eab0496acb2690d';
  private listUsaWarehouse;
  private subscription: Subscription;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private modalController: ModalController,
              private usaWarehouseService: UsaWarehouseService) {
  }

  ionViewDidLoad() {
   this.getWarehouse();
  }

  declaration(e, index) {
    e.preventDefault();
    this.navCtrl.push('declaration-page',{package_id: this.listUsaWarehouse[index].package_id, tracking: this.listUsaWarehouse[index].tracking});
  }

  showWarningPopup(index, checkbox) {
    if(this.listUsaWarehouse[index][checkbox] === 1) {
      this.listUsaWarehouse[index][checkbox] = 0;
      // this.usaWarehouseService.changePackageSetting(package_id: this.listUsaWarehouse[index].package_id, key: checkbox, value: this.listUsaWarehouse[index][checkbox]).subscribe();
      // ToDo: create after get API
      return false;
    }
    const modal = this.modalController.create(WarningPopups,
      {notice: notice[checkbox], package_id: this.listUsaWarehouse[index].package_id, key: checkbox, value: this.listUsaWarehouse[index][checkbox]});
    modal.onDidDismiss(data => {
      if(data) {
        this.listUsaWarehouse[index][checkbox] = 1;
      } else {
        this.listUsaWarehouse[index][checkbox] = 0;
      }
    });
    modal.present();
  }

  showCommentPopup(index) {
    const modal = this.modalController.create(CommentPopups,{package_id: this.listUsaWarehouse[index].package_id});
    modal.present();
  }

  showInvoicePopup(index) {
    const modal = this.modalController.create(InvoicePopups);
    modal.present();
  }

  getWarehouse() {
    this.subscription = this.usaWarehouseService.getUsaWarehouse('getUsaWarehouse', {sessionId: this.sessionId}).subscribe(data => {
      this.listUsaWarehouse = data.message.usa_warehouse;
      console.log(data.message)
    });
  }

}
