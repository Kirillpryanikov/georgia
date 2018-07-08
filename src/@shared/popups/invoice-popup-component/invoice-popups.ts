import { Component, OnDestroy, OnInit, ViewChild, HostListener, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import {Platform, ViewController, NavParams, ModalController} from 'ionic-angular';
import { ScriptService } from '@core/script.data/script.scriptjs.service';
import { ScriptMainService } from "@core/script.data/script.main.service";
import { PopupService } from "@core/services";
import { NativeStorage } from "@ionic-native/native-storage";
import { Camera, CameraOptions } from '@ionic-native/camera';
import * as $ from 'jquery'
import {Subscription} from "rxjs/Subscription";
import {WarningPopups} from "@shared/popups/warning-popup-component/warning-popups";
@Component({
  selector: 'invoice-popup',
  templateUrl: './invoice-popups.html',
  styleUrls: ['/invoice-popups.scss'],
})
export class InvoicePopups implements OnDestroy, OnInit, AfterViewInit {
  @ViewChild('popup') popup : ElementRef;
  private file: string = '';
  private data;
  private sessionId: string;
  private filename: any;
  private listFiles: any = [];
  private disable: boolean;
  private subscription: Subscription;
  constructor(private renderer: Renderer2,
              private platform: Platform,
              private scriptService: ScriptService,
              private viewCtrl: ViewController,
              private modalCtrl: ModalController,
              private navParams: NavParams,
              private reader: FileReader,
              private popupService: PopupService,
              private nativeStorage: NativeStorage,
              private camera: Camera) {

  }

  ngOnInit() {
    this.nativeStorage.getItem('sessionId')
      .then(res => {
        this.sessionId = res;
        this.getListOfUploadedInvoices();
      });
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

  upload() {
    this.data = {
      sessionId: this.sessionId,
      packageId: this.navParams.data.package_id,
      base64data: this.file.split(',')[1],
      extention: this.file.split(',')[0].split(/,|\/|:|;/)[2]
    };
    this.subscription = this.popupService.uploadInvoice('uploadInvoice', this.data).subscribe(data => {
      this.subscription.unsubscribe();
    });
    this.disable = false;
    this.close(true);
  }

  close(data?: boolean) {
    this.scriptService.closePopup();
    this.viewCtrl.dismiss(data);
  }

  addFile(e) {
    if(e.target.files[0]) {
      this.reader.readAsDataURL(e.target.files[0]);
      this.reader.onloadend = () => {
        this.file = this.reader.result;
        this.listFiles.push('invoice.jpg');
        this.disable = true;
      }
    }
  }

  createPhotoInvoice() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options).then((imageData) => {
      this.file = 'data:image/jpeg;base64,' + imageData;
      if(this.file !== '') {
       this.listFiles.push('invoice.jpg');
       this.disable = true;
      }
    });
  }

  removeUploadInvoice(index) {
    const modal = this.modalCtrl.create(WarningPopups, {notice: "_DELETE_INVOICE"});
    modal.onDidDismiss(data => {
      if(data){
        this.data = {
          sessionId: this.sessionId,
          packageId: this.navParams.data.package_id,
          filename: this.listFiles[index]
        };
        this.popupService.removeInvoice('removeInvoice', this.data).subscribe(data => {
          this.filename = false;
        })
      }
    });
    modal.present();
    this.file = '';
  }

  getListOfUploadedInvoices() {
    this.data = {
      sessionId: this.sessionId,
      packageId: this.navParams.data.package_id,
    };
    this.subscription = this.popupService.getListOfUploadedInvoices('getListOfUploadedInvoices', this.data).subscribe(data => {
      if(data.message.files && data.message.files.length > 0) {
        this.listFiles = data.message.files;
        if(this.listFiles.length >= 3)
          this.disable = true;
      }
      this.subscription.unsubscribe();
    })
  }

  ngOnDestroy() {}
}
