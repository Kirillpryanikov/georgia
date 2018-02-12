import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

const COMPONENTS = [];

@NgModule({
  imports: [],
  declarations: [ ...COMPONENTS ],
  entryComponents: [ ...COMPONENTS ],
  exports: [ ...COMPONENTS ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SharedComponentModule {}
