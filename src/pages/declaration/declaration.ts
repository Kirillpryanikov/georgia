import {Component, OnDestroy, OnInit} from '@angular/core';
import {IonicPage, LoadingController, ModalController, NavController, NavParams} from 'ionic-angular';
import { AddProductPopups } from "@shared/popups/add-product-popup-component/add-product-popups";
import { WarningPopups } from "@shared/popups/warning-popup-component/warning-popups";
import {DeclarationService, HeaderService} from "@core/services";
import { ScriptMainService } from "@core/script.data/script.main.service";
import { SuccessPopups } from "@shared/popups/success-popup-component/success-popups";
import { Subscription } from "rxjs/Subscription";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {NativeStorage} from "@ionic-native/native-storage";
import {ErrorPopups} from "@shared/popups/error-popup-component/error-popups";
import {TranslateService} from "@ngx-translate/core";

/**
 * Generated class for the DeclarationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
const notice = {
  rm: '_PARCEL_REMOVE_CONFIRMATION',
};

@IonicPage({
  name: 'declaration-page'
})
@Component({
  selector: 'page-declaration',
  templateUrl: 'declaration.html',
})
export class DeclarationPage implements OnInit, OnDestroy{

  productList: Array<any> = [];
  public logoWrapper = '_DECLARATION';
  sessionId: string;
  total: number = 0;
  data: Object;
  form: FormGroup;
  subscription: Subscription;
  shipper: string;
  load;
  updateNotification;
  shipperList: Array<string>;
  is_organization: boolean;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private modalController: ModalController,
              private declarationService: DeclarationService,
              private mainService: ScriptMainService,
              private fb: FormBuilder,
              private loadingCtrl: LoadingController,
              private translate: TranslateService,
              private nativeStorage: NativeStorage,
              private headerService: HeaderService) {
  }

  ngOnInit(): void {
    this.createForm();
    this.nativeStorage.getItem('sessionId')
      .then(res => {
        this.sessionId = res;
        this.getInfo();
        this.getDeclaration();
        this.getShipers();
      });
  }

  ionViewDidLoad(): void {
    this.mainService.readonly();
  }

  getInfo() {
    this.subscription = this.headerService.getInfo('getInfo', {sessionId: this.sessionId}).subscribe(data => {
      this.is_organization = data.message.profile.is_organization;
      this.subscription.unsubscribe();
    })
  }

  navTo(e, page) {
    e.preventDefault();
    if(this.navCtrl.getActive().id !== page)
      this.navCtrl.setRoot(page);
  }

  addProduct(): void {
    const modal = this.modalController.create(AddProductPopups, {is_organization: this.is_organization});
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
      shipper: this.shipper || this.form.value.code,
      declarationDetailsJson: JSON.stringify(this.productList)
    };
    this. subscription = this.declarationService.declareTracking('declareTracking', this.data).subscribe(data => {
      if(data.message.status === "OK"){
        this.modalController.create(SuccessPopups).present();
        this.getNotifications();
      }
      else
        this.modalController.create(ErrorPopups, {notice: data.message.message}).present();
      this.subscription.unsubscribe();
    });
  }

  getNotifications() {
    this.headerService.getNotifications('getNotifications', {sessionId: this.sessionId}).subscribe(data => {
      this.updateNotification = data.message.undeclared_trackings.count;
    })
  }

  getDeclaration(): void {
    this.load = this.loadingCtrl.create({
      spinner: 'dots'
    });
    this.load.present();
    this.data = {
      sessionId: this.sessionId,
      packageId: this.navParams.data.package_id
    };
    this.declarationService.getDeclaration('getDeclaration', this.data).subscribe(data => {
      if(data.message.declaration.shipper && (data.message.declaration.shipper.length > 3)){
        this.form.patchValue({
          code: data.message.declaration.shipper,
        });
      } else if(data.message.declaration.shipper_id === '-2'){
        this.form.patchValue({
          shipper: 'false',
        });
      }
      if(data.message.declaration) {
        this.productList = data.message.declaration.goods;
        for(let i = 0; i < this.productList.length; i++) {
          this.total+=parseFloat(this.productList[i].unit_price);
        }
      }
      this.load.dismiss();
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

  ngOnDestroy() {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

}
