import {
  Component, OnDestroy, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit, Input,
  HostListener
} from '@angular/core';
import {Platform, ViewController, NavParams, NavController} from 'ionic-angular';
import { ScriptService } from '@core/script.data/script.scriptjs.service';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import {ScriptMainService} from "@core/script.data/script.main.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'add-product-popup',
  templateUrl: './add-product-popups.html',
  styleUrls: ['/add-product-popups.scss'],
})
export class AddProductPopups implements OnDestroy, OnInit, AfterViewInit {
  @ViewChild('popup') popup : ElementRef;

  productForm: FormGroup;
  product = {
    code:'',
    description: '',
    unit_price: 0,
    unit_count: 0
  };

  constructor(private renderer: Renderer2,
              private platform: Platform,
              private scriptService: ScriptService,
              private viewCtrl: ViewController,
              private navCtrl: NavController,
              private navParams: NavParams,
              private nativePageTransitions: NativePageTransitions,
              private mainService: ScriptMainService,
              private fb: FormBuilder) {}

  ngOnInit() {
    this.mainService.radio();
    this.createFormAddProduct();
  }

  ionViewWillLeave() {
    this.nativePageTransitions.flip({})
      .then(onSuccess => { console.log('onSuccess') })
      .catch(onError => { console.log('onError') });
  }

  @HostListener('document:click', ['$event.target.tagName'])
  public documentClick(e) {
    if(e === 'ION-CONTENT')
      this.close();
    if(e === 'ION-BACKDROP')
      this.scriptService.closePopup();
  }

  ngAfterViewInit() {
    this.scriptService.setPositionCenter(this.popup);
  }

  close() {
    this.scriptService.closePopup();
    this.viewCtrl.dismiss();
  }

  addProduct() {
    switch (this.productForm.value.code) {
      case '9603':
        this.product.description = 'Other consumer products';
        break;
      case '8708':
        this.product.description = 'Auto Parts';
        break;
      case "71171999000":
        this.product.description = 'Bijouterie, jewellery';
        break;
      case "9405":
        this.product.description = 'Lighting, chandeliers, headlights, lighting equipments';
        break;
      case "8205":
        this.product.description = 'Tools';
        break;
      case "8471":
        this.product.description = 'Computers, laptops, computer parts';
        break;
      case "3004":
        this.product.description = 'Medicine';
        break;
      case "7013":
        this.product.description = 'Glass products';
        break;
      case "9207":
        this.product.description = 'Music instruments &amp; parts';
        break;
      case "0602":
        this.product.description = 'Plants';
        break;
      case "4901":
        this.product.description = 'Printing products, books, brochures';
        break;
      case "8525":
        this.product.description = 'Photo &amp; Video Equipment';
        break;
      case "3304":
        this.product.description = 'Perfumery &amp; Cosmetics';
        break;
      case "9102":
        this.product.description = 'Watches';
        break;
      case "9504":
        this.product.description = 'Toys and Sport Equipment';
        break;
      case "2106":
        this.product.description = 'Supplements';
        break;
      case "6204":
        this.product.description = 'Clothing';
        break;
      case "8517":
        this.product.description = 'Phone, network equipment';
        break;
      case "6403":
        this.product.description = 'Footwear';
        break;
      case "4202":
        this.product.description = 'Bags';
        break;
      case "8543":
        this.product.description = 'Different electronic and consumer products';
        break;
    }
    this.product.code = this.productForm.value.code;
    this.product.unit_price = parseFloat(this.productForm.value.unit_price);
    this.product.unit_count++;
    this.scriptService.closePopup();
    this.viewCtrl.dismiss(this.product);
  }

  createFormAddProduct() {
    this.productForm = this.fb.group({
      unit_price: ['', Validators.compose([
        Validators.required
      ])],
      code: ['', Validators.compose([
        Validators.required
      ])]
    });
  }

  ngOnDestroy() {}
}