import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header';
import { SidebarComponent } from './sidebar/sidebar';
@NgModule({
	declarations: [HeaderComponent,
    SidebarComponent],
	imports: [],
	exports: [
	  HeaderComponent,
    SidebarComponent
  ]
})
export class ComponentsModule {}
