import { Component, ElementRef, ViewChild, Renderer2, OnInit, OnDestroy } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { FormBuilder, FormGroup } from "@angular/forms";
import { ScriptRegisterService } from '@core/script.data/script.register.service';

@IonicPage({
  name: 'authorization-page'
})
@Component({
  selector: 'authorization-page',
  templateUrl: 'authorization.component.html',
  styleUrls: ['/authorization.scss']
})
export class Authorization implements OnInit, OnDestroy {
  @ViewChild('jsSwitch') jsSwitch: ElementRef;
  protected form: FormGroup;

  constructor(private navCtrl: NavController,
              private fb: FormBuilder,
              private render: Renderer2,
              private registerService: ScriptRegisterService ) {}

  ngOnInit() {
    this.initForm();
    this.initCheckout();
  }

  initCheckout() {
    this.render.listen(this.jsSwitch.nativeElement, 'click', (event) => {
      this.registerService.checkbox(event);
    })
  }

  initForm() {
    this.form = this.fb.group({
      email: '',
      password: '',
      checkbox: false
    })
  }

  submit(){
    console.log('Submit');
  }

  goToRegisterPage() {
    console.log('Remove Listener !!!');
    this.navCtrl.push('register-page');
  }

  ngOnDestroy() {}
}
