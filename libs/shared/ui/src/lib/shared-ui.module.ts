import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainViewModule } from './main-view/main-view.module';
import { SearchSelectModule } from './search-select/search-select.module';

@NgModule({
  imports: [
    CommonModule,
    // BrowserAnimationsModule,
    SearchSelectModule,
  ],
  exports: [
    MainViewModule,
    SearchSelectModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedUiModule {}
