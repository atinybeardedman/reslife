import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomInspectionPageComponent } from './room-inspection-page.component';
import { RoomInspectionUiModule } from '@reslife/room-inspection-ui';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    RoomInspectionPageComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    RoomInspectionUiModule
  ],
  exports: [
    RoomInspectionPageComponent
  ]
})
export class RoomInspectionPageModule { }
