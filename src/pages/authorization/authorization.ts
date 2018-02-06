import { Component, ElementRef, ViewChild, Renderer2, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
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
  @ViewChild('jsorganization') jsOrganization: ElementRef;
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
    this.registerService.checkbox();
  }

  initForm() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      organization: new FormControl('')
    })
  }

  submit() {
    const organization = this.jsOrganization.nativeElement.querySelector('.organization_field_c');
    this.form.get('organization').patchValue(organization ? organization.value : '');
  }

  goToRegisterPage() {
    this.navCtrl.push('register-page');
  }

  ngOnDestroy() {}
}
