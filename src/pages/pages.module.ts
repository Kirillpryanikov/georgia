import { NgModule, ModuleWithProviders } from '@angular/core';
import { HomeModule } from './home/home.module';

// import { AuthorizationModule } from './authorization/authorization.module';

const IMPORTS = [ HomeModule ];

@NgModule({
  imports: [...IMPORTS ],
  declarations: []
})
export class PagesModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders> {
      ngModule: PagesModule
    }
  }
}
