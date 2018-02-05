import { NgModule } from '@angular/core';
import { ScriptRegisterService } from '@core/script.data/script.register.service';

const PROVIDERS = [ ScriptRegisterService ];

@NgModule({
  imports: [],
  providers: [...PROVIDERS]
})
export class ScriptDataModule {}
