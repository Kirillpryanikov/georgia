import { Component, OnInit } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';
import { AddProductPopups } from "@shared/popups/add-product-popup-component/add-product-popups";
import { WarningPopups } from "@shared/popups/warning-popup-component/warning-popups";
import { DeclarationService } from "@core/services";
import { ScriptMainService } from "@core/script.data/script.main.service";
import { SuccessPopups } from "@shared/popups/success-popup-component/success-popups";
import { Subscription } from "rxjs/Subscription";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {NativeStorage} from "@ionic-native/native-storage";

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
export class DeclarationPage implements OnInit{

  productList: Array<any>;
  sessionId: string;
  total: number = 0;
  data: Object;
  form: FormGroup;
  subscription: Subscription;
  shipper: string;
  shipperList: Array<string>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private modalController: ModalController,
              private declarationService: DeclarationService,
              private mainService: ScriptMainService,
              private fb: FormBuilder,
              private nativeStorage: NativeStorage) {
  }

  ngOnInit(): void {
    this.createForm();
    this.nativeStorage.getItem('sessionId')
      .then(res => {
        this.sessionId = res;
        this.getDeclaration();
        this.getShipers();
      });
  }

  ionViewDidLoad(): void {
    this.mainService.readonly();
  }

  addProduct(): void {
    const modal = this.modalController.create(AddProductPopups);
    modal.onDidDismiss(data => {
      if(data){
        this.productList.push(data);
        this.total+=data.unit_price;
      }
    });
    modal.present();
  }

  autocomplete(): void {
    this.mainService.autocomplete(this.shipperList, this.getValue.bind(this));
  }

  createForm(): void {
    this.form = this.fb.group({
      code: ['', Validators.compose([
        Validators.required
      ])],
      shipper: 'true',
    });
  }

  declareTracking(): void {
    if(this.form.value.shipper === 'false'){
      this.shipper = '-2';
    }
    this.data = {
      sessionId: this.sessionId,
      packageId: this.navParams.data.package_id,
      shipper: this.shipper,
      declarationDetailsJson: JSON.stringify(this.productList)
    };
    console.log(this.data);
    this. subscription = this.declarationService.declareTracking('declareTracking', this.data).subscribe(data => {
      if(data.message.status === "OK")
        this.modalController.create(SuccessPopups).present();
      this.subscription.unsubscribe();
    });
  }

  getDeclaration(): void {
    this.data = {
      sessionId: this.sessionId,
      packageId: this.navParams.data.package_id
    };
    this.subscription = this.declarationService.getDeclaration('getDeclaration', this.data).subscribe(data => {
      if(data.message.declaration) {
        this.productList = data.message.declaration.goods;
        for(let i = 0; i < this.productList.length; i++) {
          this.total+=parseFloat(this.productList[i].unit_price);
        }
      }
      this.subscription.unsubscribe();
    });
  }

  getShipers(): void {
    this.declarationService.getShippers('getShippers', {sessionId: this.sessionId}).subscribe(data => {
      this.shipperList = Object.keys(data.message.data).map(key => data.message.data[key]);
    });
  }

  getValue(event, ui): void {
    if(ui.item)
      this.shipper = ui.item.value;
  }

  removeProduct(index: number): void {
    const modal = this.modalController.create(WarningPopups,{notice:notice.rm});
    modal.onDidDismiss(data => {
      if(data){
        this.total-=this.productList[index].unit_price;
        this.productList.splice(index,1);
      }
    });
    modal.present();
  }

}
