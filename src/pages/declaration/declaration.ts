import {Component, OnInit, OnChanges} from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';
import { AddProductPopups } from "@shared/popups/add-product-popup-component/add-product-popups";
import { WarningPopups } from "@shared/popups/warning-popup-component/warning-popups";
import { DeclarationService } from "@core/services";
import { ScriptMainService } from "@core/script.data/script.main.service";
import { SuccessPopups } from "@shared/popups/success-popup-component/success-popups";
import { Subscription } from "rxjs/Subscription";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

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
export class DeclarationPage implements OnInit, OnChanges{

  productList = [];
  sessionId = '707d235b00280e693eab0496acb2690d';
  total: number = 0;
  data;
  form: FormGroup;
  subscription: Subscription;
  shipperList;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private modalController: ModalController,
              private declarationService: DeclarationService,
              private mainService: ScriptMainService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.createForm();
  }

  ngOnChanges(event) {
    console.log('Event ', event);
  }

  ionViewDidLoad() {
    this.mainService.readonly();
    this.getDeclaration();
    this.getshipers();
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
    console.log('this.form.value::',this.form.value);
    this.data = {
      sessionId: this.sessionId,
      packageId: this.navParams.data.package_id,
      shipper: this.form.value.code,
      declarationDetailsJson: JSON.stringify(this.productList)
    };
    console.log(this.data);
    this. subscription = this.declarationService.declareTracking('declareTracking', this.data).subscribe(data => {
      if(data.message.status === "OK")
        this.modalController.create(SuccessPopups).present();
      this.subscription.unsubscribe();
    });
  }

  autocomplete(e) {
    console.log(e)
    this.mainService.autocomplete(this.shipperList);
  }

  getshipers() {
    this.declarationService.getShippers('getShippers', {sessionId: this.sessionId}).subscribe(data => {
      this.shipperList = Object.keys(data.message.data).map(key => data.message.data[key]);
    });
  }

  getDeclaration() {
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

  createForm() {
    this.form = this.fb.group({
      code: ['', Validators.compose([
        Validators.required
      ])]
    });
  }
}
