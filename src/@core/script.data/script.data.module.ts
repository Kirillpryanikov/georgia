import { NgModule } from '@angular/core';
import { ScriptRegisterService } from '@core/script.data/script.register.service';
import { ScriptMainService } from "@core/script.data/script.main.service";
import { ScriptService } from '@core/script.data/script.scriptjs.service'

const PROVIDERS = [
  ScriptRegisterService,
  ScriptMainService,
  ScriptService
];

@NgModule({
  imports: [],
  providers: [...PROVIDERS]
})
export class ScriptDataModule {}
