import { Component } from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
console.log('AuthorizationComponent !!!! --- 1');

@IonicPage()
@Component({
  selector: "authorization-page",
  templateUrl: 'authorization.component.html',
})
export class AuthorizationComponent {
  constructor(public navCtrl: NavController) {
    console.log('AuthorizationComponent !!!! --- 2')
  }
}
