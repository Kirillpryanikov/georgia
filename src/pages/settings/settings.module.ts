import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SettingsPage } from '@pages/settings/settings';
import { HeaderPageModule } from "@pages/header/header.module";
import { SidebarPageModule } from "@pages/sidebar/sidebar.module";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {createTranslateLoader} from "../../app/app.module";
import {HttpClient} from "@angular/common/http";
import {NgSelectModule} from "@ng-select/ng-select";
import { Ng2CompleterModule } from "ng2-completer";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    SettingsPage,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HeaderPageModule,
    Ng2CompleterModule,
    NgSelectModule,
    SidebarPageModule,
    IonicPageModule.forChild(SettingsPage),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      },
    })
  ],
  exports: [  ]
})
export class SettingsPageModule {}
