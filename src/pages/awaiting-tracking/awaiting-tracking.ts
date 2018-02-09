import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { FormBuilder, FormGroup } from "@angular/forms";
import { RiskFreeShipping } from '@shared/popups/risk-free-shipping.component/risk-free-shipping'
@IonicPage({
  name: "page-awaiting-tracking"
})
@Component({
  selector: 'page-awaiting-tracking',
  templateUrl: 'awaiting-tracking.html',
})
export class AwaitingTrackingPage implements OnInit, OnDestroy {
  private form: FormGroup;
  private listAwaitingTracking = [];

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private fb: FormBuilder,
              private modalController: ModalController) {}

  ngOnInit() {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AwaitingTrackingPage');
  }

  initForm() {}

  showPopup() {
    const modal = this.modalController.create(RiskFreeShipping);
    modal.onDidDismiss(data => {
      if(data) {
        /**
         * isCheck true
         */
        console.log('TRUE');
      } else {
        /**
         * isCheck false
         */
        console.log('FALSE');
      }
    });
    modal.present();
  }

  ngOnDestroy() {}
}
