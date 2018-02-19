import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {AddProductPopups} from "@shared/popups/add-product-popup-component/add-product-popups";

/**
 * Generated class for the DeclarationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'declaration-page'
})
@Component({
  selector: 'page-declaration',
  templateUrl: 'declaration.html',
})
export class DeclarationPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private modalController: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeclarationPage');
  }

  addProduct() {
    const modal = this.modalController.create(AddProductPopups);
    modal.present();
  }
}
