import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@IonicPage({
  name: 'page-set-pin'
})
@Component({
  selector: 'page-set-pincode',
  templateUrl: 'set-pincode.html',
})
export class SetPincodePage implements OnInit{
  private form: FormGroup;

  @ViewChild('inputFirstPin') inputFirstPin;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.initForm();
  }

  ionViewDidLoad() {
    console.log('121212',this.inputFirstPin);
    setTimeout(() => {
      if (this.inputFirstPin) {
        this.inputFirstPin.nativeElement.focus();
      }
    }, 800);
  }


  initForm() {
    this.form = this.fb.group({
      first:['', Validators.compose([
        Validators.required
      ])],
      second:['', Validators.compose([
        Validators.required
      ])],
      third:['', Validators.compose([
        Validators.required
      ])],
      fourth:['', Validators.compose([
        Validators.required
      ])]
    });
  }

  confirmPage() {
    if(this.form.valid)
      this.navCtrl.push('page-confirm-pincode',{ pin: this.form.value});
  }

}
