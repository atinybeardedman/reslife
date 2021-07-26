import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckInPageComponent } from './check-in-page.component';
import { CheckInUiModule } from '@reslife/check-ins/check-in-ui';
import { MatTabsModule } from '@angular/material/tabs';
import { FlexLayoutModule } from '@angular/flex-layout';
@NgModule({
  declarations: [CheckInPageComponent],
  imports: [CommonModule, CheckInUiModule, MatTabsModule, FlexLayoutModule],
  exports: [CheckInPageComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CheckInPageModule {}
