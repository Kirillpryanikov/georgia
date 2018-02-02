import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AboutPage} from "@pages/about/about";

@Component({
  selector: "home-page",
  templateUrl: 'home.component.html',
})
export class HomeComponent {
  constructor(public navCtrl: NavController) {}

  goToClick() {
  }
}
