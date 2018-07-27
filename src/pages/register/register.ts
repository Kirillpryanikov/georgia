import {Component, OnDestroy, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from "@angular/forms";
import { ScriptRegisterService } from '@core/script.data/script.register.service';
import {RegistrationService, SettingService} from '@core/services';
import { Subscription } from "rxjs/Subscription";
import {ScriptMainService} from "@core/script.data/script.main.service";
import {TranslateService} from "@ngx-translate/core";

@IonicPage({
  name: 'register-page'
})
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  styleUrls: ['/register.scss']
})
export class RegisterPage implements OnInit, OnDestroy {
  protected form: FormGroup;
  private streetsList: Array<string>;
  private registrationObservable: Subscription;
  private data;
  private submitted: boolean = false;
  private non_georgian_citizen = 0;
  private organization = "INDIVIDUAL";

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private translate: TranslateService,
              private viewController: ViewController,
              private registerScriptService: ScriptRegisterService,
              private fb: FormBuilder,
              private registrationService: RegistrationService,
              private settingService: SettingService,
              private mainService: ScriptMainService) {

  }

  ngOnInit() {
    this.getStreets();
  }

  ionViewCanEnter() {
    this.initForm();
    // this.initDropdown();
  }

  initDropdown() {
    // this.registerScriptService.dropdown();
  }

  initForm() {
    this.form = this.fb.group({
      first_name: ['', Validators.compose([
        Validators.required
      ])],
      last_name: ['', Validators.required],
      first_name_georgian: ['', Validators.required],
      last_name_georgian: ['', Validators.required],
      organization: [''],
      checkbox1: false,
      checkbox2: false,
      id_number_11:['', [ Validators.required]],
      email: ['', Validators.email],
      phone: ['', [Validators.required]],
      city: ['', Validators.required],
      address_1: ['', Validators.required],
      address_2: ['', Validators.required],
      password: ['', [Validators.required]],
      confirm_password: [''],
      default_branch: ['', Validators.required]
    }, {
      validator: this.comparePassword('password', 'confirm_password')
    })
  }

  submit() {
    this.submitted = true;
    if(!this.form.invalid){
      this.register();
      this.registerScriptService.offClick();
      this.navCtrl.push('authorization-page');
    }
  }

  register() {
    switch (this.form.value.checkbox2) {
      case true:
        this.non_georgian_citizen = 1;
        this.form.patchValue({
          checkbox1: false
        });
        break;
      case false:
        this.non_georgian_citizen = 0;
        break;
    }
    switch (this.form.value.checkbox1) {
      case true:
        this.organization = 'ORGANIZATION';
        break;
      case false:
        this.organization = 'INDIVIDUAL';
        this.form.patchValue({
          organization: ''
        });
        break;
    }
    this.data = {
      customerInfo: JSON.stringify({
        firstName: this.form.value.first_name,
        firstNameGe: this.form.value.first_name_georgian,
        lastName: this.form.value.last_name,
        lastNameGe: this.form.value.last_name_georgian,
        identification: this.form.value.id_number_11,
        email: this.form.value.email,
        mobile: this.form.value.phone,
        customerType: this.organization,
        organizationName: this.form.value.organization,
        city: this.form.value.city,
        streetId: this.form.value.address_1,
        address: this.form.value.address_2,
        password: this.form.value.password,
        retryPassword: this.form.value.confirm_password,
        nonGeorgianCitizen: this.non_georgian_citizen,
        language: 'en',
        defaultBranch: this.form.value.default_branch
      })
    };
    this.registrationService.register('register', this.data).subscribe(data => {
    })
  }

  comparePassword(password, confirm) {
    return (group: FormGroup) => {
      if(group.controls[password].value === group.controls[confirm].value) {
        return null;
      } else {
        return {'comparePassword': true}
      }
    }
  }

  getStreets() {
    this.settingService.getStreets('getStreets', {language: 'en'}).subscribe(data => {
      this.streetsList = Object.keys(data.message.data).map(key => data.message.data[key]);
    })
  }

  autocomplete(): void {
    this.mainService.autocomplete(this.streetsList, this.getValue.bind(this));
  }

  getValue(event, ui): void {
    if(ui.item)
      this.form.patchValue({address_1: ui.item.value});
  }

  ngOnDestroy() {
    if(this.registrationObservable)
      this.registrationObservable.unsubscribe();
  }
}
