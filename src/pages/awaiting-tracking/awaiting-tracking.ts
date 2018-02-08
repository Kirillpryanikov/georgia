import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@IonicPage({
  name: "page-awaiting-tracking"
})
@Component({
  selector: 'page-awaiting-tracking',
  templateUrl: 'awaiting-tracking.html',
})
export class AwaitingTrackingPage implements OnInit {

  private form: FormGroup;
  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private fb: FormBuilder) {}

  ngOnInit() {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AwaitingTrackingPage');
  }

  initForm() {
    // this.form = this.fb.group({
    //
    // })
  }
}
