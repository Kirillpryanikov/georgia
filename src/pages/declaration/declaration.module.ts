import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeclarationPage } from './declaration';
import {SidebarPageModule} from "../sidebar/sidebar.module";
import {HeaderPageModule} from "../header/header.module";

@NgModule({
  declarations: [
    DeclarationPage,
  ],
  imports: [
    SidebarPageModule,
    HeaderPageModule,
    IonicPageModule.forChild(DeclarationPage),
  ],
})
export class DeclarationPageModule {}
