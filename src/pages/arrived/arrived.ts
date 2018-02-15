import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {ScriptMainService} from "@core/script.data/script.main.service";
import {CommentPopups} from "@shared/popups/comment-popup-component/comment-popups";
import {InvoicePopups} from "@shared/popups/invoice-popup-component/invoice-popups";
import {InvoiceInfoPopups} from "@shared/popups/invoice-info-popup-component/invoice-info-popups";

/**
 * Generated class for the ArrivedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'arrived-page'
})
@Component({
  selector: 'page-arrived',
  templateUrl: 'arrived.html',
})
export class ArrivedPage {

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

  showCommentPopup(index) {
    const modal = this.modalController.create(CommentPopups);
    modal.present();
  }

  showInvoicePopup(index) {
    const modal = this.modalController.create(InvoicePopups);
    modal.present();
  }

  showInvoiceInfoPopup(index) {
    const modal = this.modalController.create(InvoiceInfoPopups);
    modal.present();
  }

}
