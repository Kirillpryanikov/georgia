import { Component, OnInit, OnDestroy } from '@angular/core';
import { ScriptMainService } from "@core/script.data/script.main.service";

/**
 * Generated class for the HeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'header-component',
  templateUrl: 'header.html'
})
export class HeaderComponent implements OnInit, OnDestroy{

  constructor(public mainService: ScriptMainService) {}

  ngOnInit() {
    this.initdropdown();
  }

  initdropdown() {
    this.mainService.dropdown();
  }

  ngOnDestroy() {

  }

}
