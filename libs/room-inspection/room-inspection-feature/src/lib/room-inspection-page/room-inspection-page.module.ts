import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomInspectionPageComponent } from './room-inspection-page.component';
import { RoomInspectionUiModule } from '@reslife/room-inspection-ui';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedUiModule } from '@reslife/shared/ui';


@NgModule({
  declarations: [
    RoomInspectionPageComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    RoomInspectionUiModule,
    SharedUiModule
  ],
  exports: [
    RoomInspectionPageComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RoomInspectionPageModule { }
