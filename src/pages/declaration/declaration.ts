import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {AddProductPopups} from "@shared/popups/add-product-popup-component/add-product-popups";
import {WarningPopups} from "@shared/popups/warning-popup-component/warning-popups";
import {DeclarationService} from "@core/services";
import {ScriptMainService} from "@core/script.data/script.main.service";
import {SuccessPopups} from "@shared/popups/success-popup-component/success-popups";

/**
 * Generated class for the DeclarationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
const notice = {
  rm: 'Please confirm you would like to remove the product',

};

@IonicPage({
  name: 'declaration-page'
})
@Component({
  selector: 'page-declaration',
  templateUrl: 'declaration.html',
})
export class DeclarationPage {

  productList;
  total: number = 0;
  data;
  shiper: string;
  temp;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private modalController: ModalController,
              private declarationService: DeclarationService,
              private mainService: ScriptMainService) {
  }

  ionViewDidLoad() {
    this.mainService.readonly();
    this.getDeclaration();
  }

  addProduct() {
    const modal = this.modalController.create(AddProductPopups);
    modal.onDidDismiss(data => {
      if(data){
        this.productList.push(data);
        this.total+=data.unit_price;
      }
    });
    modal.present();
  }

  removeProduct(index) {
    const modal = this.modalController.create(WarningPopups,{notice:notice.rm});
    modal.onDidDismiss(data => {
      if(data){
        this.total-=this.productList[index].unit_price;
        this.productList.splice(index,1);
      }
    });
    modal.present();
  }

  declareTracking() {

    this.data = {
      sessionId: '9017a521969df545c9e35c391ec89d72',
      packageId: this.navParams.data.package_id,
      shipper: 'amazon.com',
      declarationDetailsJson: JSON.stringify(this.productList)
    };
    console.log(this.data);
    console.log(this.data);
    this.declarationService.declareTracking('declareTracking', this.data).subscribe(data => {
      console.log(data);
    });
    // this.modalController.create(SuccessPopups).present();
  }

  getDeclaration() {
    this.data = {
      sessionId: '9017a521969df545c9e35c391ec89d72',
      packageId: this.navParams.data.package_id
    };
    this.declarationService.getDeclaration('getDeclaration', this.data).subscribe(data => {
      if(data.message.declaration) {
        this.productList = data.message.declaration.goods;
        console.log(data);
      }
    });
  }
}
