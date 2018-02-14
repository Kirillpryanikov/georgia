import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UsaWarehousePage } from '@pages/usa-warehouse/usa-warehouse';
import {HeaderPageModule} from "@pages/header/header.module";
import {SidebarPageModule} from "@pages/sidebar/sidebar.module";

@NgModule({
  declarations: [
    UsaWarehousePage,
  ],
  imports: [
    HeaderPageModule,
    SidebarPageModule,
    IonicPageModule.forChild(UsaWarehousePage),
  ],
})
export class UsaWarehousePageModule {}
