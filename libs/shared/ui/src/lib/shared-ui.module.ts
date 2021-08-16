import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainViewModule } from './main-view/main-view.module';
import { SearchSelectModule } from './search-select/search-select.module';
import { InfoDialogModule } from './info-dialog/info-dialog.module';
import { DormDatePickerModule } from './dorm-date-picker/dorm-date-picker.module';

@NgModule({
  imports: [
    CommonModule,
    SearchSelectModule,
    InfoDialogModule,
    MainViewModule,
    DormDatePickerModule,
  ],
  exports: [
    MainViewModule,
    SearchSelectModule,
    InfoDialogModule,
    DormDatePickerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedUiModule {}
