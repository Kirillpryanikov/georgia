import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
console.log('home page import');

@IonicPage({
    name: "home-page",
})
@Component({
  templateUrl: 'home.component.html',
})
export class Home {
  constructor(public navCtrl: NavController) {
    console.log('home page constructor')
  }

  goToClick() {
    this.navCtrl.push("authorization-page")
  }
}
