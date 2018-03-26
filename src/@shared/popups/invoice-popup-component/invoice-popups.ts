import { Component, OnDestroy, OnInit, ViewChild, HostListener, ElementRef, Renderer2, AfterViewInit, Input } from '@angular/core';
import { Platform, ViewController, NavParams } from 'ionic-angular';
import { ScriptService } from '@core/script.data/script.scriptjs.service';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { ScriptMainService } from "@core/script.data/script.main.service";
import { PopupService } from "@core/services";
import { NativeStorage } from "@ionic-native/native-storage";
import { Camera, CameraOptions } from '@ionic-native/camera';
import * as $ from 'jquery'
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
  constructor(private renderer: Renderer2,
              private platform: Platform,
              private scriptService: ScriptService,
              private viewCtrl: ViewController,
              private navParams: NavParams,
              private nativePageTransitions: NativePageTransitions,
              private mainService: ScriptMainService,
              private reader: FileReader,
              private popupService: PopupService,
              private nativeStorage: NativeStorage,
              private camera: Camera) {

  }

  ngOnInit() {
    this.nativeStorage.getItem('sessionId')
      .then(res => {
        this.sessionId = res;
      });
    this.mainService.invoiceFileAdd();
    this.mainService.invoiceFileRemove();
  }

  @HostListener('document:click', ['$event.target.tagName'])
  public documentClick(e) {
    if(e === 'ION-CONTENT')
      this.close();
    if(e === 'ION-BACKDROP')
      this.scriptService.closePopup();
  }

  ionViewWillLeave() {
    this.nativePageTransitions.flip({})
      .then(onSuccess => { console.log('onSuccess') })
      .catch(onError => { console.log('onError') });
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
    console.log(this.data);
    this.popupService.uploadInvoice('uploadInvoice', this.data).subscribe(data => {
      console.log(data);
    });
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
      if(this.file === '') {
        $('.invoice-input_js').val('');

        $('.u2g-file-name').text('');

        $('.remove-file_js').removeClass('u2g-remove-file--chosen');
      }
    }).catch((err) => {
      console.log(err);
      $('.invoice-input_js').val('');

      $('.u2g-file-name').text('');

      $('.remove-file_js').removeClass('u2g-remove-file--chosen');
    });
    return 'invoice.jpg'
  }

  ngOnDestroy() {}
}
