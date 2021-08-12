import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomInspectionPageComponent } from './room-inspection-page.component';
import { RoomInspectionUiModule } from '@reslife/room-inspection-ui';


@NgModule({
  declarations: [
    RoomInspectionPageComponent
  ],
  imports: [
    CommonModule,
    RoomInspectionUiModule
  ],
  exports: [
    RoomInspectionPageComponent
  ]
})
export class RoomInspectionPageModule { }
