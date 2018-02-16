import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {ScriptMainService} from "@core/script.data/script.main.service";
import {CommentPopups} from "@shared/popups/comment-popup-component/comment-popups";
import {InvoicePopups} from "@shared/popups/invoice-popup-component/invoice-popups";
import {WarningPopups} from "@shared/popups/warning-popup-component/warning-popups";

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
  private listPending = [
    {
      bill: [
        {
          package_id:7965559,
          "tracking":"6667778889",
          "client_comment":"",
          insurance: 0,
          "global_repacking":"1",
          cut_down: 0,
          put_into_bag: 1,
          "declared":1
        },
        {
          package_id:7965559,
          "tracking":"6667778889",
          "client_comment":"",
          insurance: 0,
          "global_repacking":"1",
          cut_down: 0,
          put_into_bag: 1,
          "declared":1
        },
        {
          package_id:7965559,
          "tracking":"6667778889",
          "client_comment":"",
          insurance: 0,
          "global_repacking":"1",
          cut_down: 0,
          put_into_bag: 1,
          "declared":1
        }
      ]
    },
    {
      bill: [
        {
          package_id:7965559,
          "tracking":"6667778889",
          "client_comment":"",
          insurance: 0,
          "global_repacking":"1",
          cut_down: 0,
          put_into_bag: 1,
          "declared":1
        },{
          package_id:7965559,
          "tracking":"6667778889",
          "client_comment":"",
          insurance: 0,
          "global_repacking":"1",
          cut_down: 0,
          put_into_bag: 1,
          "declared":1
        },{
          package_id:7965559,
          "tracking":"6667778889",
          "client_comment":"",
          insurance: 0,
          "global_repacking":"1",
          cut_down: 0,
          put_into_bag: 1,
          "declared":1
        }
      ]
    },
    {
      bill: [
        {
          package_id:7965559,
          "tracking":"6667778889",
          "client_comment":"",
          insurance: 0,
          "global_repacking":"1",
          cut_down: 0,
          put_into_bag: 1,
          "declared":1
        },
        {
          package_id:7965559,
          "tracking":"6667778889",
          "client_comment":"",
          insurance: 0,
          "global_repacking":"1",
          cut_down: 0,
          put_into_bag: 1,
          "declared":1
        },
        {
          package_id:7965559,
          "tracking":"6667778889",
          "client_comment":"",
          insurance: 0,
          "global_repacking":"1",
          cut_down: 0,
          put_into_bag: 1,
          "declared":1
        }
      ]
    },
  ];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private mainService: ScriptMainService,
              private modalController: ModalController) {
  }

  ionViewDidLoad() {
    this.initMasonry();
  }

  initMasonry() {
    this.mainService.initMasonry();
  }

  declaration(e) {
    e.preventDefault();
    this.navCtrl.push('declaration-page');
  }

  showCommentPopup(index) {
    const modal = this.modalController.create(CommentPopups);
    modal.present();
  }

  showInvoicePopup(index) {
    const modal = this.modalController.create(InvoicePopups);
    modal.present();
  }

  showWarningPopup(index, _index, checkbox) {
    if(this.listPending[index].bill[_index][checkbox] === 1) {
      this.listPending[index].bill[_index][checkbox] = 0;
      return false;
    }
    // this.scriptService.checkboxSelect(this.arrRiskFree[index]);
    const modal = this.modalController.create(WarningPopups, {notice: notice[checkbox]});
    modal.onDidDismiss(data => {
      if(data) {
        this.listPending[index].bill[_index][checkbox] = 1;
      } else {
        this.listPending[index].bill[_index][checkbox] = 0;
      }
      /**
       * request. Change package
       */
      // this.changePackageSetting(this.listPending[index].bill[index].package_id, checkbox, this.listPending[index].bill[index][checkbox]);
    });
    modal.present();
  }

  changePackageSetting($packageId: number, $key: string, $value: number) {
    const params = {
      $sessionId: '',
      $packageId,
      $key,
      $value
    };
  }

}
