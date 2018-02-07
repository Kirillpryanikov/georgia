import { Component, OnInit, OnDestroy } from '@angular/core';
import {ScriptMainService} from "../../@core/script.data/script.main.service";

/**
 * Generated class for the SidebarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'sidebar-component',
  templateUrl: 'sidebar.html'
})
export class SidebarComponent implements OnInit, OnDestroy{

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
