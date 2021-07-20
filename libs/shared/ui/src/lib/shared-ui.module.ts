import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainViewModule } from './main-view/main-view.module';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
  ],
  exports: [
    MainViewModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedUiModule {}
