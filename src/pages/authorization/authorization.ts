import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage({
  name: 'authorization-page'
})
@Component({
  templateUrl: 'authorization.component.html',
})
export class Authorization {
  constructor(public navCtrl: NavController) {}
}
