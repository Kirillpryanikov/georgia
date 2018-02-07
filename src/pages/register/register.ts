import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { ScriptRegisterService } from '@core/script.data/script.register.service';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'register-page'
})
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  protected form: FormGroup;

  constructor(public navCtrl: NavController,
              private navParams: NavParams,
              private viewController: ViewController,
              private registerService: ScriptRegisterService,
              private fb: FormBuilder) {}

  ionViewCanEnter() {
    this.initForm();
    this.initDropdown();
    this.initCheckout();
  }

  initDropdown() {
    this.registerService.dropdown();
  }

  initCheckout() {
    this.registerService.checkbox();
  }

  initForm() {
    this.form = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      first_name_georgian: ['', Validators.required],
      last_name_georgian: ['', Validators.required],
      organization: ['', Validators.required],
      checkbox1: false,
      checkbox2: false,
      id_number_11:['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      address_1: ['', Validators.required],
      address_2: ['', Validators.required],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required],
      default_branch: ['', Validators.required]
    })
  }

  submit() {
    console.log(this.form.value);

    this.registerService.offClick();
    this.navCtrl.push('authorization-page');
    // this.viewController.dismiss();
  }

  ionViewDidLoad() {}
}
