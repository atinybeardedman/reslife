import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { RoomInspectionStudentDoc } from '@reslife/room-inspection-model';

@Component({
  selector: 'reslife-room-inspection-fail-modal',
  templateUrl: './room-inspection-fail-modal.component.html',
  styleUrls: ['./room-inspection-fail-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomInspectionFailModalComponent {
  @Input() inspectionDoc!: RoomInspectionStudentDoc;
  @Output() save = new EventEmitter<RoomInspectionStudentDoc>();
}
