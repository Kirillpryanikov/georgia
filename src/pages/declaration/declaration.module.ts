import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeclarationPage } from './declaration';
import { SidebarPageModule } from "../sidebar/sidebar.module";
import { HeaderPageModule } from "../header/header.module";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {createTranslateLoader} from "../../app/app.module";
import {HttpClient} from "@angular/common/http";

@NgModule({
  declarations: [
    DeclarationPage,
  ],
  imports: [
    SidebarPageModule,
    HeaderPageModule,
    IonicPageModule.forChild(DeclarationPage),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      },
    })
  ],
})
export class DeclarationPageModule {}
