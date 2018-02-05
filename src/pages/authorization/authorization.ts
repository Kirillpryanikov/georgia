import { Component, ElementRef, ViewChild, Renderer2, OnInit } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage({
  name: 'authorization-page'
})
@Component({
  selector: 'authorization-page',
  templateUrl: 'authorization.component.html',
  styleUrls: ['/authorization.scss']
})
export class Authorization implements OnInit {
  @ViewChild('jsSwitch') jsSwitch: ElementRef;

  constructor(private navCtrl: NavController,
              private render: Renderer2) {}

  ngOnInit() {
    this.init();
  }

  init() {
    this.render.listen(this.jsSwitch.nativeElement, 'click', (event) => {
      let checkbox = this.jsSwitch.nativeElement.querySelectorAll('input')[0];
      event.preventDefault();
      console.log('      console  :::: ', checkbox.is(':not(:checked)'))
    })
  }

  goToRegisterPage() {
    this.navCtrl.push('register-page');
  }
}
