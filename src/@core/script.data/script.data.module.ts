import { NgModule } from '@angular/core';
import { ScriptRegisterService } from '@core/script.data/script.register.service';
import { ScriptMainService } from "@core/script.data/script.main.service";

const PROVIDERS = [ ScriptRegisterService, ScriptMainService ];

@NgModule({
  imports: [],
  providers: [...PROVIDERS]
})
export class ScriptDataModule {}
