import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ScriptMainService } from "@core/script.data/script.main.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'settings-page'
})
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage implements OnInit, OnDestroy{

  form: FormGroup;
  photo;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private mainService: ScriptMainService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.createForm();
  }

  tabsSetting() {
    this.mainService.tabsSetting();
  }

  ionViewDidLoad() {
    this.tabsSetting();
  }

  submit() {
    console.log(this.form.controls.profilePhoto.value);
  }

  upload(e) {
    console.log(e.target.files[0]);
    this.photo = e.target.files[0].name;
  }

  createForm(){
    this.form = this.fb.group({
      profilePhoto: [],
      firstName: ['', Validators.compose([
        Validators.required
      ])],
      lastName: ['', Validators.compose([
        Validators.required
      ])],
      firstNameGeorgian: ['', Validators.compose([
        Validators.required
      ])],
      lastNameGeorgian: ['', Validators.compose([
        Validators.required
      ])],
      cellPhone: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^\d+$/),
        Validators.minLength(6)
      ])],
      email: ['', Validators.compose([
        Validators.email
      ])],
      country: ['', Validators.compose([
        Validators.required
      ])],
      city: ['', Validators.compose([
        Validators.required
      ])],
      address_1: ['', Validators.compose([
        Validators.required
      ])],
      address_2: ['', Validators.compose([
        Validators.required
      ])],
      checkbox1: false,
      checkbox2: false
    });
  }

  ngOnDestroy() {

  }

}
