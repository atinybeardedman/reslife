import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomInspectionPickerModule } from './room-inspection-picker/room-inspection-picker.module';
import { RoomInspectionListModule } from './room-inspection-list/room-inspection-list.module';
import { RoomInspectionFailModalModule } from './room-inspection-fail-modal/room-inspection-fail-modal.module';

@NgModule({
  imports: [CommonModule, RoomInspectionPickerModule, RoomInspectionListModule, RoomInspectionFailModalModule],
})
export class RoomInspectionUiModule {}
