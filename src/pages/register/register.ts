import { Component, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from "@angular/forms";
import { ScriptRegisterService } from '@core/script.data/script.register.service';
import { RegistrationService } from '@core/services';
import { Subscription } from "rxjs/Subscription";

@IonicPage({
  name: 'register-page'
})
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage implements OnDestroy {
  protected form: FormGroup;
  private registrationObservable: Subscription;

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private viewController: ViewController,
              private registerScriptService: ScriptRegisterService,
              private fb: FormBuilder,
              private registrationService: RegistrationService) {}

  ionViewCanEnter() {
    this.initForm();
    this.initDropdown();
    this.initCheckout();
  }

  initDropdown() {
    this.registerScriptService.dropdown();
  }

  initCheckout() {
    this.registerScriptService.checkbox();
  }

  initForm() {
    this.form = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      first_name_georgian: ['', Validators.required],
      last_name_georgian: ['', Validators.required],
      organization: '',
      checkbox1: false,
      checkbox2: false,
      id_number_11:['', [ Validators.required, Validators.minLength(11)]],
      email: ['', Validators.email],
      phone: ['', [Validators.required, Validators.minLength(6)]],
      city: ['', Validators.required],
      address_1: ['', Validators.required],
      address_2: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirm_password: ['', [Validators.required, Validators.minLength(4)]],
      default_branch: ['', Validators.required]
    }, {
      validator: this.comparePassword
    })
  }

  submit() {
    this.registerScriptService.offClick();
    this.navCtrl.push('authorization-page');
    this.registrationObservable = this.registrationService.registration(this.form.value)
      .subscribe(() => this.navCtrl.push('page-awaiting-tracking'))
  }

  private comparePassword(AC: AbstractControl) {
    if(AC.get('password').value != AC.get('confirm_password').value) {
      AC.get('confirm_password').setErrors({MatchPassword: true})
    } else {
      return null;
    }
  }

  ngOnDestroy() {
    if(this.registrationObservable) this.registrationObservable.unsubscribe();
  }
}
