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
  private count: number = 0;
  private pin: string = '';

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
  }

  ngOnInit() {

  }

  ionViewDidLoad() {

  }

  writePin(key){
    switch (key){
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
      case 0:
        const a = document.getElementById(`_${this.count}`);
        if(a){
          this.pin+=key;
          a.style.color = '#666666';
          this.count++;
          if(this.pin.length === 4){
            this.confirmPage();
          }
        }
        break;
      case 'delete':
        const b: any = document.getElementsByClassName('input_pin');
        if(b){
          this.pin = '';
          this.count = 0;
          for(let i = 0; i < b.length; i++){
            b[i].style.color = '#ffffff';
          }
        }
        break;
      case 'remove':
        if(this.count > 0)
          this.count--;
        const c = document.getElementById(`_${this.count}`);
        if(c){
          this.pin = this.pin.substring(0, this.pin.length - 1);
          c.style.color = '#ffffff';
        }
        break;
    }
  }

  confirmPage() {
    this.navCtrl.push('page-confirm-pincode',{ pin: this.pin});
  }

}
