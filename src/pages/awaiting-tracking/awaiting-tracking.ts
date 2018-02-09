import {Component, OnInit, OnDestroy, ViewChild, ElementRef, Renderer2} from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { FormBuilder, FormGroup } from "@angular/forms";
import { WarningPopups } from '@shared/popups/warning-popup-component/warning-popups';
import { AwaitingTrackingService } from '@core/services/awaiting-tracking';
import { ScriptService } from '@core/script.data/script.scriptjs.service';
import { PopupService } from '@core/services/popup';
import { Observable } from "rxjs/Observable";

/**
 * Временное решение, пока не получил ответа по поводу языков/
 * @type {{insurance: string; cut_down: string}}
 */
const notice = {
  insurance: 'Please confirm you\'d like to enable Risk Free shipping service for your packages.',
  cut_down: 'Please note, that by unchecking Cut Down service, you may get a huge box that stores usually send ' +
            'to us in USA, which will result into dramatical increase of shipping price to Tbilisi. See Cut Down servic' +
            ' terms under Agreement, Paragraph 3.'
};

@IonicPage({
  name: "page-awaiting-tracking"
})
@Component({
  selector: 'page-awaiting-tracking',
  templateUrl: 'awaiting-tracking.html',
})
export class AwaitingTrackingPage implements OnInit, OnDestroy {
  @ViewChild('u2ginfo') u2ginfo: ElementRef;
  private seqAwaitingTracking: Observable<any>;

  private arrRiskFree: ElementRef[];
  private arrDownPackage: ElementRef[];
  private form: FormGroup;
  private listAwaitingTracking = [
    {
      package_id:7965559,
      "tracking":"6667778889",
      "client_comment":"",
      insurance: 0,
      "global_repacking":"1",
      cut_down: false,
      "put_into_bag":"1",
      "declared":1
    },
    {
      package_id:7965800,
      "tracking":"6667778001",
      "client_comment":"My wife's shoes",
      insurance: 1,
      "global_repacking":"1",
      cut_down: false,
      "put_into_bag":"1",
      "declared":1
    }
  ];

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private fb: FormBuilder,
              private modalController: ModalController,
              private awaitingService: AwaitingTrackingService,
              private scriptService: ScriptService,
              private popupService: PopupService) {}

  ngOnInit() {
    /**
     * Request. Get awaiting tracking
     */
    // this.seqAwaitingTracking = this.awaitingService.getAwaiting('session')
  }

  ionViewDidLoad() {
    this.arrRiskFree = this.u2ginfo.nativeElement.querySelectorAll('.risk-free-shipping_js input');
    this.arrDownPackage = this.u2ginfo.nativeElement.querySelectorAll('.cut-down-package_js');
  }

  showPopup(index, checkbox) {
    if(this.listAwaitingTracking[index][checkbox] === 1) {
      this.listAwaitingTracking[index][checkbox] = 0;
      return false;
    }

    let modal;
    switch (checkbox) {
      case 'insurance':
        this.scriptService.checkboxSelect(this.arrRiskFree[index]);
        modal = this.modalController.create(WarningPopups, {notice: notice[checkbox]});
        break;
      case 'cut_down':
        modal = this.modalController.create(WarningPopups, {notice: notice[checkbox]});
        break;
      default: return;
    }
    modal.onDidDismiss(data => {
      if(data) {
        this.listAwaitingTracking[index][checkbox] = 1;
      } else {
        this.listAwaitingTracking[index][checkbox] = 0;
      }
      /**
       * request. Change package
       */
      this.changePackageSetting(this.listAwaitingTracking[index].package_id, checkbox, this.listAwaitingTracking[index][checkbox]);
    });
    modal.present();
  }

  changePackageSetting($packageId: number, $key: string, $value: number) {
    const params = {
      $sessionId: '',
      $packageId,
      $key,
      $value
    };
    /**
     * Нужно раскоментировать когда будет апи
     */
    // this.popupService.changePackageSetting(params);
  }

  ngOnDestroy() {}
}
