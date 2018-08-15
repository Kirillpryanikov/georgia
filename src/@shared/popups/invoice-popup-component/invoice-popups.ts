import { Component, OnDestroy, OnInit, ViewChild, HostListener, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import {Platform, ViewController, NavParams, ModalController, LoadingController} from 'ionic-angular';
import { ScriptService } from '@core/script.data/script.scriptjs.service';
import { PopupService } from "@core/services";
import { NativeStorage } from "@ionic-native/native-storage";
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Subscription} from "rxjs/Subscription";
import { WarningPopups} from "@shared/popups/warning-popup-component/warning-popups";
import {SuccessPopups} from "@shared/popups/success-popup-component/success-popups";
@Component({
  selector: 'invoice-popup',
  templateUrl: './invoice-popups.html',
  styleUrls: ['/invoice-popups.scss'],
})
export class InvoicePopups implements OnDestroy, OnInit, AfterViewInit {
  @ViewChild('popup') popup : ElementRef;
  public file: Array<string> = [];
  public disable_upload_btn: boolean;
  private data;
  public temp: boolean = false;
  private sessionId: string;
  private filename: any;
  private listFiles: any = [];
  private disable: boolean;
  private load;
  private addingFiles: Array<any> = [];
  private subscription: Subscription;
  constructor(private renderer: Renderer2,
              private platform: Platform,
              private scriptService: ScriptService,
              private viewCtrl: ViewController,
              private modalCtrl: ModalController,
              private navParams: NavParams,
              private reader: FileReader,
              private loadingCtrl: LoadingController,
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
    if(this.addingFiles.length){
      this.load = this.loadingCtrl.create({
        spinner: 'dots'
      });
      this.load.present();
      for(let i = 0; i < this.addingFiles.length; i++){
        this.disable_upload_btn = true;
        this.data = {
          sessionId: this.sessionId,
          packageId: this.navParams.data.package_id,
          base64data: this.addingFiles[i].split(',')[1],
          extention: this.addingFiles[i].split(',')[0].split(/,|\/|:|;/)[2]
        };
        this.subscription = this.popupService.uploadInvoice('uploadInvoice', this.data).subscribe(data => {
          this.load.dismiss();
          this.disable_upload_btn = false;
          this.close();
          this.subscription.unsubscribe();
        });
      }
    }
  }

  close(data?: boolean) {
    this.scriptService.closePopup();
    this.viewCtrl.dismiss(data);
  }

  addFile(e) {
    if(e.target.files[0]) {
      this.reader.readAsDataURL(e.target.files[0]);
      this.reader.onloadend = () => {
        this.file.push(this.reader.result);
        this.listFiles.push('invoice.jpg');
        this.addingFiles.push(this.reader.result);
        if(this.listFiles.length >= 3)
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
      if(imageData) {
        this.file.push('data:image/jpeg;base64,' + imageData);
        this.listFiles.push('invoice.jpg');
        this.addingFiles.push('data:image/jpeg;base64,' + imageData);
        if(this.listFiles.length >= 3)
          this.disable = true;
      }
    });
  }

  removeUploadInvoice(index) {
    this.temp = true;
    setTimeout(() => {
      const modal = this.modalCtrl.create(WarningPopups, {notice: "_DELETE_INVOICE", remove: true});
      modal.onDidDismiss(data => {
        this.temp = false;
        if(data){
          this.data = {
            sessionId: this.sessionId,
            packageId: this.navParams.data.package_id,
            filename: this.listFiles[index]
          };
          this.subscription = this.popupService.removeInvoice('removeInvoice', this.data).subscribe(data => {
            this.filename = false;
            if(this.listFiles.length >= 3)
              this.disable = true;
            else
              this.disable = false;
            this.subscription.unsubscribe();
          });
          this.listFiles.splice(index,1);
          this.file.splice(index, 1);
        }
      });
      modal.present();
    }, 100);
  }

  getListOfUploadedInvoices() {
    this.data = {
      sessionId: this.sessionId,
      packageId: this.navParams.data.package_id,
    };
    this.subscription = this.popupService.getListOfUploadedInvoices('getListOfUploadedInvoices', this.data).subscribe(data => {
      if(data.message.files && data.message.files.length > 0) {
        for (let i in data.message.files) {
          this.file.push(data.message.files[i]);
          this.listFiles.push(data.message.files[i]);
        }
        if(this.listFiles.length >= 3)
          this.disable = true;
      }
      this.subscription.unsubscribe();
    });
  }

  ngOnDestroy() {
    if(this.subscription)
      this.subscription.unsubscribe();
    this.close();
  }
}
